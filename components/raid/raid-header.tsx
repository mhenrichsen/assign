"use client"

import { useEffect, useRef, useState } from "react"
import { useRaid } from "@/lib/raid-context"
import { ShareDialog } from "./share-dialog"
import Link from "next/link"
import { Pencil, Swords, Users } from "lucide-react"

export function RaidHeader({
  activeEncounterId,
  onToggleRoster,
}: {
  activeEncounterId?: string
  onToggleRoster?: () => void
}) {
  const { session, dispatch, encounters } = useRaid()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(session.name)
  const inputRef = useRef<HTMLInputElement>(null)

  const raidNames = [
    ...new Set(encounters.map((e) => e.raidName)),
  ].join(" + ")

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  function startEditing() {
    setDraft(session.name)
    setEditing(true)
  }

  function commit() {
    const next = draft.trim()
    if (next && next !== session.name) {
      dispatch({ type: "SET_NAME", name: next })
    }
    setEditing(false)
  }

  function cancel() {
    setDraft(session.name)
    setEditing(false)
  }

  return (
    <div className="wow-header flex items-center justify-between gap-2 px-2 py-2.5 sm:px-4">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {onToggleRoster && (
          <button
            onClick={onToggleRoster}
            className="flex shrink-0 items-center justify-center rounded border border-[#3e3830] bg-[#1c1a16] p-1.5 text-wow-gold hover:border-wow-gold/50 hover:bg-[#262420] transition-all md:hidden"
            title="Toggle roster"
          >
            <Users className="h-4 w-4" />
          </button>
        )}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5 text-[#a89880] hover:text-wow-gold transition-colors"
        >
          <Swords className="h-4 w-4" />
          <span className="text-base font-[family-name:var(--font-heading)]">Assign</span>
        </Link>
        <span className="text-[#3e3830]">/</span>
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit()
              else if (e.key === "Escape") cancel()
            }}
            placeholder="Untitled Raid"
            className="rounded border border-wow-gold/40 bg-[#12110e] px-2 py-0.5 text-base font-semibold text-wow-gold-light font-[family-name:var(--font-heading)] focus:border-wow-gold focus:outline-none"
          />
        ) : (
          <button
            onClick={startEditing}
            title="Rename raid"
            className="group flex min-w-0 items-center gap-1.5 rounded px-1 py-0.5 -mx-1 -my-0.5 text-base font-semibold text-wow-gold-light font-[family-name:var(--font-heading)] hover:bg-[#262420] transition-colors"
          >
            <span className="truncate">
              {session.name || "Untitled Raid"}
            </span>
            <Pencil className="h-3 w-3 shrink-0 text-[#7a6a4a] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        )}
        <span className="hidden text-sm text-[#7a6a4a] sm:inline">
          {raidNames}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <ShareDialog activeEncounterId={activeEncounterId} />
      </div>
    </div>
  )
}
