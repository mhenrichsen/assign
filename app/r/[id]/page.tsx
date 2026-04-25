import { notFound } from "next/navigation"
import { getLink } from "@/lib/db.server"
import RaidEditorClient from "../raid-editor-client"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export default async function ShortRaidPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const payload = getLink(id)
  if (!payload) notFound()
  return <RaidEditorClient initialPayload={payload} />
}
