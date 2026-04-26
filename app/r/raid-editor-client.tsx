"use client"

import { useState } from "react"
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
import { RaidHeader } from "@/components/raid/raid-header"
import { RosterPanel } from "@/components/roster/roster-panel"
import { EncounterWorkspace } from "@/components/encounter/encounter-workspace"
import { PlayerCardOverlay } from "@/components/roster/player-card"
import type { Player, AssignmentSlot } from "@/lib/types"
import { useInitialEncounters } from "@/hooks/use-initial-encounters"
import { useAutoPrefill } from "@/hooks/use-auto-prefill"

function RaidEditor({ initialEncounterId }: { initialEncounterId?: string }) {
  const { session, dispatch, encounters } = useRaid()
  const [activeEncounterId, setActiveEncounterId] = useState(
    () =>
      (initialEncounterId &&
        encounters.find((e) => e.id === initialEncounterId)?.id) ||
      encounters[0]?.id ||
      ""
  )
  const [activePlayer, setActivePlayer] = useState<Player | null>(null)
  const [rosterOpen, setRosterOpen] = useState(false)

  useAutoPrefill(encounters, session, dispatch)

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

    if (slot.accepts && !slot.accepts.includes(player.class)) return

    const encounterAssignments = session.encounters[encounterId] ?? {}
    const slotPlayers = encounterAssignments[slot.id] ?? []
    const overriddenMax = session.slotMaxOverrides?.[encounterId]?.[slot.id]
    const maxPlayers = slot.multi ? (overriddenMax ?? slot.maxPlayers ?? 99) : 1

    if (slotPlayers.includes(player.id)) return
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
        <RaidHeader
          activeEncounterId={activeEncounterId}
          onToggleRoster={() => setRosterOpen((v) => !v)}
        />
        <div className="relative flex flex-1 overflow-hidden">
          <RosterPanel
            activeEncounterId={activeEncounterId}
            isOpen={rosterOpen}
            onClose={() => setRosterOpen(false)}
          />
          <div className="min-w-0 flex-1 overflow-hidden">
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

export default function RaidEditorClient({
  initialPayload,
  initialEncounterId,
  shortId,
}: {
  initialPayload?: string
  initialEncounterId?: string
  shortId?: string
}) {
  const encounters = useInitialEncounters(initialPayload)

  if (!encounters) {
    return (
      <div className="flex h-svh items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <RaidProvider
      encounters={encounters}
      initialPayload={initialPayload}
      shortId={shortId}
    >
      <RaidEditor initialEncounterId={initialEncounterId} />
    </RaidProvider>
  )
}
