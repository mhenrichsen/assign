import type { AssignmentSlot, EncounterDef, Player } from "../types"

// Static base definition (used when no roster is available yet)
const BASE_SLOTS: AssignmentSlot[] = [
  // Warlock Curses — dropdown select, exclusive (one curse per warlock)
  {
    id: "curse-elements",
    label: "{ability:curse-of-elements} Curse of the Elements",
    group: "Warlock Curses",
    selectFrom: "Warlock",
    exclusiveGroup: "warlock-curse",
    description: "Reduces Arcane/Fire/Frost/Shadow resists by 88, +10% damage taken",
  },
  {
    id: "curse-recklessness",
    label: "{ability:curse-of-recklessness} Curse of Recklessness",
    group: "Warlock Curses",
    selectFrom: "Warlock",
    exclusiveGroup: "warlock-curse",
    description: "Reduces armor, target won't flee",
  },
  {
    id: "curse-tongues",
    label: "{ability:curse-of-tongues} Curse of Tongues",
    group: "Warlock Curses",
    selectFrom: "Warlock",
    exclusiveGroup: "warlock-curse",
    description: "Slows enemy casting speed by 50%",
  },
  {
    id: "curse-doom",
    label: "{ability:curse-of-doom} Curse of Doom",
    group: "Warlock Curses",
    selectFrom: "Warlock",
    exclusiveGroup: "warlock-curse",
    description: "Massive damage after 60s, only if no other curse needed",
  },

  // Warrior Debuffs
  {
    id: "thunderclap",
    label: "{ability:thunderclap} Thunder Clap",
    group: "Warrior Debuffs",
    selectFrom: "Warrior",
    description: "Reduces attack speed of nearby enemies",
  },
  {
    id: "sunder-armor",
    label: "{ability:sunder-armor} Sunder Armor",
    group: "Warrior Debuffs",
    selectFrom: "Warrior",
    description: "Reduces target armor, 5 stacks",
  },
  {
    id: "demo-shout",
    label: "{ability:demo-shout} Demoralizing Shout",
    group: "Warrior Debuffs",
    selectFrom: "Warrior",
    description: "Reduces enemy attack power",
  },

  // Druid Utility — faerie fire dropdown
  {
    id: "faerie-fire",
    label: "{ability:faerie-fire} Faerie Fire",
    group: "Druid Utility",
    selectFrom: "Druid",
    description: "Reduces target armor, prevents stealth",
  },

  // Paladin Judgements — dropdown, exclusive (one judgement per paladin)
  {
    id: "judgement-wisdom",
    label: "{ability:judgement-of-wisdom} Judgement of Wisdom",
    group: "Paladin Judgements",
    selectFrom: "Paladin",
    exclusiveGroup: "paladin-judgement",
    description: "Attacks restore mana to the attacker",
  },
  {
    id: "judgement-light",
    label: "{ability:judgement-of-light} Judgement of Light",
    group: "Paladin Judgements",
    selectFrom: "Paladin",
    exclusiveGroup: "paladin-judgement",
    description: "Attacks restore health to the attacker",
  },

  // Mage Debuffs
  {
    id: "improved-scorch",
    label: "{ability:improved-scorch} Improved Scorch",
    group: "Mage Debuffs",
    selectFrom: "Mage",
    description: "Fire vulnerability debuff, 5 stacks",
  },
  {
    id: "winters-chill",
    label: "{ability:winters-chill} Winter's Chill",
    group: "Mage Debuffs",
    selectFrom: "Mage",
    description: "Frost crit debuff on target",
  },

  // Shaman / Priest
  {
    id: "bloodlust-1",
    label: "{ability:bloodlust} Bloodlust / Heroism",
    group: "Shaman & Priest",
    accepts: ["Shaman"],
    multi: true,
    maxPlayers: 5,
    repeatable: true,
    description: "First Bloodlust group (usually melee or healers)",
  },
  {
    id: "shadow-weaving",
    label: "{ability:shadow-weaving} Shadow Weaving",
    group: "Shaman & Priest",
    selectFrom: "Priest",
    description: "Shadow Priest keeps 5 stacks of Shadow Weaving on boss",
  },
]

