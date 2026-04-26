import { notFound } from "next/navigation"
import { getLink } from "@/lib/db.server"
import { decodeSession } from "@/lib/url-codec"
import { buildMetadata } from "@/lib/og/metadata"
import RaidEditorClient from "../raid-editor-client"
import type { Metadata } from "next"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const payload = getLink(id)
  if (!payload) return {}
  const session = decodeSession(payload)
  if (!session) return {}
  return buildMetadata({ session, pathname: `/r/${id}` })
}

export default async function ShortRaidPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const payload = getLink(id)
  if (!payload) notFound()
  return <RaidEditorClient initialPayload={payload} shortId={id} />
}
