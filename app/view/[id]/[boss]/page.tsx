import { notFound } from "next/navigation"
import { getLink } from "@/lib/db.server"
import { decodeSession } from "@/lib/url-codec"
import { ALL_ENCOUNTERS } from "@/lib/encounters"
import { buildMetadata } from "@/lib/og/metadata"
import ViewClient from "../../view-client"
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
    pathname: `/view/${id}/${boss}`,
  })
}

export default async function ShortViewBossPage({
  params,
}: {
  params: Promise<{ id: string; boss: string }>
}) {
  const { id, boss } = await params
  if (!isKnownEncounter(boss)) notFound()
  const payload = getLink(id)
  if (!payload) notFound()
  return <ViewClient initialPayload={payload} initialEncounterId={boss} />
}
