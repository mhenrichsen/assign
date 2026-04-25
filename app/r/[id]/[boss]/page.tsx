import { notFound } from "next/navigation"
import { getLink } from "@/lib/db.server"
import { decodeSession } from "@/lib/url-codec"
import { ALL_ENCOUNTERS } from "@/lib/encounters"
import { buildMetadata } from "@/lib/og/metadata"
import RaidEditorClient from "../../raid-editor-client"
import type { Metadata } from "next"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function isKnownEncounter(boss: string): boolean {
  return ALL_ENCOUNTERS.some((e) => e.id === boss)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; boss: string }>
}): Promise<Metadata> {
  const { id, boss } = await params
  if (!isKnownEncounter(boss)) return {}
  const payload = getLink(id)
  if (!payload) return {}
  const session = decodeSession(payload)
  if (!session) return {}
  return buildMetadata({
    session,
    encounterId: boss,
    pathname: `/r/${id}/${boss}`,
  })
}

export default async function ShortRaidBossPage({
  params,
}: {
  params: Promise<{ id: string; boss: string }>
}) {
  const { id, boss } = await params
  if (!isKnownEncounter(boss)) notFound()
  const payload = getLink(id)
  if (!payload) notFound()
  return (
    <RaidEditorClient initialPayload={payload} initialEncounterId={boss} />
  )
}
