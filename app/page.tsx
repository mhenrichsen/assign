"use client"

import { useState } from "react"
import { nanoid } from "nanoid"
import { Input } from "@/components/ui/input"
import { RAID_INSTANCES } from "@/lib/encounters"
import { encodeSession } from "@/lib/url-codec"
import { PlayerIcon } from "@/components/player-icon"
import { CLASS_COLORS } from "@/lib/wow"
import type { Player, RaidSession } from "@/lib/types"
import { DEMO_ROSTER, DEMO_ASSIGNMENTS } from "@/lib/demo-roster"
import { Swords, Shield, Flame, Play } from "lucide-react"
import { cn } from "@/lib/utils"

const INSTANCE_ICONS: Record<string, React.ReactNode> = {
  "gruuls-lair": <Shield className="h-5 w-5" />,
  "magtheridons-lair": <Flame className="h-5 w-5" />,
}

function navigateToRaidViaHash(session: Omit<RaidSession, "createdAt">) {
  const hash = encodeSession({ ...session, createdAt: Date.now() })
  window.location.href = `/r#${hash}`
}

async function navigateToShortRaid(
  session: Omit<RaidSession, "createdAt">
): Promise<void> {
  const payload = encodeSession({ ...session, createdAt: Date.now() })
  try {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ payload }),
    })
    if (!res.ok) throw new Error(`shorten failed (${res.status})`)
    const { id } = (await res.json()) as { id: string }
    window.location.href = `/r/${id}`
  } catch {
    // Fall back to the hash-only flow so the user can still get into the editor.
    window.location.href = `/r#${payload}`
  }
}

export default function HomePage() {
  const [name, setName] = useState("")
  const [raidIds, setRaidIds] = useState<string[]>([])
  const [rhInput, setRhInput] = useState("")
  const [rhPlayers, setRhPlayers] = useState<Player[]>([])
  const [rhError, setRhError] = useState<string | null>(null)
  const [rhLoading, setRhLoading] = useState(false)

  const [creating, setCreating] = useState(false)

  function handleDemo() {
    navigateToRaidViaHash({
      id: nanoid(8),
      name: "Wednesday Gruul + Mag",
      roster: DEMO_ROSTER,
      encounters: DEMO_ASSIGNMENTS,
    })
  }

  async function handleFetchRaidHelper() {
    setRhError(null)
    setRhPlayers([])
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
      const players = (data.players ?? []) as Player[]
      setRhPlayers(players)
      if (players.length === 0) {
        setRhError("No players found in this raid plan")
      }
    } catch {
      setRhError("Network error while fetching raid plan")
    } finally {
      setRhLoading(false)
    }
  }

  async function handleCreate() {
    if (!name.trim()) return
    if (raidIds.length === 0) return
    if (creating) return

    const encounters: RaidSession["encounters"] = {}

    for (const raidId of raidIds) {
      const instance = RAID_INSTANCES.find((r) => r.id === raidId)
      if (instance) {
        for (const enc of instance.encounters) {
          encounters[enc.id] = {}
        }
      }
    }

    setCreating(true)
    await navigateToShortRaid({
      id: nanoid(8),
      name: name.trim(),
      roster: rhPlayers,
      encounters,
    })
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Logo / Title */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-3">
            <Swords className="h-8 w-8 text-wow-gold" />
            <h1 className="text-4xl font-bold wow-gold-text font-[family-name:var(--font-heading)]">
              Assign
            </h1>
          </div>
          <p className="text-sm text-[#a89880]">
            Raid assignments for The Burning Crusade
          </p>
        </div>

        {/* Main card */}
        <div className="wow-card rounded-lg p-6 space-y-5">
          <div className="text-center mb-2">
            <h2 className="text-lg font-semibold text-wow-gold-light font-[family-name:var(--font-heading)]">
              Create Raid
            </h2>
          </div>

          {/* Raid name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-wow-gold">
              Raid Name
            </label>
            <Input
              placeholder="Wednesday Night Gruul"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#12110e] border-[#3e3830] text-wow-gold-light placeholder:text-[#3e3830] focus:border-wow-gold/50"
            />
          </div>

          {/* Instance selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-wow-gold">
              Instance
            </label>
            <div className="flex gap-3">
              {RAID_INSTANCES.map((inst) => {
                const selected = raidIds.includes(inst.id)
                return (
                  <button
                    key={inst.id}
                    onClick={() =>
                      setRaidIds(
                        selected
                          ? raidIds.filter((id) => id !== inst.id)
                          : [...raidIds, inst.id]
                      )
                    }
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-all",
                      "font-[family-name:var(--font-heading)]",
                      selected
                        ? "border-wow-gold/60 bg-wow-gold/10 text-wow-gold-light shadow-[0_0_12px_rgba(201,170,113,0.15)]"
                        : "border-[#3e3830] bg-[#12110e] text-[#a89880] hover:border-[#7a6a4a] hover:text-wow-gold"
                    )}
                  >
                    {INSTANCE_ICONS[inst.id]}
                    {inst.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Raid-Helper composition */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-wow-gold">
              Raid-Helper Comp{" "}
              <span className="font-normal text-[#7a6a4a]">(optional)</span>
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="https://raid-helper.xyz/raidplan/..."
                value={rhInput}
                onChange={(e) => setRhInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleFetchRaidHelper()
                  }
                }}
                className="bg-[#12110e] border-[#3e3830] text-wow-gold-light placeholder:text-[#3e3830] focus:border-wow-gold/50"
              />
              <button
                type="button"
                onClick={handleFetchRaidHelper}
                disabled={!rhInput.trim() || rhLoading}
                className="rounded border border-[#3e3830] bg-[#12110e] px-3 py-1 text-sm text-[#a89880] hover:border-[#7a6a4a] hover:text-wow-gold disabled:opacity-30 transition-colors"
              >
                {rhLoading ? "Loading…" : "Fetch"}
              </button>
            </div>
            {rhError && <p className="text-xs text-red-400">{rhError}</p>}
            {rhPlayers.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
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
                <span className="self-center text-xs text-[#7a6a4a]">
                  {rhPlayers.length} player
                  {rhPlayers.length !== 1 && "s"}
                </span>
              </div>
            )}
          </div>

          {/* Create button */}
          <button
            onClick={handleCreate}
            disabled={!name.trim() || raidIds.length === 0 || creating}
            className={cn(
              "w-full rounded-lg border px-4 py-3 text-base font-semibold transition-all",
              "font-[family-name:var(--font-heading)]",
              "border-wow-gold/50 bg-gradient-to-b from-[#7a6a4a] to-[#3d2e1a] text-wow-gold-light",
              "hover:from-[#6b5a35] hover:to-[#4d3e25] hover:shadow-[0_0_16px_rgba(201,170,113,0.2)]",
              "disabled:opacity-30 disabled:hover:shadow-none"
            )}
          >
            <Swords className="inline h-4 w-4 mr-2 -mt-0.5" />
            {creating ? "Creating…" : "Create Raid"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-[#3e3830]" />
            <span className="text-xs text-[#7a6a4a]">or</span>
            <div className="flex-1 border-t border-[#3e3830]" />
          </div>

          {/* Demo button */}
          <button
            onClick={handleDemo}
            className={cn(
              "w-full rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
              "border-[#3e3830] bg-transparent text-[#a89880]",
              "hover:border-[#7a6a4a] hover:text-wow-gold hover:bg-[#1c1a16]/50"
            )}
          >
            <Play className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" />
            Try Demo (25-man with assignments)
          </button>
        </div>
      </div>
    </div>
  )
}
