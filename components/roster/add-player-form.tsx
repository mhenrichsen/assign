"use client"

import { useState } from "react"
import { nanoid } from "nanoid"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import { WOW_CLASSES, CLASS_COLORS } from "@/lib/wow"
import type { WowClass } from "@/lib/types"
import { useRaid } from "@/lib/raid-context"
import { ClassIcon } from "@/components/class-icon"

export function AddPlayerForm() {
  const { dispatch } = useRaid()
  const [name, setName] = useState("")
  const [wowClass, setWowClass] = useState<WowClass | "">("")

  function handleAdd() {
    if (!name.trim() || !wowClass) return
    dispatch({
      type: "ADD_PLAYER",
      player: { id: nanoid(8), name: name.trim(), class: wowClass },
    })
    setName("")
  }

  return (
    <div className="flex gap-1.5">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        className="h-8 flex-1 text-sm bg-[#12110e] border-[#3e3830] text-wow-gold-light placeholder:text-[#3e3830]"
      />
      <Select
        value={wowClass}
        onValueChange={(v) => setWowClass(v as WowClass)}
      >
        <SelectTrigger className="h-8 w-[110px] text-sm bg-[#12110e] border-[#3e3830]">
          <SelectValue placeholder="Class" />
        </SelectTrigger>
        <SelectContent className="bg-[#1a1816] border-[#3e3830]">
          {WOW_CLASSES.map((c) => (
            <SelectItem key={c} value={c}>
              <span className="flex items-center gap-1.5">
                <ClassIcon wowClass={c} size={14} />
                <span style={{ color: CLASS_COLORS[c] }}>{c}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <button
        onClick={handleAdd}
        disabled={!name.trim() || !wowClass}
        className="h-8 w-8 shrink-0 flex items-center justify-center rounded border border-[#3e3830] bg-[#12110e] text-wow-gold hover:border-wow-gold hover:bg-[#1c1a16] disabled:opacity-30 disabled:hover:border-[#3e3830] transition-colors"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
