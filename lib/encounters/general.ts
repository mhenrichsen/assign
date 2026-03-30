import type { AssignmentSlot, EncounterDef, Player } from "../types"

const GENERAL_META: Pick<EncounterDef, "id" | "name" | "raid" | "raidName" | "description"> = {
  id: "general",
  name: "General Assignments",
  raid: "general",
  raidName: "General",
  description:
    "Raid-wide utility assignments — curses, debuffs, buffs, and cooldowns",
}

// Build General Assignments dynamically based on roster
export function buildGeneralEncounter(roster: Player[]): EncounterDef {
  const druids = roster.filter((p) => p.class === "Druid")
  const hunters = roster.filter((p) => p.class === "Hunter")

  const slots: AssignmentSlot[] = [
    // --- Warlock Curses (dropdown, exclusive) ---
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

    // --- Warrior Debuffs (dropdown) ---
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

    // --- Druid Utility ---
    {
      id: "faerie-fire",
      label: "{ability:faerie-fire} Faerie Fire",
      group: "Druid Utility",
      selectFrom: "Druid",
      description: "Reduces target armor, prevents stealth",
    },
    // Dynamic innervates (one per druid)
    ...druids.map((_, i) => ({
      id: `innervate-${i + 1}`,
      label: `{ability:innervate} Innervate ${i + 1}`,
      group: "Druid Utility",
      multi: true,
      maxPlayers: 2,
      pairLabels: ["Druid", "Target"] as [string, string],
      description: "Druid → their innervate target",
    })),
    // Battle res (scales with druid count)
    {
      id: "battle-res-1",
      label: "{ability:battle-res} Battle Res Priority",
      group: "Druid Utility",
      multi: true,
      maxPlayers: Math.max(druids.length, 1),
      repeatable: true,
      description: `${druids.length} druid${druids.length !== 1 ? "s" : ""} = ${druids.length} combat res`,
    },

    // --- Hunter Utility ---
    {
      id: "hunters-mark",
      label: "{ability:hunters-mark} Hunter's Mark",
      group: "Hunter Utility",
      selectFrom: "Hunter",
      description: "Increases ranged attack power vs target",
    },
    // Dynamic misdirections (one per hunter)
    ...hunters.map((_, i) => ({
      id: `misdirect-${i + 1}`,
      label: `{ability:misdirection} Misdirection ${i + 1}`,
      group: "Hunter Utility",
      multi: true,
      maxPlayers: 2,
      pairLabels: ["Hunter", "Target"] as [string, string],
      description: "Hunter → their MD target",
    })),

    // --- Paladin Judgements (dropdown, exclusive) ---
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

    // --- Mage Debuffs (dropdown) ---
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

    // --- Shaman & Priest ---
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

  return { ...GENERAL_META, slots }
}

// Fallback static definition for when roster isn't available yet
export const generalAssignments: EncounterDef = {
  ...GENERAL_META,
  slots: [],
}
