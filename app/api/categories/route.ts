import { NextResponse } from "next/server";
import { getStorageBackend } from "@/src/storage/get-storage-backend.ts";
import type { CategorySelection } from "@/src/storage/contracts/index.ts";
import type { CategoryRecord } from "@/src/storage/records/index.ts";
import { errorResponse, parseSelection } from "../_lib/http.ts";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { categories } = getStorageBackend();
    const records = await categories.list(parseSelection<CategorySelection>(request));
    return NextResponse.json(records);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const { categories } = getStorageBackend();
    const record = (await request.json()) as CategoryRecord;
    const created = await categories.create(record);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
