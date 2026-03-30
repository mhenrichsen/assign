"use client"

import { useMemo } from "react"
import { ALL_ENCOUNTERS } from "@/lib/encounters"
import { decodeSession } from "@/lib/url-codec"
import { useUrlHash } from "./use-url-hash"
import type { EncounterDef } from "@/lib/types"

export function useInitialEncounters(): EncounterDef[] | null {
  const [hash] = useUrlHash()

  return useMemo(() => {
    if (!hash) return null

    const session = decodeSession(hash)
    if (!session) return null

    const encounterIds = Object.keys(session.encounters)
    const matched = ALL_ENCOUNTERS.filter((e) => encounterIds.includes(e.id))
    return matched.length > 0 ? matched : ALL_ENCOUNTERS
  }, [hash])
}
