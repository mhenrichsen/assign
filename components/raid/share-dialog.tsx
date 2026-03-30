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
import { Share2, Copy, Check, Eye, Pencil } from "lucide-react"

export function ShareDialog() {
  const [copied, setCopied] = useState<"edit" | "view" | null>(null)

  function getEditUrl() {
    return window.location.href
  }

  function getViewUrl() {
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

  return (
    <Dialog>
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
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-wow-gold">
              <Eye className="h-3.5 w-3.5" />
              View Link (read-only)
            </label>
            <div className="flex gap-2">
              <Input
                readOnly
                value={typeof window !== "undefined" ? getViewUrl() : ""}
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
                value={typeof window !== "undefined" ? getEditUrl() : ""}
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
