import type { EncounterDef } from "../types"

export const lurker: EncounterDef = {
  id: "lurker",
  name: "The Lurker Below",
  raid: "serpentshrine-cavern",
  raidName: "Serpentshrine Cavern",
  description:
    "Pull with fishing pole. Stack on Lurker, swim to platforms during Spout, dodge Geyser, manage Coilfangs.",
  slots: [
    // Tanks
    { id: "lurker-mt", label: "Main Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Lurker — stays at melee, swims back after Spout" },
    { id: "lurker-add-tank-1", label: "Coilfang Guardian Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "lurker-add-tank-2", label: "Coilfang Ambusher Kiter", group: "Tanks", accepts: ["Hunter", "Warlock", "Mage"], description: "Kite the ranged Ambusher adds" },

    // Pull
    { id: "lurker-puller", label: "Fishing Pull", group: "Pull", accepts: ["Warrior", "Hunter", "Mage", "Warlock", "Priest", "Paladin", "Shaman", "Rogue", "Druid"], description: "Use fishing pole at the throne to start the fight" },

    // Healers
    { id: "lurker-mt-heal", label: "MT Healers", group: "Healers", multi: true },
    { id: "lurker-add-heal", label: "Add Healers", group: "Healers", multi: true },
    { id: "lurker-raid-heal", label: "Raid Healers", group: "Healers", multi: true, description: "Top raid after Whirl / Geyser" },
  ],
}
