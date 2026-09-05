import { NextResponse } from "next/server";
import { leadSchema } from "@/features/leads/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten() },
        { status: 400 },
      );
    }

    // Phase 1 stub: validate only. Wire Prisma create() when DATABASE_URL is set.
    // await prisma.lead.create({ data: parsed.data })
    console.info("[leads:stub]", parsed.data);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
