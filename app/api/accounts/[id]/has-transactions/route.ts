import { NextResponse } from "next/server";
import { getStorageBackend } from "@/src/storage/get-storage-backend.ts";
import type { AccountId } from "@/src/business/accounts/index.ts";
import { errorResponse } from "../../../_lib/http.ts";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { accounts } = getStorageBackend();
    const hasTransactions = await accounts.hasTransactions(id as AccountId);
    return NextResponse.json({ hasTransactions });
  } catch (error) {
    return errorResponse(error);
  }
}
