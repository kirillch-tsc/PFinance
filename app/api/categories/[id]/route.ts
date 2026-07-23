import { NextResponse } from "next/server";
import { getStorageBackend } from "@/src/storage/get-storage-backend.ts";
import type { CategoryId } from "@/src/business/categories/index.ts";
import type { CategoryRecord } from "@/src/storage/records/index.ts";
import { errorResponse } from "../../_lib/http.ts";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { categories } = getStorageBackend();
    const record = await categories.getById(id as CategoryId);
    if (!record) {
      return NextResponse.json({ error: "Category does not exist" }, { status: 404 });
    }
    return NextResponse.json(record);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await params;
    const { categories } = getStorageBackend();
    const record = (await request.json()) as CategoryRecord;
    const updated = await categories.update(record);
    return NextResponse.json(updated);
  } catch (error) {
    return errorResponse(error);
  }
}
