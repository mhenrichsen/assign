import type { EncounterDef } from "../types"

export const hydross: EncounterDef = {
  id: "hydross",
  name: "Hydross the Unstable",
  raid: "serpentshrine-cavern",
  raidName: "Serpentshrine Cavern",
  description:
    "Tank swap across frost/nature thresholds. Decurse during nature phase, decurse during frost phase, cleanse adds.",
  slots: [
    // Hydross tanks (swap at thresholds)
    { id: "hydross-frost-tank", label: "Frost Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Hydross in frost aura — high nature resist gear" },
    { id: "hydross-nature-tank", label: "Nature Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Hydross in nature aura — high frost resist gear" },
    { id: "hydross-add-tank", label: "Add Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Pick up Tainted/Pure Spawns at threshold cross" },

    // Healers
    { id: "hydross-mt-heal", label: "MT Healers", group: "Healers", multi: true, description: "Heal the active tank — swap focus on threshold cross" },
    { id: "hydross-add-heal", label: "Add Tank Healers", group: "Healers", multi: true },
    { id: "hydross-raid-heal", label: "Raid Healers", group: "Healers", multi: true },

    // Cleansing
    { id: "hydross-decurse", label: "Decurse — Curse of the Elements", group: "Dispels", multi: true, accepts: ["Mage", "Druid", "Shaman"], description: "Decurse during nature phase" },
    { id: "hydross-cleanse-poison", label: "Cleanse Poison", group: "Dispels", multi: true, accepts: ["Druid", "Paladin", "Shaman"], description: "Cleanse Water Tomb-style poison from adds during frost phase" },
  ],
}
