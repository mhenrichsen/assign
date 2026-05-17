import type { EncounterDef } from "../types"

export const leotheras: EncounterDef = {
  id: "leotheras",
  name: "Leotheras the Blind",
  raid: "serpentshrine-cavern",
  raidName: "Serpentshrine Cavern",
  description:
    "Three Greyheart Spellbinders are killed pre-pull. Two-phase split — Night Elf phase has Whirlwind & Inner Demons (self-killed), Demon phase needs a warlock tank.",
  slots: [
    // Tanks
    { id: "leo-mt", label: "Night Elf Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Leotheras during humanoid phase" },
    { id: "leo-demon-tank", label: "Demon Tank (Warlock)", group: "Tanks", accepts: ["Warlock"], description: "Warlock tanks Leotheras during demon phase" },

    // Pre-pull Spellbinders (3 adds)
    { id: "leo-spellbinder-tank-1", label: "Spellbinder Tank 1", group: "Pre-pull Spellbinders (kill first)", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "leo-spellbinder-tank-2", label: "Spellbinder Tank 2", group: "Pre-pull Spellbinders (kill first)", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "leo-spellbinder-tank-3", label: "Spellbinder Tank 3", group: "Pre-pull Spellbinders (kill first)", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "leo-spellbinder-interrupt", label: "Mind Blast Interrupts", group: "Pre-pull Spellbinders (kill first)", multi: true, accepts: ["Warrior", "Rogue", "Shaman", "Mage"] },

    // Healers
    { id: "leo-mt-heal", label: "MT Healers", group: "Healers", multi: true },
    { id: "leo-demon-heal", label: "Demon Phase Healers", group: "Healers", multi: true, description: "Heal warlock + raid through demon phase" },
    { id: "leo-raid-heal", label: "Raid Healers", group: "Healers", multi: true },
  ],
}
