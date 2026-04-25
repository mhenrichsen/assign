"use client"

import { useEffect, useRef } from "react"
import type { EncounterDef, RaidSession } from "@/lib/types"
import { computePrefills } from "@/lib/encounters/resolver"
import type { RaidAction } from "@/lib/raid-reducer"

/**
 * Auto-prefill empty dynamic slots for ALL encounters when roster changes.
 * Uses BATCH_ASSIGN to avoid cascading re-renders.
 *
 * Each (encounter, slot, player) pairing is attempted at most once per session
 * — if the user clears an auto-assigned slot, we won't fight them by reassigning
 * the same person.
 */
export function useAutoPrefill(
  encounters: EncounterDef[],
  session: RaidSession,
  dispatch: (action: RaidAction) => void
) {
  const roster = session.roster
  const encounterState = session.encounters
  const attemptedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (roster.length === 0) return

    const batch: { encounterId: string; slotId: string; playerId: string }[] = []
    const attempted = attemptedRef.current

    for (const encounter of encounters) {
      const existing = encounterState[encounter.id] ?? {}
      const prefills = computePrefills(encounter, roster)

      for (const [slotId, playerIds] of Object.entries(prefills)) {
        // If something is already in the slot, mark these (slot, player)
        // pairings as attempted so we don't reassign if the user clears later.
        if (existing[slotId] && existing[slotId].length > 0) {
          for (const pid of playerIds) {
            attempted.add(`${encounter.id}:${slotId}:${pid}`)
          }
          continue
        }

        for (const playerId of playerIds) {
          const key = `${encounter.id}:${slotId}:${playerId}`
          if (attempted.has(key)) continue
          attempted.add(key)
          batch.push({ encounterId: encounter.id, slotId, playerId })
        }
      }
    }

    if (batch.length > 0) {
      dispatch({ type: "BATCH_ASSIGN", assignments: batch })
    }
  }, [encounters, roster, encounterState, dispatch])
}
