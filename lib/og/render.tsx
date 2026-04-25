import { ImageResponse } from "next/og"
import { CLASS_COLORS } from "@/lib/wow"
import { ALL_ENCOUNTERS } from "@/lib/encounters"
import type {
  AssignmentMap,
  EncounterDef,
  Player,
  RaidSession,
} from "@/lib/types"

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

const GOLD = "#c9aa71"
const GOLD_LIGHT = "#e8d4a3"
const GOLD_DIM = "#a89880"
const BG = "#0d0c0a"
const PANEL = "#1a1814"
const PANEL_BORDER = "#3e3830"

function PlayerChip({
  player,
  size = "md",
}: {
  player: Player
  size?: "sm" | "md"
}) {
  const color = CLASS_COLORS[player.class] ?? "#ffffff"
  const small = size === "sm"
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: small ? "3px 8px" : "6px 12px",
        borderRadius: 6,
        background: "#15130f",
        border: `1px solid ${PANEL_BORDER}`,
        fontSize: small ? 15 : 18,
        color,
        fontWeight: 600,
      }}
    >
      {player.name}
    </div>
  )
}

function getPlayerById(roster: Player[], id: string): Player | null {
  return roster.find((p) => p.id === id) ?? null
}

function classCounts(roster: Player[]): { cls: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const p of roster) counts.set(p.class, (counts.get(p.class) ?? 0) + 1)
  return Array.from(counts.entries())
    .map(([cls, count]) => ({ cls, count }))
    .sort((a, b) => b.count - a.count)
}

interface SlotLine {
  label: string
  players: Player[]
}

// SVG raid marks matching the in-game WoW markers (same as components/raid-mark.tsx).
const MARK_REGEX = /\{(star|circle|diamond|triangle|moon|square|cross|skull)\}/gi

const MARK_SIZE = 16

function Mark({
  kind,
}: {
  kind:
    | "star"
    | "circle"
    | "diamond"
    | "triangle"
    | "moon"
    | "square"
    | "cross"
    | "skull"
}) {
  const s = MARK_SIZE
  switch (kind) {
    case "star":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill="#FFD100"
            stroke="#B8960A"
            strokeWidth="0.5"
          />
        </svg>
      )
    case "circle":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="#FF8000"
            stroke="#CC6600"
            strokeWidth="0.5"
          />
        </svg>
      )
    case "diamond":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <polygon
            points="12,2 22,12 12,22 2,12"
            fill="#CC00FF"
            stroke="#9900CC"
            strokeWidth="0.5"
          />
        </svg>
      )
    case "triangle":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <polygon
            points="12,3 22,21 2,21"
            fill="#00FF00"
            stroke="#00CC00"
            strokeWidth="0.5"
          />
        </svg>
      )
    case "moon":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <path
            d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"
            fill="#B0C4DE"
            stroke="#8BA8C4"
            strokeWidth="0.5"
          />
        </svg>
      )
    case "square":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="1"
            fill="#0070DD"
            stroke="#0055AA"
            strokeWidth="0.5"
          />
        </svg>
      )
    case "cross":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <path
            d="M18.3 5.7a1 1 0 00-1.4 0L12 10.6 7.1 5.7a1 1 0 00-1.4 1.4L10.6 12l-4.9 4.9a1 1 0 101.4 1.4L12 13.4l4.9 4.9a1 1 0 001.4-1.4L13.4 12l4.9-4.9a1 1 0 000-1.4z"
            fill="#FF0000"
            stroke="#CC0000"
            strokeWidth="0.3"
          />
        </svg>
      )
    case "skull":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24">
          <path
            d="M12 2C7.58 2 4 5.58 4 10c0 2.76 1.39 5.2 3.5 6.65V20a1 1 0 001 1h7a1 1 0 001-1v-3.35C18.61 15.2 20 12.76 20 10c0-4.42-3.58-8-8-8z"
            fill="#E8E8E8"
            stroke="#AAAAAA"
            strokeWidth="0.5"
          />
          <circle cx="9" cy="10" r="2" fill="#1c1a16" />
          <circle cx="15" cy="10" r="2" fill="#1c1a16" />
          <path
            d="M10 15h4"
            stroke="#1c1a16"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )
  }
}

type MarkKind =
  | "star"
  | "circle"
  | "diamond"
  | "triangle"
  | "moon"
  | "square"
  | "cross"
  | "skull"

function renderLabel(raw: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  let last = 0
  for (const match of raw.matchAll(MARK_REGEX)) {
    const start = match.index ?? 0
    if (start > last) parts.push(raw.slice(last, start))
    parts.push(
      <Mark key={start} kind={match[1].toLowerCase() as MarkKind} />
    )
    last = start + match[0].length
  }
  if (last < raw.length) parts.push(raw.slice(last))
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {parts}
    </div>
  )
}

