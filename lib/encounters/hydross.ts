import type { EncounterDef } from "../types"

export const hydross: EncounterDef = {
  id: "hydross",
  name: "Hydross the Unstable",
  raid: "serpentshrine-cavern",
  raidName: "Serpentshrine Cavern",
  description:
    "Tank swap across frost/nature thresholds. Pure Spawns (frost) and Tainted Spawns (nature) wave in at each transition.",
  slots: [
    // Hydross tanks (swap at thresholds)
    { id: "hydross-frost-tank", label: "Frost Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Hydross in frost aura — high nature resist gear" },
    { id: "hydross-nature-tank", label: "Nature Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Hydross in nature aura — high frost resist gear" },
    { id: "hydross-pure-tank", label: "Pure Spawn Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Pick up the 4 Pure (frost) Spawns at nature→frost transition — frost-resist gear" },
    { id: "hydross-tainted-tank", label: "Tainted Spawn Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Pick up the 4 Tainted (nature) Spawns at frost→nature transition — nature-resist gear" },

    // Healers
    { id: "hydross-mt-heal", label: "MT Healers", group: "Healers", multi: true, description: "Heal the active tank — swap focus on threshold cross" },
    { id: "hydross-add-heal", label: "Add Tank Healers", group: "Healers", multi: true },
    { id: "hydross-raid-heal", label: "Raid Healers", group: "Healers", multi: true },

    // Cleansing
    { id: "hydross-cleanse-disease", label: "Cleanse Vile Sludge", group: "Dispels", multi: true, accepts: ["Priest", "Paladin", "Shaman"], description: "Cleanse Vile Sludge disease during nature phase (nature DoT + 50% heal reduction)" },
  ],
}
