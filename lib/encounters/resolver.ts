import type { AssignmentSlot, EncounterDef, Player } from "../types"
import { buildGeneralEncounter } from "./general"

/**
 * Resolve an encounter definition against a roster.
 * Injects dynamic slots (misdirections, etc.) based on roster composition.
 */
export function resolveEncounter(
  encounter: EncounterDef,
  roster: Player[]
): EncounterDef {
  if (roster.length === 0) return encounter

  // General Assignments has its own full builder
  if (encounter.id === "general") {
    return buildGeneralEncounter(roster)
  }

  // For all other encounters, inject roster-based dynamic slots
  const dynamicSlots = buildDynamicSlots(encounter.id, roster)
  if (dynamicSlots.length === 0) return encounter

  return {
    ...encounter,
    slots: [...encounter.slots, ...dynamicSlots],
  }
}

/**
 * Compute auto-prefill assignments for an encounter based on roster.
 * Returns a map of slotId -> [playerIds] for slots that should be pre-populated.
 */
export function computePrefills(
  encounter: EncounterDef,
  roster: Player[]
): Record<string, string[]> {
  const prefills: Record<string, string[]> = {}
  if (roster.length === 0) return prefills

  const hunters = roster.filter((p) => p.class === "Hunter")
  const druids = roster.filter((p) => p.class === "Druid")

  if (encounter.id === "general") {
    // Druids into innervate slots
    druids.forEach((druid, i) => {
      prefills[`innervate-${i + 1}`] = [druid.id]
    })
    // Hunters into MD slots
    hunters.forEach((hunter, i) => {
      prefills[`misdirect-${i + 1}`] = [hunter.id]
    })
  } else {
    // Boss encounters: hunters into MD slots
    hunters.forEach((hunter, i) => {
      prefills[`${encounter.id}-md-${i + 1}`] = [hunter.id]
    })
  }

  return prefills
}

// --- Dynamic slot builders ---

function buildDynamicSlots(
  encounterId: string,
  roster: Player[]
): AssignmentSlot[] {
  const slots: AssignmentSlot[] = []
  const hunters = roster.filter((p) => p.class === "Hunter")

  // Misdirections — one per hunter
  hunters.forEach((_, i) => {
    slots.push({
      id: `${encounterId}-md-${i + 1}`,
      label: `{ability:misdirection} Misdirection ${i + 1}`,
      group: "Misdirections",
      multi: true,
      maxPlayers: 2,
      pairLabels: ["Hunter", "Target"],
      description: "Hunter → their MD target on pull",
    })
  })

  return slots
}
