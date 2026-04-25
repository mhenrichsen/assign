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
}: {
  children: React.ReactNode
  encounters: EncounterDef[]
  initialPayload?: string
}) {
  const [hash, setHash] = useUrlHash()
  const [session, dispatch] = useReducer(raidReducer, EMPTY_SESSION)
  const initialized = useRef(false)
  // Stable JSON of the session that the URL already represents — gzip output
  // varies by mtime header, so we compare structurally instead of by bytes.
  const lastSyncedJson = useRef<string | null>(null)

  // Initialize from URL hash (preferred — survives user edits across reloads)
  // or fall back to the server-provided snapshot for short-URL routes.
  useEffect(() => {
    if (initialized.current) return
    const source = hash || initialPayload
    if (!source) return

    const decoded = decodeSession(source)
    if (decoded) {
      dispatch({ type: "SET_SESSION", session: decoded })
      initialized.current = true
      lastSyncedJson.current = JSON.stringify(decoded)
    }
  }, [hash, initialPayload])

  // Sync state back to URL hash (debounced) — only when the session has
  // actually changed compared to what the URL already represents.
  useEffect(() => {
    if (!initialized.current) return

    const timer = setTimeout(() => {
      const json = JSON.stringify(session)
      if (json === lastSyncedJson.current) return
      lastSyncedJson.current = json
      setHash(encodeSession(session))
    }, 300)

    return () => clearTimeout(timer)
  }, [session, setHash])

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
