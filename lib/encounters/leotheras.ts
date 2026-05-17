import type { EncounterDef } from "../types"

export const leotheras: EncounterDef = {
  id: "leotheras",
  name: "Leotheras the Blind",
  raid: "serpentshrine-cavern",
  raidName: "Serpentshrine Cavern",
  description:
    "Two-phase split — Night Elf phase has Whirlwind & Inner Demons, Demon phase needs warlock tank. Banish adds on pull.",
  slots: [
    // Tanks
    { id: "leo-mt", label: "Night Elf Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Leotheras during humanoid phase" },
    { id: "leo-demon-tank", label: "Demon Tank (Warlock)", group: "Tanks", accepts: ["Warlock"], description: "Warlock tanks Leotheras during demon phase" },
    { id: "leo-add-tank", label: "Spellbinder Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Greyheart Spellbinder adds on pull" },

    // Banishes
    { id: "leo-banish-1", label: "Banish 1", group: "Banish (pull)", accepts: ["Warlock"], description: "Banish a Spellbinder on pull" },
    { id: "leo-banish-2", label: "Banish 2", group: "Banish (pull)", accepts: ["Warlock"], description: "Banish a Spellbinder on pull" },

    // Inner Demons (one per affected player — handled dynamically by raid)
    { id: "leo-demon-killers", label: "Inner Demon Killers", group: "Inner Demons", multi: true, description: "DPS that focus and kill Inner Demons on their assigned target" },

    // Healers
    { id: "leo-mt-heal", label: "MT Healers", group: "Healers", multi: true },
    { id: "leo-demon-heal", label: "Demon Phase Healers", group: "Healers", multi: true, description: "Heal warlock + raid through demon phase" },
    { id: "leo-raid-heal", label: "Raid Healers", group: "Healers", multi: true },
  ],
}
