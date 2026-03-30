"use client"

import { useRaid } from "@/lib/raid-context"
import { ShareDialog } from "./share-dialog"
import Link from "next/link"
import { Swords } from "lucide-react"

export function RaidHeader() {
  const { session, encounters } = useRaid()

  const raidNames = [
    ...new Set(encounters.map((e) => e.raidName)),
  ].join(" + ")

  return (
    <div className="wow-header flex items-center justify-between px-4 py-2.5">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[#a89880] hover:text-wow-gold transition-colors"
        >
          <Swords className="h-4 w-4" />
          <span className="text-base font-[family-name:var(--font-heading)]">Assign</span>
        </Link>
        <span className="text-[#3e3830]">/</span>
        <h1 className="font-semibold text-wow-gold-light font-[family-name:var(--font-heading)]">
          {session.name || "Untitled Raid"}
        </h1>
        <span className="text-sm text-[#7a6a4a]">{raidNames}</span>
      </div>
      <div className="flex items-center gap-2">
        <ShareDialog />
      </div>
    </div>
  )
}