// Build General Assignments dynamically based on roster
export function buildGeneralEncounter(roster: Player[]): EncounterDef {
  const druids = roster.filter((p) => p.class === "Druid")
  const hunters = roster.filter((p) => p.class === "Hunter")

  const dynamicSlots: AssignmentSlot[] = []

  // Generate innervate slots — one per druid
  druids.forEach((druid, i) => {
    dynamicSlots.push({
      id: `innervate-${i + 1}`,
      label: `{ability:innervate} Innervate ${i + 1}`,
      group: "Druid Utility",
      multi: true,
      maxPlayers: 2,
      pairLabels: ["Druid", "Target"],
      description: "Druid → their innervate target",
    })
  })

  // Battle res priority — one res per druid per fight
  dynamicSlots.push({
    id: "battle-res-1",
    label: "{ability:battle-res} Battle Res Priority",
    group: "Druid Utility",
    multi: true,
    maxPlayers: Math.max(druids.length, 1),
    repeatable: true,
    description: `${druids.length} druid${druids.length !== 1 ? "s" : ""} = ${druids.length} combat res`,
  })

  // Generate MD slots — one per hunter
  const hunterMdSlots: AssignmentSlot[] = []
  hunters.forEach((hunter, i) => {
    hunterMdSlots.push({
      id: `misdirect-${i + 1}`,
      label: `{ability:misdirection} Misdirection ${i + 1}`,
      group: "Hunter Utility",
      multi: true,
      maxPlayers: 2,
      pairLabels: ["Hunter", "Target"],
      description: "Hunter → their MD target",
    })
  })

  // Insert slots in the right order: base slots with dynamic ones injected
  const slots: AssignmentSlot[] = []
  let addedDruidDynamic = false
  const addedHunterDynamic = false

  for (const slot of BASE_SLOTS) {
    // Insert dynamic druid slots after faerie fire
    if (slot.group === "Druid Utility" && !addedDruidDynamic) {
      slots.push(slot) // faerie fire
      slots.push(...dynamicSlots)
      addedDruidDynamic = true
      continue
    }

    // Replace Hunter Utility section with dynamic MD slots + hunter's mark
    if (slot.id === "hunters-mark") {
      // hunters-mark doesn't exist in BASE_SLOTS anymore, skip
      continue
    }

    slots.push(slot)
  }

  // Add Hunter Utility group
  if (!addedHunterDynamic) {
    // Insert hunter's mark + dynamic MDs
    const hunterSlots: AssignmentSlot[] = [
      {
        id: "hunters-mark",
        label: "{ability:hunters-mark} Hunter's Mark",
        group: "Hunter Utility",
        selectFrom: "Hunter",
        description: "Increases ranged attack power vs target",
      },
      ...hunterMdSlots,
    ]
    // Find where to insert (after Druid Utility, before Paladin)
    const paladinIdx = slots.findIndex((s) => s.group === "Paladin Judgements")
    if (paladinIdx >= 0) {
      slots.splice(paladinIdx, 0, ...hunterSlots)
    } else {
      slots.push(...hunterSlots)
    }
  }

  return {
    id: "general",
    name: "General Assignments",
    raid: "general",
    raidName: "General",
    description:
      "Raid-wide utility assignments — curses, debuffs, buffs, and cooldowns",
    slots,
  }
}

// Pre-fill assignments: auto-assign druids to innervate slots, hunters to MD slots
export function prefillGeneralAssignments(
  roster: Player[]
): Record<string, string[]> {
  const assignments: Record<string, string[]> = {}
  const druids = roster.filter((p) => p.class === "Druid")
  const hunters = roster.filter((p) => p.class === "Hunter")

  druids.forEach((druid, i) => {
    assignments[`innervate-${i + 1}`] = [druid.id]
  })

  hunters.forEach((hunter, i) => {
    assignments[`misdirect-${i + 1}`] = [hunter.id]
  })

  return assignments
}

// Fallback static definition for when roster isn't available
export const generalAssignments: EncounterDef = {
  id: "general",
  name: "General Assignments",
  raid: "general",
  raidName: "General",
  description:
    "Raid-wide utility assignments — curses, debuffs, buffs, and cooldowns",
  slots: BASE_SLOTS,
}
