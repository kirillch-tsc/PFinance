import { NextResponse } from "next/server";
import { getStorageBackend } from "@/src/storage/get-storage-backend.ts";
import type { AccountId } from "@/src/business/accounts/index.ts";
import type { AccountRecord } from "@/src/storage/records/index.ts";
import { errorResponse } from "../../_lib/http.ts";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { accounts } = getStorageBackend();
    const record = await accounts.getById(id as AccountId);
    if (!record) {
      return NextResponse.json({ error: "Account does not exist" }, { status: 404 });
    }
    return NextResponse.json(record);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await params;
    const { accounts } = getStorageBackend();
    const record = (await request.json()) as AccountRecord;
    const updated = await accounts.update(record);
    return NextResponse.json(updated);
  } catch (error) {
    return errorResponse(error);
  }
}
