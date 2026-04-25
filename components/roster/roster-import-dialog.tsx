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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"
import { useRaid } from "@/lib/raid-context"
import { parseRosterText, parsedLinesToPlayers } from "@/lib/roster-parser"
import { ClassBadge } from "@/components/class-icon"
import { PlayerIcon } from "@/components/player-icon"
import { CLASS_COLORS } from "@/lib/wow"
import type { Player } from "@/lib/types"

export function RosterImportDialog() {
  const { dispatch } = useRaid()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [rhInput, setRhInput] = useState("")
  const [rhPlayers, setRhPlayers] = useState<Player[]>([])
  const [rhTitle, setRhTitle] = useState<string | null>(null)
  const [rhError, setRhError] = useState<string | null>(null)
  const [rhLoading, setRhLoading] = useState(false)

  const parsed = text.trim() ? parseRosterText(text) : []
  const validCount = parsed.filter((l) => l.class).length
  const invalidCount = parsed.filter((l) => !l.class).length

  function resetAndClose() {
    setText("")
    setRhInput("")
    setRhPlayers([])
    setRhTitle(null)
    setRhError(null)
    setOpen(false)
  }

  function handleImportText() {
    const players = parsedLinesToPlayers(parsed)
    if (players.length > 0) {
      dispatch({ type: "IMPORT_PLAYERS", players })
      resetAndClose()
    }
  }

  async function handleFetchRaidHelper() {
    setRhError(null)
    setRhPlayers([])
    setRhTitle(null)
    if (!rhInput.trim()) return
    setRhLoading(true)
    try {
      const res = await fetch("/api/raid-helper", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ input: rhInput }),
      })
      const data = await res.json()
      if (!res.ok) {
        setRhError(data?.error ?? "Failed to load raid plan")
        return
      }
      setRhPlayers(data.players ?? [])
      setRhTitle(data.title ?? null)
      if (!data.players?.length) {
        setRhError("No players found in this raid plan")
      }
    } catch {
      setRhError("Network error while fetching raid plan")
    } finally {
      setRhLoading(false)
    }
  }

  function handleImportRaidHelper() {
    if (rhPlayers.length === 0) return
    dispatch({ type: "IMPORT_PLAYERS", players: rhPlayers })
    resetAndClose()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => (v ? setOpen(true) : resetAndClose())}
    >
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
            Paste names with classes, or import a comp from raid-helper.xyz.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="raid-helper">
          <TabsList className="w-full">
            <TabsTrigger value="text">Paste list</TabsTrigger>
            <TabsTrigger value="raid-helper">Raid-Helper</TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-3">
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
              onClick={handleImportText}
              disabled={validCount === 0}
              className="w-full rounded border border-wow-gold/50 bg-gradient-to-b from-[#7a6a4a] to-[#3d2e1a] px-4 py-2 text-sm font-semibold text-wow-gold-light hover:from-[#6b5a35] hover:to-[#4d3e25] disabled:opacity-30 transition-all font-[family-name:var(--font-heading)]"
            >
              Import {validCount} Player{validCount !== 1 && "s"}
            </button>
          </TabsContent>

          <TabsContent value="raid-helper" className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="https://raid-helper.xyz/raidplan/..."
                value={rhInput}
                onChange={(e) => setRhInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleFetchRaidHelper()
                }}
                className="bg-[#12110e] border-[#3e3830] text-wow-gold-light placeholder:text-[#3e3830]"
              />
              <button
                onClick={handleFetchRaidHelper}
                disabled={!rhInput.trim() || rhLoading}
                className="rounded border border-[#3e3830] bg-[#12110e] px-3 py-1 text-sm text-[#a89880] hover:border-[#7a6a4a] hover:text-wow-gold disabled:opacity-30 transition-colors"
              >
                {rhLoading ? "Loading…" : "Fetch"}
              </button>
            </div>
            <p className="text-xs text-[#7a6a4a]">
              Paste a raid-helper.xyz raidplan URL or just the numeric id.
            </p>
            {rhError && <p className="text-sm text-red-400">{rhError}</p>}
            {rhPlayers.length > 0 && (
              <div className="space-y-2">
                {rhTitle && (
                  <p className="text-sm text-wow-gold-light">{rhTitle}</p>
                )}
                <p className="text-sm text-[#a89880]">
                  {rhPlayers.length} player
                  {rhPlayers.length !== 1 && "s"} found
                </p>
                <div className="flex max-h-40 flex-wrap gap-1.5 overflow-y-auto">
                  {rhPlayers.map((p) => (
                    <span
                      key={p.id}
                      className="inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px]"
                      style={{
                        color: CLASS_COLORS[p.class],
                        backgroundColor: `${CLASS_COLORS[p.class]}15`,
                        borderColor: `${CLASS_COLORS[p.class]}30`,
                      }}
                    >
                      <PlayerIcon player={p} size={12} />
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={handleImportRaidHelper}
              disabled={rhPlayers.length === 0}
              className="w-full rounded border border-wow-gold/50 bg-gradient-to-b from-[#7a6a4a] to-[#3d2e1a] px-4 py-2 text-sm font-semibold text-wow-gold-light hover:from-[#6b5a35] hover:to-[#4d3e25] disabled:opacity-30 transition-all font-[family-name:var(--font-heading)]"
            >
              Import {rhPlayers.length} Player
              {rhPlayers.length !== 1 && "s"}
            </button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
