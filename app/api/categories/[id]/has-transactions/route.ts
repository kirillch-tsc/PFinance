import { NextResponse } from "next/server";
import { getStorageBackend } from "@/src/storage/get-storage-backend.ts";
import type { CategoryId } from "@/src/business/categories/index.ts";
import { errorResponse } from "../../../_lib/http.ts";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { categories } = getStorageBackend();
    const hasTransactions = await categories.hasTransactions(id as CategoryId);
    return NextResponse.json({ hasTransactions });
  } catch (error) {
    return errorResponse(error);
  }
}
