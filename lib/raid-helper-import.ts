import { nanoid } from "nanoid"
import type { Player, WowClass } from "./types"
import { WOW_CLASSES } from "./wow"

export interface RaidHelperSlot {
  name?: string
  className?: string
  specName?: string
}

export interface RaidHelperPlan {
  slots?: RaidHelperSlot[]
  title?: string
}

const SPEC_TO_CLASS: Record<string, WowClass> = {
  Protection: "Warrior",
  Protection1: "Paladin",
  Guardian: "Druid",
}

const WOW_CLASS_SET = new Set<string>(WOW_CLASSES)

export function extractRaidHelperId(input: string): string | null {
  const trimmed = input.trim()
  if (!trimmed) return null
  if (/^\d{6,}$/.test(trimmed)) return trimmed
  const match = trimmed.match(/raid-helper\.xyz\/raidplan\/(\d+)/i)
  if (match) return match[1]
  const tail = trimmed.match(/(\d{8,})/)
  return tail ? tail[1] : null
}

export function slotToClass(slot: RaidHelperSlot): WowClass | null {
  const className = slot.className ?? ""
  if (WOW_CLASS_SET.has(className)) return className as WowClass
  const specName = slot.specName ?? ""
  if (SPEC_TO_CLASS[specName]) return SPEC_TO_CLASS[specName]
  return null
}

export function planToPlayers(plan: RaidHelperPlan): Player[] {
  if (!plan.slots) return []
  const players: Player[] = []
  const seen = new Set<string>()
  for (const slot of plan.slots) {
    const name = (slot.name ?? "").trim()
    if (!name) continue
    const cls = slotToClass(slot)
    if (!cls) continue
    const key = `${name}::${cls}`
    if (seen.has(key)) continue
    seen.add(key)
    players.push({ id: nanoid(8), name, class: cls })
  }
  return players
}
