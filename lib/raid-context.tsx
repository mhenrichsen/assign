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
}: {
  children: React.ReactNode
  encounters: EncounterDef[]
}) {
  const [hash, setHash] = useUrlHash()
  const [session, dispatch] = useReducer(raidReducer, EMPTY_SESSION)
  const initialized = useRef(false)
  const skipNextSync = useRef(false)

  // Initialize from URL hash on first valid hash
  useEffect(() => {
    if (initialized.current) return
    if (!hash) return

    const decoded = decodeSession(hash)
    if (decoded) {
      dispatch({ type: "SET_SESSION", session: decoded })
      initialized.current = true
      skipNextSync.current = true
    }
  }, [hash])

  // Sync state back to URL hash (debounced)
  useEffect(() => {
    if (!initialized.current) return
    if (skipNextSync.current) {
      skipNextSync.current = false
      return
    }

    const timer = setTimeout(() => {
      const encoded = encodeSession(session)
      setHash(encoded)
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
