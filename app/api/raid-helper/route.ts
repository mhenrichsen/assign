import { NextResponse } from "next/server"
import {
  extractRaidHelperId,
  planToPlayers,
  type RaidHelperPlan,
} from "@/lib/raid-helper-import"

export const runtime = "nodejs"

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 })
  }

  const input = (body as { input?: unknown })?.input
  if (typeof input !== "string") {
    return NextResponse.json({ error: "missing input" }, { status: 400 })
  }

  const id = extractRaidHelperId(input)
  if (!id) {
    return NextResponse.json(
      { error: "Could not find a raid-helper.xyz raidplan id in that input" },
      { status: 400 }
    )
  }

  let plan: RaidHelperPlan
  try {
    const res = await fetch(`https://raid-helper.xyz/api/raidplan/${id}`, {
      headers: { accept: "application/json" },
      cache: "no-store",
    })
    if (!res.ok) {
      return NextResponse.json(
        { error: `raid-helper.xyz returned ${res.status}` },
        { status: 502 }
      )
    }
    plan = (await res.json()) as RaidHelperPlan
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch raid plan" },
      { status: 502 }
    )
  }

  const players = planToPlayers(plan)
  return NextResponse.json({ id, title: plan.title ?? null, players })
}
