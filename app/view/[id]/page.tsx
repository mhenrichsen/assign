import { notFound } from "next/navigation"
import { getLink } from "@/lib/db.server"
import ViewClient from "../view-client"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

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
