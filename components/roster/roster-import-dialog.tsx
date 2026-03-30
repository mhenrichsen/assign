"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"
import { useRaid } from "@/lib/raid-context"
import { parseRosterText, parsedLinesToPlayers } from "@/lib/roster-parser"
import { ClassBadge } from "@/components/class-icon"

export function RosterImportDialog() {
  const { dispatch } = useRaid()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")

  const parsed = text.trim() ? parseRosterText(text) : []
  const validCount = parsed.filter((l) => l.class).length
  const invalidCount = parsed.filter((l) => !l.class).length

  function handleImport() {
    const players = parsedLinesToPlayers(parsed)
    if (players.length > 0) {
      dispatch({ type: "IMPORT_PLAYERS", players })
      setText("")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex w-full items-center justify-center gap-1.5 rounded border border-[#3e3830] bg-[#12110e] px-3 py-1.5 text-sm text-[#a89880] hover:border-[#7a6a4a] hover:text-wow-gold transition-colors">
          <Upload className="h-3.5 w-3.5" />
          Import Roster
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg wow-panel border-[#3e3830]">
        <DialogHeader>
          <DialogTitle className="text-wow-gold-light font-[family-name:var(--font-heading)]">
            Import Roster
          </DialogTitle>
          <DialogDescription className="text-[#a89880]">
            Paste player names with their class, one per line.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder={`Tankboi Warrior\nHealzalot Priest\nPewpew Hunter\nSneakyguy Rogue`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          className="font-mono text-sm bg-[#12110e] border-[#3e3830] text-wow-gold-light placeholder:text-[#3e3830]"
        />
        {parsed.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-[#a89880]">
              {validCount} player{validCount !== 1 && "s"} detected
              {invalidCount > 0 && (
                <span className="text-red-400">
                  {" "}
                  ({invalidCount} unrecognized)
                </span>
              )}
            </p>
            <div className="flex max-h-40 flex-wrap gap-1.5 overflow-y-auto">
              {parsed.map((line, i) =>
                line.class ? (
                  <ClassBadge key={i} wowClass={line.class} size="xs" />
                ) : null
              )}
            </div>
            {invalidCount > 0 && (
              <p className="text-xs text-[#7a6a4a]">
                Skipped:{" "}
                {parsed
                  .filter((l) => !l.class)
                  .map((l) => l.name)
                  .join(", ")}
              </p>
            )}
          </div>
        )}
        <button
          onClick={handleImport}
          disabled={validCount === 0}
          className="w-full rounded border border-wow-gold/50 bg-gradient-to-b from-[#7a6a4a] to-[#3d2e1a] px-4 py-2 text-sm font-semibold text-wow-gold-light hover:from-[#6b5a35] hover:to-[#4d3e25] disabled:opacity-30 transition-all font-[family-name:var(--font-heading)]"
        >
          Import {validCount} Player{validCount !== 1 && "s"}
        </button>
      </DialogContent>
    </Dialog>
  )
}
