"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Share2, Copy, Check, Eye, Pencil, Link2, Loader2 } from "lucide-react"
import { useRaid } from "@/lib/raid-context"
import { encodeSession } from "@/lib/url-codec"

const ALL = "__all__"

type ShortenState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; id: string; payload: string }
  | { status: "error"; message: string }

export function ShareDialog({
  activeEncounterId,
}: {
  activeEncounterId?: string
}) {
  const { session, encounters } = useRaid()
  const [copied, setCopied] = useState<"edit" | "view" | null>(null)
  const [shorten, setShorten] = useState<ShortenState>({ status: "idle" })
  const [scope, setScope] = useState<string>(activeEncounterId ?? ALL)

  // Keep scope in sync when the user opens the dialog from a different tab
  useEffect(() => {
    if (activeEncounterId) setScope(activeEncounterId)
  }, [activeEncounterId])

  const scopeSuffix = scope === ALL ? "" : `/${scope}`

  // Detect /r/<id>[/<boss>] paths so the dialog can surface the existing
  // short link without requiring the user to click "Shorten".
  const pathShortId =
    typeof window !== "undefined"
      ? window.location.pathname.match(/^\/r\/([a-z0-9]+)(?:\/[^/]+)?\/?$/i)?.[1]
      : undefined

  const activeShortId =
    shorten.status === "ready" ? shorten.id : pathShortId

  function originPath(path: string) {
    if (typeof window === "undefined") return ""
    return `${window.location.origin}${path}`
  }

  function getEditUrl() {
    if (activeShortId) {
      return originPath(`/r/${activeShortId}${scopeSuffix}`)
    }
    if (typeof window === "undefined") return ""
    return window.location.href
  }

  function getViewUrl() {
    if (activeShortId) {
      return originPath(`/view/${activeShortId}${scopeSuffix}`)
    }
    if (typeof window === "undefined") return ""
    const url = new URL(window.location.href)
    url.pathname = "/view"
    return url.toString()
  }

  async function copyUrl(type: "edit" | "view") {
    const url = type === "edit" ? getEditUrl() : getViewUrl()
    await navigator.clipboard.writeText(url)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  async function handleShorten() {
    const payload = encodeSession(session)

    if (shorten.status === "ready" && shorten.payload === payload) return

    setShorten({ status: "loading" })
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ payload }),
      })
      if (!res.ok) {
        const text = await res.text().catch(() => "")
        throw new Error(text || `request failed (${res.status})`)
      }
      const { id } = (await res.json()) as { id: string }
      setShorten({ status: "ready", id, payload })
    } catch (err) {
      setShorten({
        status: "error",
        message: err instanceof Error ? err.message : "could not shorten link",
      })
    }
  }

  const isShort = activeShortId != null
  const isLoading = shorten.status === "loading"

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setCopied(null)
      }}
    >
      <DialogTrigger asChild>
        <button className="flex items-center gap-1.5 rounded border border-[#3e3830] bg-[#1c1a16] px-3 py-1.5 text-sm text-wow-gold hover:border-wow-gold/50 hover:bg-[#262420] transition-all">
          <Share2 className="h-3.5 w-3.5" />
          Share
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md wow-panel border-[#3e3830]">
        <DialogHeader>
          <DialogTitle className="text-wow-gold-light font-[family-name:var(--font-heading)]">
            Share Assignments
          </DialogTitle>
          <DialogDescription className="text-[#a89880]">
            Share the view link with your raid.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded border border-[#3e3830] bg-[#12110e] px-3 py-2">
            <div className="flex items-center gap-2 text-xs text-[#a89880]">
              <Link2 className="h-3.5 w-3.5" />
              {isShort ? "Using short links" : "Using full links"}
            </div>
            <button
              onClick={handleShorten}
              disabled={isLoading || isShort}
              className="flex items-center gap-1.5 rounded border border-[#3e3830] bg-[#1c1a16] px-2.5 py-1 text-xs text-wow-gold hover:border-wow-gold/50 hover:bg-[#262420] transition-all disabled:opacity-50 disabled:hover:border-[#3e3830] disabled:hover:bg-[#1c1a16]"
            >
              {isLoading && <Loader2 className="h-3 w-3 animate-spin" />}
              {isShort ? "Shortened" : isLoading ? "Shortening" : "Shorten"}
            </button>
          </div>
          {shorten.status === "error" && (
            <p className="text-xs text-red-400">{shorten.message}</p>
          )}
          {isShort && encounters.length > 0 && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-wow-gold">
                Show in preview
              </label>
              <Select value={scope} onValueChange={setScope}>
                <SelectTrigger className="bg-[#12110e] border-[#3e3830] text-wow-gold-light">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All encounters (overview)</SelectItem>
                  {encounters.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-wow-gold">
              <Eye className="h-3.5 w-3.5" />
              View Link (read-only)
            </label>
            <div className="flex gap-2">
              <Input
                readOnly
                value={getViewUrl()}
                className="text-xs bg-[#12110e] border-[#3e3830] text-[#a89880]"
              />
              <button
                onClick={() => copyUrl("view")}
                className="shrink-0 rounded border border-[#3e3830] bg-[#12110e] px-3 text-wow-gold hover:border-wow-gold/50 transition-colors"
              >
                {copied === "view" ? (
                  <Check className="h-3.5 w-3.5 text-green-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#a89880]">
              <Pencil className="h-3.5 w-3.5" />
              Edit Link (for raid leaders)
            </label>
            <div className="flex gap-2">
              <Input
                readOnly
                value={getEditUrl()}
                className="text-xs bg-[#12110e] border-[#3e3830] text-[#a89880]"
              />
              <button
                onClick={() => copyUrl("edit")}
                className="shrink-0 rounded border border-[#3e3830] bg-[#12110e] px-3 text-wow-gold hover:border-wow-gold/50 transition-colors"
              >
                {copied === "edit" ? (
                  <Check className="h-3.5 w-3.5 text-green-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