function gatherEncounterLines(
  encounter: EncounterDef,
  assignments: AssignmentMap | undefined,
  roster: Player[]
): SlotLine[] {
  if (!assignments) return []
  const lines: SlotLine[] = []
  for (const slot of encounter.slots) {
    const ids = assignments[slot.id] ?? []
    if (ids.length === 0) continue
    const players = ids
      .map((id) => getPlayerById(roster, id))
      .filter((p): p is Player => !!p)
    if (players.length === 0) continue
    lines.push({ label: slot.label, players })
  }
  return lines
}

function GeneralOverview({ session }: { session: RaidSession }) {
  const counts = classCounts(session.roster)
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
        flex: 1,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 22, color: GOLD, fontWeight: 600 }}>
          {`Roster (${session.roster.length})`}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {session.roster.slice(0, 30).map((p) => (
            <PlayerChip key={p.id} player={p} />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 22, color: GOLD, fontWeight: 600 }}>
          Composition
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {counts.map(({ cls, count }) => (
            <div
              key={cls}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                borderRadius: 6,
                background: "#15130f",
                border: `1px solid ${PANEL_BORDER}`,
                fontSize: 18,
                color:
                  CLASS_COLORS[cls as keyof typeof CLASS_COLORS] ?? "#fff",
                fontWeight: 600,
              }}
            >
              {`${count} ${cls}${count !== 1 ? "s" : ""}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EncounterOverview({
  session,
  encounter,
}: {
  session: RaidSession
  encounter: EncounterDef
}) {
  const lines = gatherEncounterLines(
    encounter,
    session.encounters[encounter.id],
    session.roster
  )

  if (lines.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          color: GOLD_DIM,
          fontStyle: "italic",
        }}
      >
        No assignments yet for {encounter.name}.
      </div>
    )
  }

  const MAX_LINES = 12
  const visible = lines.slice(0, MAX_LINES)
  const overflow = lines.length - visible.length

  const half = Math.ceil(visible.length / 2)
  const left = visible.slice(0, half)
  const right = visible.slice(half)

  const renderColumn = (col: SlotLine[]) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        flex: 1,
      }}
    >
      {col.map((line, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 17,
              color: GOLD_DIM,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {renderLabel(line.label)}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {line.players.map((p) => (
              <PlayerChip key={p.id} player={p} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 8 }}>
      <div style={{ display: "flex", gap: 24, flex: 1 }}>
        {renderColumn(left)}
        {right.length > 0 ? renderColumn(right) : null}
      </div>
      {overflow > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: 14,
            color: GOLD_DIM,
            fontStyle: "italic",
          }}
        >
          {`+${overflow} more on the page`}
        </div>
      ) : null}
    </div>
  )
}

export function renderOgImage({
  session,
  encounterId,
}: {
  session: RaidSession
  encounterId?: string
}): ImageResponse {
  const encounter = encounterId
    ? ALL_ENCOUNTERS.find((e) => e.id === encounterId)
    : undefined

  const headlineLeft = encounter ? encounter.name : session.name || "Raid"
  const headlineRight = encounter
    ? session.name || "Raid"
    : `${session.roster.length} players`

  const presentEncounterIds = Object.keys(session.encounters)
  const subEncounters = ALL_ENCOUNTERS.filter(
    (e) => e.id !== "general" && presentEncounterIds.includes(e.id)
  ).map((e) => e.name)

  const subline = encounter ? null : subEncounters.join("  •  ")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BG,
          color: GOLD_LIGHT,
          padding: 32,
          fontFamily: "sans-serif",
        }}
      >
        {/* Top gold accent line */}
        <div
          style={{
            display: "flex",
            height: 3,
            background: `linear-gradient(90deg, ${GOLD}, transparent)`,
            marginBottom: 12,
          }}
        />

        {/* Header — small, dense */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 26,
              color: GOLD_LIGHT,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {headlineLeft}
          </div>
          {subline ? (
            <div style={{ fontSize: 14, color: GOLD_DIM }}>{subline}</div>
          ) : null}
        </div>

        {/* Body */}
        <div
          style={{
            display: "flex",
            flex: 1,
            background: PANEL,
            border: `1px solid ${PANEL_BORDER}`,
            borderRadius: 10,
            padding: 22,
          }}
        >
          {encounter ? (
            <EncounterOverview session={session} encounter={encounter} />
          ) : (
            <GeneralOverview session={session} />
          )}
        </div>
      </div>
    ),
    OG_SIZE
  )
}
