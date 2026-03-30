"use client"

import { useState, useMemo } from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { RaidProvider, useRaid } from "@/lib/raid-context"
import { ALL_ENCOUNTERS } from "@/lib/encounters"
import { decodeSession } from "@/lib/url-codec"
import { RaidHeader } from "@/components/raid/raid-header"
import { RosterPanel } from "@/components/roster/roster-panel"
import { EncounterWorkspace } from "@/components/encounter/encounter-workspace"
import { PlayerCardOverlay } from "@/components/roster/player-card"
import type { Player, AssignmentSlot } from "@/lib/types"
import { useUrlHash } from "@/hooks/use-url-hash"

function RaidEditor() {
  const { session, dispatch, encounters } = useRaid()
  const [activeEncounterId, setActiveEncounterId] = useState(
    encounters[0]?.id ?? ""
  )
  const [activePlayer, setActivePlayer] = useState<Player | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  )

  function handleDragStart(event: DragStartEvent) {
    const player = event.active.data.current?.player as Player | undefined
    if (player) setActivePlayer(player)
  }

  function handleDragEnd(event: DragEndEvent) {
    setActivePlayer(null)

    const { active, over } = event
    if (!over) return

    const player = active.data.current?.player as Player | undefined
    const dropData = over.data.current as
      | { slot: AssignmentSlot; encounterId: string }
      | undefined

    if (!player || !dropData) return

    const { slot, encounterId } = dropData

    // Check class restriction
    if (slot.accepts && !slot.accepts.includes(player.class)) return

    // Check max players
    const encounterAssignments = session.encounters[encounterId] ?? {}
    const slotPlayers = encounterAssignments[slot.id] ?? []
    const maxPlayers = slot.multi ? (slot.maxPlayers ?? 99) : 1

    // If player is already in this slot, do nothing
    if (slotPlayers.includes(player.id)) return

    // If slot is full, deny
    if (slotPlayers.length >= maxPlayers) return

    dispatch({
      type: "ASSIGN_PLAYER",
      encounterId,
      slotId: slot.id,
      playerId: player.id,
    })
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-svh flex-col">
        <RaidHeader />
        <div className="flex flex-1 overflow-hidden">
          <RosterPanel activeEncounterId={activeEncounterId} />
          <div className="flex-1 overflow-hidden">
            <EncounterWorkspace
              encounters={encounters}
              activeEncounterId={activeEncounterId}
              onEncounterChange={setActiveEncounterId}
            />
          </div>
        </div>
      </div>
      <DragOverlay>
        {activePlayer && <PlayerCardOverlay player={activePlayer} />}
      </DragOverlay>
    </DndContext>
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

export default function RaidPage() {
  const encounters = useInitialEncounters()

  if (!encounters) {
    return (
      <div className="flex h-svh items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <RaidProvider encounters={encounters}>
      <RaidEditor />
    </RaidProvider>
  )
}
