import type { AssignmentSlot, Player } from "../types"

// Generate misdirection slots based on hunters in the roster
export function buildMdSlots(
  encounterId: string,
  hunters: Player[]
): AssignmentSlot[] {
  if (hunters.length === 0) return []

  return hunters.map((_, i) => ({
    id: `${encounterId}-md-${i + 1}`,
    label: `{ability:misdirection} Misdirection ${i + 1}`,
    group: "Misdirections",
    multi: true,
    maxPlayers: 2,
    pairLabels: ["Hunter", "Target"] as [string, string],
    description: "Hunter → their MD target on pull",
  }))
}

// Pre-fill hunters into their MD slots
export function prefillMdAssignments(
  encounterId: string,
  hunters: Player[]
): Record<string, string[]> {
  const assignments: Record<string, string[]> = {}
  hunters.forEach((hunter, i) => {
    assignments[`${encounterId}-md-${i + 1}`] = [hunter.id]
  })
  return assignments
}
