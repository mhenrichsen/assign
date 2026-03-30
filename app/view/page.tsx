"use client"

import { useState, useMemo } from "react"
import { RaidProvider, useRaid } from "@/lib/raid-context"
import { ALL_ENCOUNTERS } from "@/lib/encounters"
import { decodeSession } from "@/lib/url-codec"
import { EncounterWorkspace } from "@/components/encounter/encounter-workspace"
import type { EncounterDef } from "@/lib/types"
import { useUrlHash } from "@/hooks/use-url-hash"
import Link from "next/link"
import { Swords, Eye } from "lucide-react"

function ViewContent({ encounters }: { encounters: EncounterDef[] }) {
  const { session } = useRaid()
  const [activeEncounterId, setActiveEncounterId] = useState(
    encounters[0]?.id ?? ""
  )

  const raidNames = [...new Set(encounters.map((e) => e.raidName))].join(
    " + "
  )

  return (
    <div className="flex h-svh flex-col">
      <div className="wow-header flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[#a89880] hover:text-wow-gold transition-colors"
          >
            <Swords className="h-4 w-4" />
            <span className="text-sm font-[family-name:var(--font-heading)]">
              Assign
            </span>
          </Link>
          <span className="text-[#3e3830]">/</span>
          <h1 className="font-semibold text-wow-gold-light font-[family-name:var(--font-heading)]">
            {session.name || "Untitled Raid"}
          </h1>
          <span className="text-sm text-[#7a6a4a]">{raidNames}</span>
          <span className="flex items-center gap-1 rounded border border-[#3e3830] bg-[#1c1a16] px-2 py-0.5 text-xs text-[#a89880]">
            <Eye className="h-3 w-3" />
            View Only
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <EncounterWorkspace
          encounters={encounters}
          activeEncounterId={activeEncounterId}
          onEncounterChange={setActiveEncounterId}
          readOnly
        />
      </div>
    </div>
  )
}

function useInitialEncounters() {
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

export default function ViewPage() {
  const encounters = useInitialEncounters()

  if (!encounters) {
    return (
      <div className="flex h-svh items-center justify-center">
        <p className="text-[#7a6a4a] italic">Loading...</p>
      </div>
    )
  }

  return (
    <RaidProvider encounters={encounters}>
      <ViewContent encounters={encounters} />
    </RaidProvider>
  )
}
