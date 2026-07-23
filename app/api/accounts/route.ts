import { NextResponse } from "next/server";
import { getStorageBackend } from "@/src/storage/get-storage-backend.ts";
import type { AccountSelection } from "@/src/storage/contracts/index.ts";
import type { AccountRecord } from "@/src/storage/records/index.ts";
import { errorResponse, parseSelection } from "../_lib/http.ts";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { accounts } = getStorageBackend();
    const records = await accounts.list(parseSelection<AccountSelection>(request));
    return NextResponse.json(records);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const { accounts } = getStorageBackend();
    const record = (await request.json()) as AccountRecord;
    const created = await accounts.create(record);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
