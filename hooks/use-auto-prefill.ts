"use client"

import { useEffect } from "react"
import type { EncounterDef, RaidSession } from "@/lib/types"
import { computePrefills } from "@/lib/encounters/resolver"
import type { RaidAction } from "@/lib/raid-reducer"

/**
 * Auto-prefill empty dynamic slots for ALL encounters when roster changes.
 * Uses BATCH_ASSIGN to avoid cascading re-renders.
 */
export function useAutoPrefill(
  encounters: EncounterDef[],
  session: RaidSession,
  dispatch: (action: RaidAction) => void
) {
  const roster = session.roster
  const encounterState = session.encounters

  useEffect(() => {
    if (roster.length === 0) return

    const batch: { encounterId: string; slotId: string; playerId: string }[] = []

    for (const encounter of encounters) {
      const existing = encounterState[encounter.id] ?? {}
      const prefills = computePrefills(encounter, roster)

      for (const [slotId, playerIds] of Object.entries(prefills)) {
        if (existing[slotId] && existing[slotId].length > 0) continue
        for (const playerId of playerIds) {
          batch.push({ encounterId: encounter.id, slotId, playerId })
        }
      }
    }

    if (batch.length > 0) {
      dispatch({ type: "BATCH_ASSIGN", assignments: batch })
    }
    // Only re-run when roster changes, not on every assignment
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encounters, roster, dispatch])
}
