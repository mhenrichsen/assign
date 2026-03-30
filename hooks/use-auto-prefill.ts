"use client"

import { useEffect } from "react"
import type { EncounterDef, RaidSession } from "@/lib/types"
import { computePrefills } from "@/lib/encounters/resolver"
import type { RaidAction } from "@/lib/raid-reducer"

/**
 * Auto-prefill empty dynamic slots for ALL encounters when roster changes.
 * Runs at the editor level so it works even for non-visible tabs.
 */
export function useAutoPrefill(
  encounters: EncounterDef[],
  session: RaidSession,
  dispatch: (action: RaidAction) => void
) {
  useEffect(() => {
    if (session.roster.length === 0) return

    for (const encounter of encounters) {
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
    }
  }, [encounters, session.roster, session.encounters, dispatch])
}
