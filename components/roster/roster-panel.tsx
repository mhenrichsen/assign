"use client"

import { useState } from "react"
import { useRaid } from "@/lib/raid-context"
import { WOW_CLASSES, CLASS_COLORS } from "@/lib/wow"
import type { WowClass } from "@/lib/types"
import { PlayerCard } from "./player-card"
import { AddPlayerForm } from "./add-player-form"
import { RosterImportDialog } from "./roster-import-dialog"
import { ClassIcon } from "@/components/class-icon"
import { cn } from "@/lib/utils"
import { Users, X } from "lucide-react"

export function RosterPanel({
  activeEncounterId,
  isOpen = false,
  onClose,
}: {
  activeEncounterId: string
  isOpen?: boolean
  onClose?: () => void
}) {
  const { session, dispatch } = useRaid()
  const [classFilter, setClassFilter] = useState<WowClass | null>(null)

  const encounterAssignments = session.encounters[activeEncounterId] ?? {}
  const assignedPlayerIds = new Set(
    Object.values(encounterAssignments).flat()
  )
  // Count how many slots each player is in for the current encounter
  const playerSlotCounts = new Map<string, number>()
  for (const playerIds of Object.values(encounterAssignments)) {
    for (const id of playerIds) {
      playerSlotCounts.set(id, (playerSlotCounts.get(id) ?? 0) + 1)
    }
  }

  const filteredRoster = classFilter
    ? session.roster.filter((p) => p.class === classFilter)
    : session.roster

  const sortedRoster = [...filteredRoster].sort((a, b) => {
    const aAssigned = assignedPlayerIds.has(a.id)
    const bAssigned = assignedPlayerIds.has(b.id)
    if (aAssigned !== bAssigned) return aAssigned ? 1 : -1
    if (a.class !== b.class) return a.class.localeCompare(b.class)
    return a.name.localeCompare(b.name)
  })

  return (
    <>
      {/* Backdrop — mobile only, when drawer is open */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-20 bg-black/60 transition-opacity md:hidden",
          isOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        )}
      />
      <aside
        className={cn(
          "flex h-full w-[280px] flex-col border-r border-[#3e3830] bg-[#16140f]",
          // Mobile: fixed overlay that slides in from the left
          "fixed inset-y-0 left-0 z-30 transform shadow-xl shadow-black/50 transition-transform duration-200",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: in-flow sidebar, always visible
          "md:relative md:z-auto md:translate-x-0 md:shadow-none md:transition-none"
        )}
      >
        {/* Header */}
        <div className="border-b border-[#3e3830] p-3">
          <div className="mb-2.5 flex items-center gap-2">
            <Users className="h-4 w-4 text-wow-gold" />
            <h2 className="text-base font-semibold text-wow-gold font-[family-name:var(--font-heading)]">
              Roster
            </h2>
            <span className="text-xs text-[#7a6a4a]">
              ({session.roster.length})
            </span>
            {onClose && (
              <button
                onClick={onClose}
                className="ml-auto rounded p-1 text-[#7a6a4a] hover:bg-[#262420] hover:text-wow-gold transition-colors md:hidden"
                title="Close roster"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <AddPlayerForm />
          <div className="mt-2">
            <RosterImportDialog />
          </div>
        </div>

      {/* Class filters */}
      <div className="flex flex-wrap gap-1 border-b border-[#3e3830] p-2">
        <button
          onClick={() => setClassFilter(null)}
          className={cn(
            "rounded px-1.5 py-0.5 text-sm transition-all",
            !classFilter
              ? "bg-wow-gold/20 text-wow-gold border border-wow-gold/40"
              : "text-[#a89880] hover:text-wow-gold border border-transparent"
          )}
        >
          All
        </button>
        {WOW_CLASSES.map((c) => {
          const count = session.roster.filter((p) => p.class === c).length
          if (count === 0) return null
          const isActive = classFilter === c
          return (
            <button
              key={c}
              onClick={() => setClassFilter(isActive ? null : c)}
              className={cn(
                "flex items-center gap-1 rounded px-1.5 py-0.5 text-sm transition-all border",
                isActive
                  ? "wow-filter-active border-current"
                  : "border-transparent hover:border-current/30"
              )}
              style={{
                color: CLASS_COLORS[c],
                backgroundColor: isActive
                  ? `${CLASS_COLORS[c]}15`
                  : undefined,
              }}
            >
              <ClassIcon wowClass={c} size={12} />
              {count}
            </button>
          )
        })}
      </div>

      {/* Player list — native scroll for reliable touch momentum */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="space-y-1 p-2">
          {sortedRoster.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              assignedCount={playerSlotCounts.get(player.id) ?? 0}
              onRemove={() =>
                dispatch({ type: "REMOVE_PLAYER", playerId: player.id })
              }
            />
          ))}
          {sortedRoster.length === 0 && (
            <p className="py-8 text-center text-base text-[#3e3830] italic">
              {session.roster.length === 0
                ? "Import or add players"
                : "No players match filter"}
            </p>
          )}
        </div>
      </div>
      </aside>
    </>
  )
}
