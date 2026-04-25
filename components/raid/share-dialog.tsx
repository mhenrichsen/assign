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
import { Input } from "@/components/ui/input"
import { Share2, Copy, Check, Eye, Pencil, Link2, Loader2 } from "lucide-react"
import { useRaid } from "@/lib/raid-context"
import { encodeSession } from "@/lib/url-codec"

type ShortenState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; id: string; payload: string }
  | { status: "error"; message: string }

export function ShareDialog() {
  const { session } = useRaid()
  const [copied, setCopied] = useState<"edit" | "view" | null>(null)
  const [shorten, setShorten] = useState<ShortenState>({ status: "idle" })

  function originPath(path: string) {
    if (typeof window === "undefined") return ""
    return `${window.location.origin}${path}`
  }

  function getEditUrl() {
    if (shorten.status === "ready") return originPath(`/r/${shorten.id}`)
    if (typeof window === "undefined") return ""
    return window.location.href
  }

  function getViewUrl() {
    if (shorten.status === "ready") return originPath(`/view/${shorten.id}`)
    if (typeof window === "undefined") return ""
    const url = new URL(window.location.href)
    // Strip a possible /r/<id> prefix back to /view#hash
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

    // Reuse cached id if the session hasn't changed since last shorten.
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

  const isShort = shorten.status === "ready"
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
