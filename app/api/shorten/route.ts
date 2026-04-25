import { NextResponse } from "next/server"
import { createLink } from "@/lib/db.server"
import { decodeSession } from "@/lib/url-codec"

export const runtime = "nodejs"

const MAX_PAYLOAD_LENGTH = 200_000

export async function POST(req: Request) {
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

  const id = createLink(payload)
  return NextResponse.json({ id })
}
