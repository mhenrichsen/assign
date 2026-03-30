import type { EncounterDef } from "../types"

export const gruul: EncounterDef = {
  id: "gruul",
  name: "Gruul the Dragonkiller",
  raid: "gruuls-lair",
  raidName: "Gruul's Lair",
  description: "Single boss — Hurtful Strike hits highest-threat melee",
  slots: [
    {
      id: "gruul-mt",
      label: "Main Tank",
      group: "Tanks",
      accepts: ["Warrior", "Druid", "Paladin"],
    },
    {
      id: "gruul-ot1",
      label: "Off Tank 1 (Hurtful Soak)",
      group: "Tanks",
      accepts: ["Warrior", "Druid", "Paladin"],
      description: "Stay 2nd on threat to soak Hurtful Strike",
    },
    {
      id: "gruul-ot2",
      label: "Off Tank 2 (Hurtful Soak)",
      group: "Tanks",
      accepts: ["Warrior", "Druid", "Paladin"],
      description: "Stay 3rd on threat to soak Hurtful Strike",
    },
    {
      id: "gruul-mt-heal",
      label: "MT Healers",
      group: "Healers",
      multi: true,
      maxPlayers: 4,
      repeatable: true,
    },
    {
      id: "gruul-ot-heal",
      label: "OT Healers",
      group: "Healers",
      multi: true,
      maxPlayers: 3,
      repeatable: true,
    },
    {
      id: "gruul-raid-heal",
      label: "Raid Healers",
      group: "Healers",
      multi: true,
      maxPlayers: 3,
      repeatable: true,
      description: "Heal raid after Shatter",
    },

    // Misdirections
    {
      id: "gruul-md-1",
      label: "{ability:misdirection} Misdirection 1",
      group: "Misdirections",
      multi: true,
      maxPlayers: 2,
      pairLabels: ["Hunter", "Target"],
      description: "Hunter → their MD target on pull",
    },
    {
      id: "gruul-md-2",
      label: "{ability:misdirection} Misdirection 2",
      group: "Misdirections",
      multi: true,
      maxPlayers: 2,
      repeatable: true,
      pairLabels: ["Hunter", "Target"],
      description: "Hunter → their MD target on pull",
    },
  ],
}
