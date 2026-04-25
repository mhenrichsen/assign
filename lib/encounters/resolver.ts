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

// Per-encounter spec defaults. Keyed by encounterId, then `<Class>:<Spec>` -> slot ids.
// First matching player in roster order wins; existing assignments are never overwritten.
const ENCOUNTER_SPEC_PREFILLS: Record<string, Record<string, string[]>> = {
  general: {
    "Mage:Fire": ["improved-scorch"],
    "Mage:Frost": ["winters-chill"],
    "Priest:Shadow": ["shadow-weaving"],
    "Warrior:Protection": ["sunder-armor"],
    "Druid:Balance": ["faerie-fire"],
    "Druid:Dreamstate": ["faerie-fire"],
    "Warlock:Affliction": ["curse-elements"],
    "Rogue:Combat": ["expose-armor"],
    "Paladin:Holy": ["judgement-wisdom"],
    "Paladin:Retribution": ["judgement-crusader"],
    "Paladin:Protection": ["judgement-light"],
  },
  maulgar: {
    "Druid:Balance": ["kiggler-tank"],
    "Druid:Dreamstate": ["kiggler-tank"],
    "Warrior:Protection": ["maulgar-mt"],
  },
  gruul: {
    "Warrior:Protection": ["gruul-mt"],
    "Druid:Feral": ["gruul-ot1"],
    "Paladin:Protection": ["gruul-ot1"],
  },
  magtheridon: {
    "Warrior:Protection": ["mag-mt"],
  },
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

  // Spec-based defaults — first matching player in roster order wins.
  const specPrefills = ENCOUNTER_SPEC_PREFILLS[encounter.id]
  if (specPrefills) {
    for (const player of roster) {
      if (!player.spec) continue
      const slotIds = specPrefills[`${player.class}:${player.spec}`]
      if (!slotIds) continue
      for (const slotId of slotIds) {
        if (prefills[slotId]) continue
        prefills[slotId] = [player.id]
      }
    }
  }

  // Conflict resolution: Expose Armor (Combat rogue) supplants Sunder Armor —
  // they don't stack, and Expose is the better debuff.
  if (encounter.id === "general" && prefills["expose-armor"]) {
    delete prefills["sunder-armor"]
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
