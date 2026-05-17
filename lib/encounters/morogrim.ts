import type { EncounterDef } from "../types"

export const morogrim: EncounterDef = {
  id: "morogrim",
  name: "Morogrim Tidewalker",
  raid: "serpentshrine-cavern",
  raidName: "Serpentshrine Cavern",
  description:
    "Tank-and-spank with Earthquake AoE and Watery Grave bubbles. Murloc adds spawn at 25% — AoE them down.",
  slots: [
    // Tanks
    { id: "moro-mt", label: "Main Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "moro-add-tank", label: "Murloc Add Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Pick up the wave of Tidewalker Lurkers at 25%" },

    // Bubbles (Watery Grave — 4 fixed spots)
    { id: "moro-bubble-1", label: "{star} Watery Grave 1", group: "Watery Graves", multi: true, description: "Players who break out / heal the bubble at this spot" },
    { id: "moro-bubble-2", label: "{circle} Watery Grave 2", group: "Watery Graves", multi: true, description: "Players who break out / heal the bubble at this spot" },
    { id: "moro-bubble-3", label: "{diamond} Watery Grave 3", group: "Watery Graves", multi: true, description: "Players who break out / heal the bubble at this spot" },
    { id: "moro-bubble-4", label: "{triangle} Watery Grave 4", group: "Watery Graves", multi: true, description: "Players who break out / heal the bubble at this spot" },

    // Add control
    { id: "moro-aoe", label: "AoE on Adds", group: "Add Phase", multi: true, accepts: ["Mage", "Warlock", "Shaman", "Druid", "Hunter"], description: "AoE down the murloc wave at 25%" },

    // Healers
    { id: "moro-mt-heal", label: "MT Healers", group: "Healers", multi: true },
    { id: "moro-raid-heal", label: "Raid Healers", group: "Healers", multi: true, description: "Top raid through Earthquake AoE" },
  ],
}
