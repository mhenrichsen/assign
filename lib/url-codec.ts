import { gzipSync, gunzipSync } from "fflate"
import type { RaidSession } from "./types"

const VERSION = 1

function toBase64Url(bytes: Uint8Array): string {
  let binary = ""
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function fromBase64Url(str: string): Uint8Array {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/")
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4)
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export function encodeSession(session: RaidSession): string {
  const json = JSON.stringify(session)
  const data = new TextEncoder().encode(json)
  const compressed = gzipSync(data)
  const payload = new Uint8Array(1 + compressed.length)
  payload[0] = VERSION
  payload.set(compressed, 1)
  return toBase64Url(payload)
}

export function decodeSession(hash: string): RaidSession | null {
  try {
    const payload = fromBase64Url(hash)
    if (payload.length < 2) return null
    const version = payload[0]
    if (version !== VERSION) return null
    const compressed = payload.slice(1)
    const data = gunzipSync(compressed)
    const json = new TextDecoder().decode(data)
    return JSON.parse(json) as RaidSession
  } catch {
    return null
  }
}
