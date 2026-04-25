import { notFound } from "next/navigation"
import { getLink } from "@/lib/db.server"
import { decodeSession } from "@/lib/url-codec"
import { ALL_ENCOUNTERS } from "@/lib/encounters"
import {
  renderOgImage,
  OG_SIZE,
  OG_CONTENT_TYPE,
} from "@/lib/og/render"

export const runtime = "nodejs"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image({
  params,
}: {
  params: Promise<{ id: string; boss: string }>
}) {
  const { id, boss } = await params
  if (!ALL_ENCOUNTERS.some((e) => e.id === boss)) notFound()
  const payload = getLink(id)
  if (!payload) notFound()
  const session = decodeSession(payload)
  if (!session) notFound()
  return renderOgImage({ session, encounterId: boss })
}
