import type { EncounterDef } from "../types"

export const voidReaver: EncounterDef = {
  id: "voidreaver",
  name: "Void Reaver",
  raid: "tempest-keep",
  raidName: "Tempest Keep",
  description:
    "Tank-and-spank with Pounding (frontal ranged AoE) and Arcane Orbs. Spread ranged, stack melee on back.",
  slots: [
    // Tanks
    { id: "vr-mt", label: "Main Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "vr-ot", label: "Off Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Stays 2nd on threat — taunt swap on Knock Away" },

    // Healers
    { id: "vr-mt-heal", label: "MT Healers", group: "Healers", multi: true },
    { id: "vr-raid-heal", label: "Raid Healers", group: "Healers", multi: true, description: "Top ranged through Pounding & Arcane Orbs" },

    // Decurses
    { id: "vr-decurse", label: "Decursers", group: "Dispels", multi: true, accepts: ["Mage", "Druid", "Shaman"] },
  ],
}
