import { NextResponse } from "next/server";
import { getStorageBackend } from "@/src/storage/get-storage-backend.ts";
import type { TransactionId } from "@/src/business/transactions/index.ts";
import type { TransactionRecord } from "@/src/storage/records/index.ts";
import { errorResponse } from "../../_lib/http.ts";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { transactions } = getStorageBackend();
    const record = await transactions.getById(id as TransactionId);
    if (!record) {
      return NextResponse.json({ error: "Transaction does not exist" }, { status: 404 });
    }
    return NextResponse.json(record);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await params;
    const { transactions } = getStorageBackend();
    const record = (await request.json()) as TransactionRecord;
    const updated = await transactions.update(record);
    return NextResponse.json(updated);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { transactions } = getStorageBackend();
    await transactions.delete(id as TransactionId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return errorResponse(error);
  }
}
