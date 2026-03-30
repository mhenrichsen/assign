import type { AssignmentSlot as SlotType } from "@/lib/types"
import { AssignmentSlot } from "./assignment-slot"

export function SlotGroup({
  name,
  slots,
  encounterId,
  readOnly,
}: {
  name: string
  slots: SlotType[]
  encounterId: string
  readOnly?: boolean
}) {
  return (
    <div className="wow-card rounded-lg">
      <div className="wow-group-header px-2.5 py-1.5">
        <h3 className="text-sm font-semibold text-wow-gold font-[family-name:var(--font-heading)]">
          {name}
        </h3>
      </div>
      <div className="space-y-1 p-2">
        {slots.map((slot) => (
          <AssignmentSlot
            key={slot.id}
            slot={slot}
            encounterId={encounterId}
            readOnly={readOnly}
          />
        ))}
      </div>
    </div>
  )
}
