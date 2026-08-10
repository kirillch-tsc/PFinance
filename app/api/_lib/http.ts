import { NextResponse } from "next/server";
import { StorageNotReadyError } from "@/src/storage/sqlite/index.ts";

export function errorResponse(error: unknown): NextResponse {
  if (error instanceof StorageNotReadyError) {
    return NextResponse.json({ error: error.message }, { status: 503 });
  }

  const message = error instanceof Error ? error.message : "Неизвестная ошибка хранилища";
  if (/already exists/i.test(message)) {
    return NextResponse.json({ error: message }, { status: 409 });
  }
  if (/does not exist/i.test(message)) {
    return NextResponse.json({ error: message }, { status: 404 });
  }
  return NextResponse.json({ error: message }, { status: 500 });
}

export function parseSelection<T>(request: Request): T {
  const raw = new URL(request.url).searchParams.get("selection");
  return raw ? (JSON.parse(raw) as T) : ({} as T);
}
