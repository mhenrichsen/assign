"use client"

import type { Player } from "@/lib/types"
import { CLASS_COLORS } from "@/lib/wow"
import { PlayerIcon } from "@/components/player-icon"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export function AssignedPlayer({
  player,
  onRemove,
  readOnly,
  compact,
}: {
  player: Player
  onRemove?: () => void
  readOnly?: boolean
  compact?: boolean
}) {
  const color = CLASS_COLORS[player.class]

  return (
    <div
      className={cn(
        "wow-assigned group flex items-center gap-1.5 rounded text-sm",
        compact ? "px-1.5 py-0.5" : "px-2 py-1.5"
      )}
      style={{ borderLeftColor: color, borderLeftWidth: 2 }}
    >
      <PlayerIcon player={player} size={compact ? 13 : 16} />
      <span
        className={cn("truncate font-medium", compact && "text-sm")}
        style={{ color }}
      >
        {player.name}
      </span>
      {!readOnly && onRemove && (
        <button
          onClick={onRemove}
          className="ml-auto opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-400 text-[#a89880]"
        >
          <X className={cn(compact ? "h-2.5 w-2.5" : "h-3 w-3")} />
        </button>
      )}
    </div>
  )
}
