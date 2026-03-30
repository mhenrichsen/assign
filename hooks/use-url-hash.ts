"use client"

import { useCallback, useSyncExternalStore } from "react"

function getHash() {
  return typeof window !== "undefined"
    ? window.location.hash.slice(1)
    : ""
}

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback)
  return () => window.removeEventListener("hashchange", callback)
}

function getServerSnapshot() {
  return ""
}

export function useUrlHash(): [string, (hash: string) => void] {
  const hash = useSyncExternalStore(subscribe, getHash, getServerSnapshot)

  const setHash = useCallback((newHash: string) => {
    window.history.replaceState(null, "", `#${newHash}`)
    // Manually dispatch hashchange since replaceState doesn't trigger it
    window.dispatchEvent(new HashChangeEvent("hashchange"))
  }, [])

  return [hash, setHash]
}
