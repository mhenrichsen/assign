"use client"

import { useMemo } from "react"
import type { AssignmentSlot as SlotType, Player } from "@/lib/types"
import { useRaid } from "@/lib/raid-context"
import { CLASS_COLORS } from "@/lib/wow"
import { ClassIcon } from "@/components/class-icon"
import { ChevronDown, X } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export function PlayerSelect({
  slot,
  allSlots,
  encounterId,
}: {
  slot: SlotType
  allSlots: SlotType[]
  encounterId: string
}) {
  const { session, dispatch } = useRaid()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const encounterAssignments = session.encounters[encounterId] ?? {}
  const assignedIds = encounterAssignments[slot.id] ?? []
  const assignedPlayer =
    assignedIds.length > 0
      ? session.roster.find((p) => p.id === assignedIds[0])
      : null

  const classPlayers = useMemo(
    () => session.roster.filter((p) => p.class === slot.selectFrom),
    [session.roster, slot.selectFrom]
  )

  // Find players already taken by other slots in the same exclusive group
  const takenPlayerIds = useMemo(() => {
    const taken = new Set<string>()
    if (!slot.exclusiveGroup) return taken

    const exclusiveSlotIds = allSlots
      .filter(
        (s) =>
          s.exclusiveGroup === slot.exclusiveGroup && s.id !== slot.id
      )
      .map((s) => s.id)

    for (const slotId of exclusiveSlotIds) {
      const playerIds = encounterAssignments[slotId] ?? []
      playerIds.forEach((id) => taken.add(id))
    }

    return taken
  }, [slot.exclusiveGroup, slot.id, allSlots, encounterAssignments])

  const availablePlayers = classPlayers.filter(
    (p) => !takenPlayerIds.has(p.id) || p.id === assignedIds[0]
  )

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  function handleSelect(player: Player) {
    if (assignedIds.length > 0) {
      dispatch({
        type: "UNASSIGN_PLAYER",
        encounterId,
        slotId: slot.id,
        playerId: assignedIds[0],
      })
    }
    dispatch({
      type: "ASSIGN_PLAYER",
      encounterId,
      slotId: slot.id,
      playerId: player.id,
    })
    setOpen(false)
  }

  function handleClear() {
    if (assignedIds.length > 0) {
      dispatch({
        type: "UNASSIGN_PLAYER",
        encounterId,
        slotId: slot.id,
        playerId: assignedIds[0],
      })
    }
  }

  const color = assignedPlayer
    ? CLASS_COLORS[assignedPlayer.class]
    : undefined

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-1.5 rounded border border-border bg-wow-slot px-2 py-1 text-sm hover:border-wow-border transition-colors"
      >
        {assignedPlayer ? (
          <>
            <ClassIcon wowClass={assignedPlayer.class} size={13} />
            <span
              className="flex-1 text-left truncate font-medium"
              style={{ color }}
            >
              {assignedPlayer.name}
            </span>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation()
                handleClear()
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") { e.stopPropagation(); handleClear() }
              }}
              className="text-wow-border hover:text-red-400 transition-colors cursor-pointer"
            >
              <X className="h-3 w-3" />
            </span>
          </>
        ) : (
          <>
            <span className="flex-1 text-left text-wow-border italic">
              Select {slot.selectFrom}...
            </span>
            <ChevronDown className="h-3 w-3 text-wow-border" />
          </>
        )}
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded border border-border bg-wow-panel shadow-lg shadow-black/50 overflow-hidden">
          {availablePlayers.length > 0 ? (
            availablePlayers.map((player) => {
              const pColor = CLASS_COLORS[player.class]
              const isCurrent = player.id === assignedIds[0]
              return (
                <button
                  key={player.id}
                  onClick={() => handleSelect(player)}
                  className={`flex w-full items-center gap-1.5 px-2 py-1.5 text-sm hover:bg-wow-panel-light transition-colors ${
                    isCurrent ? "bg-wow-panel-light" : ""
                  }`}
                >
                  <ClassIcon wowClass={player.class} size={13} />
                  <span className="font-medium" style={{ color: pColor }}>
                    {player.name}
                  </span>
                </button>
              )
            })
          ) : (
            <div className="px-2 py-1.5 text-sm text-wow-border italic">
              No {slot.selectFrom}s available
            </div>
          )}
        </div>
      )}
    </div>
  )
}
