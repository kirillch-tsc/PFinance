import { NextResponse } from "next/server";
import { getStorageBackend } from "@/src/storage/get-storage-backend.ts";
import type { TransactionSelection } from "@/src/storage/contracts/index.ts";
import type { TransactionRecord } from "@/src/storage/records/index.ts";
import { errorResponse, parseSelection } from "../_lib/http.ts";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { transactions } = getStorageBackend();
    const records = await transactions.list(parseSelection<TransactionSelection>(request));
    return NextResponse.json(records);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const { transactions } = getStorageBackend();
    const record = (await request.json()) as TransactionRecord;
    const created = await transactions.create(record);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
