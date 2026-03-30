import { nanoid } from "nanoid"
import type { Player, WowClass } from "./types"
import { CLASS_ABBREVIATIONS } from "./wow"

function parseClass(input: string): WowClass | null {
  const lower = input.toLowerCase().trim()
  return CLASS_ABBREVIATIONS[lower] ?? null
}

export interface ParsedLine {
  name: string
  class: WowClass | null
  raw: string
}

export function parseRosterText(text: string): ParsedLine[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((raw) => {
      // Try tab-separated first, then space-separated
      const sep = raw.includes("\t") ? "\t" : /\s+/
      const parts = raw.split(sep).filter(Boolean)

      if (parts.length >= 2) {
        const lastPart = parts[parts.length - 1]
        const cls = parseClass(lastPart)
        if (cls) {
          const name = parts.slice(0, -1).join(" ")
          return { name, class: cls, raw }
        }
      }

      // Just a name, no class detected
      return { name: parts.join(" "), class: null, raw }
    })
}

export function parsedLinesToPlayers(
  lines: ParsedLine[],
  defaultClass?: WowClass
): Player[] {
  return lines
    .filter((l) => l.class || defaultClass)
    .map((l) => ({
      id: nanoid(8),
      name: l.name,
      class: (l.class ?? defaultClass)!,
    }))
}
