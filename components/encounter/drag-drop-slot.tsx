"use client"

import { useDroppable } from "@dnd-kit/core"
import type { AssignmentSlot as SlotType, Player } from "@/lib/types"
import { useRaid } from "@/lib/raid-context"
import { AssignedPlayer } from "./assigned-player"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info, Plus } from "lucide-react"
import { SlotLabel } from "@/components/raid-mark"

export function DragDropSlot({
  slot,
  encounterId,
  readOnly,
}: {
  slot: SlotType
  encounterId: string
  readOnly?: boolean
}) {
  const { session, dispatch } = useRaid()
  const { isOver, setNodeRef, active } = useDroppable({
    id: `${encounterId}::${slot.id}`,
    data: { slot, encounterId },
  })

  const encounterAssignments = session.encounters[encounterId] ?? {}
  const assignedPlayerIds = encounterAssignments[slot.id] ?? []
  const assignedPlayers = assignedPlayerIds
    .map((id) => session.roster.find((p) => p.id === id))
    .filter((p): p is Player => p !== undefined)

  const overriddenMax = session.slotMaxOverrides?.[encounterId]?.[slot.id]
  const maxPlayers = slot.multi
    ? (overriddenMax ?? slot.maxPlayers ?? 99)
    : 1
  const isFull = assignedPlayers.length >= maxPlayers

  const activePlayer = active?.data?.current?.player as Player | undefined
  const isValidDrop =
    activePlayer && slot.accepts
      ? slot.accepts.includes(activePlayer.class)
      : true
  const wouldExceedMax = isFull && activePlayer !== undefined

  function handleExpand() {
    dispatch({
      type: "EXPAND_SLOT",
      encounterId,
      slotId: slot.id,
      currentMax: maxPlayers,
    })
  }

  return (
    <div
      ref={readOnly ? undefined : setNodeRef}
      className={cn(
        "wow-slot rounded p-1.5 transition-all",
        !readOnly && isOver && isValidDrop && !wouldExceedMax && "wow-slot-valid",
        !readOnly && isOver && (!isValidDrop || wouldExceedMax) && "wow-slot-invalid"
      )}
    >
      <div className="mb-1 flex items-center gap-1">
        <span className="text-sm font-medium text-wow-gold leading-tight">
          <SlotLabel label={slot.label} />
          {slot.multi && slot.maxPlayers && (
            <span className="ml-1 text-[#a89880]">
              ({assignedPlayers.length}/{maxPlayers})
            </span>
          )}
        </span>
        {slot.accepts && (
          <span className="text-xs text-[#7a6a4a]">
            {slot.accepts.join("/")}
          </span>
        )}
        {slot.description && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-2.5 w-2.5 text-[#7a6a4a] hover:text-wow-gold transition-colors shrink-0" />
            </TooltipTrigger>
            <TooltipContent className="wow-tooltip text-xs text-wow-gold-light">
              <p>{slot.description}</p>
            </TooltipContent>
          </Tooltip>
        )}
        {slot.repeatable && !readOnly && (
          <button
            onClick={handleExpand}
            className="ml-auto flex items-center rounded border border-[#3e3830] bg-[#12110e] p-0.5 text-[#a89880] hover:border-wow-gold/50 hover:text-wow-gold transition-colors shrink-0"
            title="Add one more"
          >
            <Plus className="h-2.5 w-2.5" />
          </button>
        )}
      </div>

      {assignedPlayers.length > 0 ? (
        slot.pairLabels ? (
          <div className="space-y-0.5">
            {slot.pairLabels.map((pairLabel, i) => {
              const player = assignedPlayers[i]
              return (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-xs text-[#7a6a4a] w-10 shrink-0 text-right">
                    {pairLabel}
                  </span>
                  {player ? (
                    <div className="flex-1 min-w-0">
                      <AssignedPlayer
                        player={player}
                        readOnly={readOnly}
                        compact
                        onRemove={() =>
                          dispatch({
                            type: "UNASSIGN_PLAYER",
                            encounterId,
                            slotId: slot.id,
                            playerId: player.id,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className="flex-1 text-xs text-[#3e3830] italic py-1">
                      {readOnly ? "—" : "Drop here"}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="space-y-0.5">
            {assignedPlayers.map((player) => (
              <AssignedPlayer
                key={player.id}
                player={player}
                readOnly={readOnly}
                compact
                onRemove={() =>
                  dispatch({
                    type: "UNASSIGN_PLAYER",
                    encounterId,
                    slotId: slot.id,
                    playerId: player.id,
                  })
                }
              />
            ))}
          </div>
        )
      ) : (
        <div className="py-1.5 text-center text-xs text-[#3e3830] italic">
          {readOnly ? "—" : "Drop here"}
        </div>
      )}
    </div>
  )
}
