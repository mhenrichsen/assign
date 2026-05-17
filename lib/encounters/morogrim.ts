import type { EncounterDef } from "../types"

export const morogrim: EncounterDef = {
  id: "morogrim",
  name: "Morogrim Tidewalker",
  raid: "serpentshrine-cavern",
  raidName: "Serpentshrine Cavern",
  description:
    "Tank-and-spank with Earthquake AoE and Watery Grave on 4 random players. At 25% the wave swaps to Watery Globules that fixate random players, plus a Murloc add wave from both side entrances.",
  slots: [
    // Tanks
    { id: "moro-mt", label: "Main Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "moro-add-tank-left", label: "Murloc Tank — Left Entrance", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Pick up Tidewalker Lurkers from the left side spawn" },
    { id: "moro-add-tank-right", label: "Murloc Tank — Right Entrance", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Pick up Tidewalker Lurkers from the right side spawn" },

    // Watery Grave (random 4 — assign healers)
    { id: "moro-bubble-heal", label: "Watery Grave Healers", group: "Watery Graves", multi: true, description: "Heal the 4 random players bubbled at the center waterfall — they cannot be dispelled, only healed through" },

    // Watery Globules (P2 / 25%)
    { id: "moro-globule-kite", label: "Globule Slows / Kills", group: "P2 — Watery Globules", multi: true, accepts: ["Mage", "Shaman", "Druid", "Hunter", "Rogue", "Warlock"], description: "Slow & kill fixated Watery Globules before they reach their target" },

    // Add control
    { id: "moro-aoe", label: "AoE on Murlocs", group: "Add Phase", multi: true, accepts: ["Mage", "Warlock", "Shaman", "Druid", "Hunter"], description: "AoE down the murloc waves" },

    // Healers
    { id: "moro-mt-heal", label: "MT Healers", group: "Healers", multi: true },
    { id: "moro-raid-heal", label: "Raid Healers", group: "Healers", multi: true, description: "Top raid through Earthquake AoE" },
  ],
}
