import type { EncounterDef } from "../types"

export const voidReaver: EncounterDef = {
  id: "voidreaver",
  name: "Void Reaver",
  raid: "tempest-keep",
  raidName: "Tempest Keep",
  description:
    "Tank-and-spank with Pounding (frontal ranged AoE) and random Arcane Orbs. Void Reaver is taunt-immune — rotate 3 tanks on Knock Away threat resets. Spread ranged 15+yd apart.",
  slots: [
    // Tanks (taunt-immune — 3-tank rotation)
    { id: "vr-mt", label: "Main Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Primary threat on Void Reaver" },
    { id: "vr-ot-1", label: "Off Tank 1", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Secondary threat — picks up after MT Knock Away (no taunt — rebuild via threat)" },
    { id: "vr-ot-2", label: "Off Tank 2", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Tertiary threat — picks up after OT1 Knock Away" },

    // Healers
    { id: "vr-mt-heal", label: "MT Healers", group: "Healers", multi: true },
    { id: "vr-raid-heal", label: "Raid Healers", group: "Healers", multi: true, description: "Top ranged through Pounding & Arcane Orbs" },
  ],
}
