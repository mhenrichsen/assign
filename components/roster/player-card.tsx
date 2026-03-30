"use client"

import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import type { Player } from "@/lib/types"
import { CLASS_COLORS } from "@/lib/wow"
import { cn } from "@/lib/utils"
import { ClassIcon } from "@/components/class-icon"
import { X } from "lucide-react"

export function PlayerCard({
  player,
  assignedCount = 0,
  onRemove,
}: {
  player: Player
  assignedCount?: number
  onRemove?: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: player.id,
      data: { player },
    })

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined

  const color = CLASS_COLORS[player.class]

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "group flex cursor-grab items-center gap-2 rounded border px-2.5 py-1.5 text-sm select-none transition-all",
        "border-[#3e3830] bg-[#1c1a16] hover:border-[#7a6a4a] hover:bg-[#262420]",
        isDragging && "opacity-40"
      )}
    >
      <ClassIcon wowClass={player.class} size={16} />
      <span className="flex-1 truncate font-medium" style={{ color }}>
        {player.name}
      </span>
      {assignedCount > 0 && (
        <span className="shrink-0 rounded bg-wow-gold/20 px-1.5 py-0.5 text-xs font-medium text-wow-gold">
          {assignedCount}
        </span>
      )}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="text-[#7a6a4a] hover:text-red-400 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}

export function PlayerCardOverlay({ player }: { player: Player }) {
  const color = CLASS_COLORS[player.class]

  return (
    <div className="flex cursor-grabbing items-center gap-2 rounded border border-wow-gold/50 bg-[#262420] px-2.5 py-1.5 text-sm shadow-lg shadow-black/50 select-none">
      <ClassIcon wowClass={player.class} size={16} />
      <span className="truncate font-medium" style={{ color }}>
        {player.name}
      </span>
    </div>
  )
}
