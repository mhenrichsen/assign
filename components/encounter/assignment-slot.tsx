"use client"

import type { AssignmentSlot as SlotType } from "@/lib/types"
import { SelectSlot } from "./select-slot"
import { DragDropSlot } from "./drag-drop-slot"

export function AssignmentSlot({
  slot,
  encounterId,
  readOnly,
}: {
  slot: SlotType
  encounterId: string
  readOnly?: boolean
}) {
  if (slot.selectFrom) {
    return (
      <SelectSlot slot={slot} encounterId={encounterId} readOnly={readOnly} />
    )
  }

  return (
    <DragDropSlot slot={slot} encounterId={encounterId} readOnly={readOnly} />
  )
}
