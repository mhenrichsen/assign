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
import {
  buildMdSlots,
  prefillMdAssignments,
} from "@/lib/encounters/misdirection"

export function EncounterTab({
  encounter,
  readOnly,
}: {
  encounter: EncounterDef
  readOnly?: boolean
}) {
  const { session, dispatch } = useRaid()
  const meta = BOSS_META[encounter.id]
  const hunters = useMemo(
    () => session.roster.filter((p) => p.class === "Hunter"),
    [session.roster]
  )

  // Build the resolved encounter with dynamic slots
  const resolvedEncounter = useMemo(() => {
    if (encounter.id === "general" && session.roster.length > 0) {
      return buildGeneralEncounter(session.roster)
    }

    // For boss encounters, inject MD slots based on hunters
    if (hunters.length > 0 && encounter.id !== "general") {
      const mdSlots = buildMdSlots(encounter.id, hunters)
      return {
        ...encounter,
        slots: [...encounter.slots, ...mdSlots],
      }
    }

    return encounter
  }, [encounter, session.roster, hunters])

  // Auto-prefill general assignments
  useEffect(() => {
    if (encounter.id !== "general") return
    if (session.roster.length === 0) return

    const existing = session.encounters["general"] ?? {}
    const prefilled = prefillGeneralAssignments(session.roster)

    for (const [slotId, playerIds] of Object.entries(prefilled)) {
      if (existing[slotId] && existing[slotId].length > 0) continue
      for (const playerId of playerIds) {
        dispatch({
          type: "ASSIGN_PLAYER",
          encounterId: "general",
          slotId,
          playerId,
        })
      }
    }
  }, [encounter.id, session.roster, session.encounters, dispatch])

  // Auto-prefill MD slots for boss encounters — fill any empty MD slots
  useEffect(() => {
    if (encounter.id === "general") return
    if (hunters.length === 0) return

    const existing = session.encounters[encounter.id] ?? {}
    const prefilled = prefillMdAssignments(encounter.id, hunters)

    for (const [slotId, playerIds] of Object.entries(prefilled)) {
      // Only prefill if this specific slot is empty
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
  }, [encounter.id, hunters, session.encounters, dispatch])

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
