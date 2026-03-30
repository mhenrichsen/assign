"use client"

import { useEffect, useMemo } from "react"
import type { EncounterDef } from "@/lib/types"
import { SlotGroup } from "./slot-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BOSS_META } from "@/lib/encounter-meta"
import { useRaid } from "@/lib/raid-context"
import {
  buildGeneralEncounter,
  prefillGeneralAssignments,
} from "@/lib/encounters/general"

export function EncounterTab({
  encounter,
  readOnly,
}: {
  encounter: EncounterDef
  readOnly?: boolean
}) {
  const { session, dispatch } = useRaid()
  const meta = BOSS_META[encounter.id]

  // For General Assignments, dynamically build encounter based on roster
  const resolvedEncounter = useMemo(() => {
    if (encounter.id === "general" && session.roster.length > 0) {
      return buildGeneralEncounter(session.roster)
    }
    return encounter
  }, [encounter, session.roster])

  // Auto-prefill general assignments when first viewed with a roster
  useEffect(() => {
    if (encounter.id !== "general") return
    if (session.roster.length === 0) return

    const existing = session.encounters["general"]
    if (existing && Object.keys(existing).length > 0) return

    const prefilled = prefillGeneralAssignments(session.roster)
    if (Object.keys(prefilled).length > 0) {
      // Dispatch each prefilled assignment
      for (const [slotId, playerIds] of Object.entries(prefilled)) {
        for (const playerId of playerIds) {
          dispatch({
            type: "ASSIGN_PLAYER",
            encounterId: "general",
            slotId,
            playerId,
          })
        }
      }
    }
  }, [encounter.id, session.roster, session.encounters, dispatch])

  // Group slots
  const groups: {
    name: string
    slots: typeof resolvedEncounter.slots
  }[] = []
  const seen = new Set<string>()

  for (const slot of resolvedEncounter.slots) {
    if (!seen.has(slot.group)) {
      seen.add(slot.group)
      groups.push({
        name: slot.group,
        slots: resolvedEncounter.slots.filter(
          (s) => s.group === slot.group
        ),
      })
    }
  }

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
              {resolvedEncounter.name}
            </h2>
            <p className="text-sm text-[#a89880]">
              {resolvedEncounter.description}
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {groups.map((group) => (
            <SlotGroup
              key={group.name}
              name={group.name}
              slots={group.slots}
              encounterId={resolvedEncounter.id}
              readOnly={readOnly}
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
