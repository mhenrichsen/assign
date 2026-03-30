"use client"

import type { AssignmentSlot as SlotType } from "@/lib/types"
import { useRaid } from "@/lib/raid-context"
import { AssignedPlayer } from "./assigned-player"
import { PlayerSelect } from "./player-select"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { SlotLabel } from "@/components/raid-mark"

export function SelectSlot({
  slot,
  encounterId,
  readOnly,
}: {
  slot: SlotType
  encounterId: string
  readOnly?: boolean
}) {
  const { session } = useRaid()
  const encounterAssignments = session.encounters[encounterId] ?? {}
  const assignedIds = encounterAssignments[slot.id] ?? []
  const player =
    assignedIds.length > 0
      ? session.roster.find((p) => p.id === assignedIds[0])
      : null

  return (
    <div className="wow-slot rounded p-1.5">
      <div className="mb-1 flex items-center gap-1">
        <span className="text-sm font-medium text-wow-gold leading-tight">
          <SlotLabel label={slot.label} />
        </span>
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
      </div>
      {readOnly ? (
        player ? (
          <AssignedPlayer player={player} readOnly compact />
        ) : (
          <div className="py-1.5 text-center text-xs text-[#3e3830] italic">
            —
          </div>
        )
      ) : (
        <PlayerSelect slot={slot} encounterId={encounterId} />
      )}
    </div>
  )
}
