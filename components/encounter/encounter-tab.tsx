"use client"

import { useEffect, useMemo } from "react"
import type { EncounterDef } from "@/lib/types"
import { SlotGroup } from "./slot-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BOSS_META } from "@/lib/encounter-meta"
import { useRaid } from "@/lib/raid-context"
import { resolveEncounter, computePrefills } from "@/lib/encounters/resolver"

export function EncounterTab({
  encounter,
  readOnly,
}: {
  encounter: EncounterDef
  readOnly?: boolean
}) {
  const { session, dispatch } = useRaid()
  const meta = BOSS_META[encounter.id]

  // Resolve encounter: inject dynamic slots based on roster
  const resolved = useMemo(
    () => resolveEncounter(encounter, session.roster),
    [encounter, session.roster]
  )

  // Auto-prefill empty slots based on roster composition
  useEffect(() => {
    if (session.roster.length === 0) return

    const existing = session.encounters[encounter.id] ?? {}
    const prefills = computePrefills(encounter, session.roster)

    for (const [slotId, playerIds] of Object.entries(prefills)) {
      if (existing[slotId] && existing[slotId].length > 0) continue
      for (const playerId of playerIds) {
        dispatch({
          type: "ASSIGN_PLAYER",
          encounterId: encounter.id,
          slotId,
          playerId,
        })
      }
    }
  }, [encounter, session.roster, session.encounters, dispatch])

  // Group slots by their group field
  const groups = useMemo(() => {
    const result: { name: string; slots: typeof resolved.slots }[] = []
    const seen = new Set<string>()
    for (const slot of resolved.slots) {
      if (!seen.has(slot.group)) {
        seen.add(slot.group)
        result.push({
          name: slot.group,
          slots: resolved.slots.filter((s) => s.group === slot.group),
        })
      }
    }
    return result
  }, [resolved])

  return (
    <ScrollArea className="h-full">
      <div className="p-3">
        <div className="mb-3 flex items-center gap-3">
          {meta && (
            <span className="text-xl" role="img">
              {meta.icon}
            </span>
          )}
          <div>
            <h2 className="text-lg font-semibold text-wow-gold-light font-[family-name:var(--font-heading)]">
              {resolved.name}
            </h2>
            <p className="text-sm text-[#a89880]">
              {resolved.description}
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {groups.map((group) => (
            <SlotGroup
              key={group.name}
              name={group.name}
              slots={group.slots}
              encounterId={resolved.id}
              readOnly={readOnly}
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
