import type { Metadata } from "next"
import type { EncounterDef, Player, RaidSession } from "@/lib/types"
import { ALL_ENCOUNTERS } from "@/lib/encounters"

const SITE_NAME = "Assign"
const MAX_DESCRIPTION = 240

function getPlayer(roster: Player[], id: string): Player | null {
  return roster.find((p) => p.id === id) ?? null
}

function namesFromIds(roster: Player[], ids: string[]): string[] {
  return ids
    .map((id) => getPlayer(roster, id))
    .filter((p): p is Player => !!p)
    .map((p) => p.name)
}

function summarizeGeneral(session: RaidSession): string {
  const present = ALL_ENCOUNTERS.filter(
    (e) => e.id !== "general" && session.encounters[e.id]
  )
  const raids = [...new Set(present.map((e) => e.raidName))].join(" + ")

  const parts: string[] = []
  parts.push(`${session.roster.length} players`)
  if (raids) parts.push(raids)

  // Try to surface tanks across all encounters
  const tankIds = new Set<string>()
  for (const enc of present) {
    const assignments = session.encounters[enc.id]
    if (!assignments) continue
    for (const slot of enc.slots) {
      if (!slot.group?.toLowerCase().includes("tank")) continue
      for (const id of assignments[slot.id] ?? []) tankIds.add(id)
    }
  }
  const tankNames = namesFromIds(session.roster, [...tankIds])
  if (tankNames.length > 0) parts.push(`Tanks: ${tankNames.join(", ")}`)

  return parts.join("  •  ")
}

const MARK_LABELS: Record<string, string> = {
  skull: "Skull",
  cross: "Cross",
  square: "Square",
  moon: "Moon",
  triangle: "Triangle",
  star: "Star",
  circle: "Circle",
  diamond: "Diamond",
}

function stripMarks(label: string): string {
  return label
    .replace(
      /\{(star|circle|diamond|triangle|moon|square|cross|skull)\}/gi,
      (_m, kind) => MARK_LABELS[kind.toLowerCase()] ?? ""
    )
    .replace(/\s+/g, " ")
    .trim()
}

function summarizeEncounter(
  session: RaidSession,
  encounter: EncounterDef
): string {
  const assignments = session.encounters[encounter.id]
  if (!assignments) return `No assignments yet for ${encounter.name}.`

  const lines: string[] = []
  for (const slot of encounter.slots) {
    const ids = assignments[slot.id] ?? []
    if (ids.length === 0) continue
    const names = namesFromIds(session.roster, ids)
    if (names.length === 0) continue
    lines.push(`${stripMarks(slot.label)}: ${names.join(", ")}`)
  }
  if (lines.length === 0) return `No assignments yet for ${encounter.name}.`
  return lines.join("  •  ")
}

function clip(s: string, max: number): string {
  if (s.length <= max) return s
  return s.slice(0, max - 1).trimEnd() + "…"
}

export function buildMetadata({
  session,
  encounterId,
  pathname,
}: {
  session: RaidSession
  encounterId?: string
  pathname: string
}): Metadata {
  const encounter = encounterId
    ? ALL_ENCOUNTERS.find((e) => e.id === encounterId)
    : undefined

  const raidName = session.name?.trim() || "Untitled Raid"
  const title = encounter
    ? `${encounter.name} — ${raidName}`
    : `${raidName} — ${session.roster.length} players`

  const description = clip(
    encounter
      ? summarizeEncounter(session, encounter)
      : summarizeGeneral(session),
    MAX_DESCRIPTION
  )

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      type: "website",
      url: pathname,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}
