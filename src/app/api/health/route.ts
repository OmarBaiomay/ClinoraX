import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ ok: true, service: "clinorax", ts: new Date().toISOString() });
}
