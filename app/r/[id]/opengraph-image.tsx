import { notFound } from "next/navigation"
import { getLink } from "@/lib/db.server"
import { decodeSession } from "@/lib/url-codec"
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
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const payload = getLink(id)
  if (!payload) notFound()
  const session = decodeSession(payload)
  if (!session) notFound()
  return renderOgImage({ session })
}
