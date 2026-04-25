import type { WowClass } from "./types"

export const WOW_CLASSES: WowClass[] = [
  "Warrior",
  "Paladin",
  "Hunter",
  "Rogue",
  "Priest",
  "Shaman",
  "Mage",
  "Warlock",
  "Druid",
]

export const CLASS_COLORS: Record<WowClass, string> = {
  Warrior: "#C79C6E",
  Paladin: "#F58CBA",
  Hunter: "#ABD473",
  Rogue: "#FFF569",
  Priest: "#FFFFFF",
  Shaman: "#0070DE",
  Mage: "#69CCF0",
  Warlock: "#9482C9",
  Druid: "#FF7D0A",
}

export function getSpecIconUrl(specIcon: string | undefined | null): string | null {
  if (!specIcon) return null
  if (!/^\d+$/.test(specIcon)) return null
  return `https://cdn.discordapp.com/emojis/${specIcon}.png`
}

export const CLASS_ABBREVIATIONS: Record<string, WowClass> = {
  warrior: "Warrior",
  warr: "Warrior",
  war: "Warrior",
  paladin: "Paladin",
  pala: "Paladin",
  pal: "Paladin",
  hunter: "Hunter",
  hunt: "Hunter",
  rogue: "Rogue",
  rog: "Rogue",
  priest: "Priest",
  pri: "Priest",
  shaman: "Shaman",
  sham: "Shaman",
  sha: "Shaman",
  mage: "Mage",
  warlock: "Warlock",
  lock: "Warlock",
  druid: "Druid",
  dru: "Druid",
}
