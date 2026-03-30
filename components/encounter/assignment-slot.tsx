"use client"

import type { AssignmentSlot as SlotType } from "@/lib/types"
import { SelectSlot } from "./select-slot"
import { DragDropSlot } from "./drag-drop-slot"

export function AssignmentSlot({
  slot,
  allSlots,
  encounterId,
  readOnly,
}: {
  slot: SlotType
  allSlots: SlotType[]
  encounterId: string
  readOnly?: boolean
}) {
  if (slot.selectFrom) {
    return (
      <SelectSlot slot={slot} allSlots={allSlots} encounterId={encounterId} readOnly={readOnly} />
    )
  }

  return (
    <DragDropSlot slot={slot} encounterId={encounterId} readOnly={readOnly} />
  )
}
