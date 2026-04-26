"use client"

import type { EncounterDef } from "@/lib/types"
import { EncounterTab } from "./encounter-tab"
import { BOSS_META } from "@/lib/encounter-meta"
import { cn } from "@/lib/utils"

export function EncounterWorkspace({
  encounters,
  activeEncounterId,
  onEncounterChange,
  readOnly,
}: {
  encounters: EncounterDef[]
  activeEncounterId: string
  onEncounterChange: (id: string) => void
  readOnly?: boolean
}) {
  return (
    <div className="flex h-full flex-col">
      {/* WoW-style tab bar — horizontally scrollable on narrow screens */}
      <div className="flex items-center gap-0 overflow-x-auto whitespace-nowrap border-b border-[#3e3830] bg-[#16140f] px-2 [scrollbar-width:thin]">
        {encounters.map((enc) => {
          const meta = BOSS_META[enc.id]
          const isActive = enc.id === activeEncounterId
          return (
            <button
              key={enc.id}
              onClick={() => onEncounterChange(enc.id)}
              className={cn(
                "relative flex shrink-0 items-center gap-2 px-4 py-2.5 text-base font-medium transition-all",
                "font-[family-name:var(--font-heading)]",
                isActive
                  ? "text-wow-gold-light wow-tab-active"
                  : "text-[#a89880] hover:text-wow-gold"
              )}
            >
              {meta && <span className="text-base">{meta.icon}</span>}
              {enc.name}
            </button>
          )
        })}
      </div>

      {/* Active encounter content */}
      <div className="flex-1 overflow-hidden">
        {encounters.map((enc) =>
          enc.id === activeEncounterId ? (
            <EncounterTab key={enc.id} encounter={enc} readOnly={readOnly} />
          ) : null
        )}
      </div>
    </div>
  )
}
