import { notFound } from "next/navigation"
import { getLink } from "@/lib/db.server"
import { decodeSession } from "@/lib/url-codec"
import { buildMetadata } from "@/lib/og/metadata"
import ViewClient from "../view-client"
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
  return buildMetadata({ session, pathname: `/view/${id}` })
}

export default async function ShortViewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const payload = getLink(id)
  if (!payload) notFound()
  return <ViewClient initialPayload={payload} />
}
