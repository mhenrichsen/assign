"use client"

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react"
import type { EncounterDef, RaidSession } from "./types"
import { raidReducer, type RaidAction } from "./raid-reducer"
import { encodeSession, decodeSession } from "./url-codec"
import { useUrlHash } from "@/hooks/use-url-hash"

interface RaidContextValue {
  session: RaidSession
  dispatch: (action: RaidAction) => void
  encounters: EncounterDef[]
}

const RaidContext = createContext<RaidContextValue | null>(null)

const EMPTY_SESSION: RaidSession = {
  id: "",
  name: "",
  roster: [],
  encounters: {},
  createdAt: 0,
}

export function RaidProvider({
  children,
  encounters,
  initialPayload,
  shortId,
}: {
  children: React.ReactNode
  encounters: EncounterDef[]
  initialPayload?: string
  shortId?: string
}) {
  const [hash, setHash] = useUrlHash()
  const [session, dispatch] = useReducer(raidReducer, EMPTY_SESSION)
  const initialized = useRef(false)
  // Stable JSON of the session that has been persisted — gzip output varies
  // by mtime header, so we compare structurally instead of by bytes.
  const lastSyncedJson = useRef<string | null>(null)

  // Initialize from the server-provided payload if present (canonical source
  // for short-URL routes), otherwise fall back to the URL hash.
  useEffect(() => {
    if (initialized.current) return
    const source = initialPayload || hash
    if (!source) return

    const decoded = decodeSession(source)
    if (decoded) {
      dispatch({ type: "SET_SESSION", session: decoded })
      initialized.current = true
      lastSyncedJson.current = JSON.stringify(decoded)
    }
  }, [hash, initialPayload])

  // Sync state back to its canonical location (DB for short links, URL hash
  // otherwise), debounced — only when the session has actually changed.
  useEffect(() => {
    if (!initialized.current) return

    const timer = setTimeout(() => {
      const json = JSON.stringify(session)
      if (json === lastSyncedJson.current) return
      lastSyncedJson.current = json
      const payload = encodeSession(session)
      if (shortId) {
        fetch(`/api/shorten/${shortId}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ payload }),
        }).catch(() => {
          // Network blip: drop the cached marker so the next change retries.
          lastSyncedJson.current = null
        })
      } else {
        setHash(payload)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [session, setHash, shortId])

  return (
    <RaidContext.Provider
      value={{ session, dispatch, encounters }}
    >
      {children}
    </RaidContext.Provider>
  )
}

export function useRaid() {
  const ctx = useContext(RaidContext)
  if (!ctx) throw new Error("useRaid must be used within RaidProvider")
  return ctx
}
