import { NextResponse } from "next/server"
import { updateLink } from "@/lib/db.server"
import { decodeSession } from "@/lib/url-codec"

export const runtime = "nodejs"

const MAX_PAYLOAD_LENGTH = 200_000
const ID_PATTERN = /^[a-z0-9]{4,32}$/i

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  if (!ID_PATTERN.test(id)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 })
  }

  const payload = (body as { payload?: unknown })?.payload
  if (typeof payload !== "string" || payload.length === 0) {
    return NextResponse.json({ error: "missing payload" }, { status: 400 })
  }
  if (payload.length > MAX_PAYLOAD_LENGTH) {
    return NextResponse.json({ error: "payload too large" }, { status: 413 })
  }
  if (!decodeSession(payload)) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 })
  }

  const ok = updateLink(id, payload)
  if (!ok) {
    return NextResponse.json({ error: "not found" }, { status: 404 })
  }

  return NextResponse.json({ ok: true })
}
