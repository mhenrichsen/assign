import type { EncounterDef } from "../types"

export const solarian: EncounterDef = {
  id: "solarian",
  name: "High Astromancer Solarian",
  raid: "tempest-keep",
  raidName: "Tempest Keep",
  description:
    "3-phase fight. P1: tank Solarian + adds. P2: spread for portals (3 Astromancers + 9 priests). P3: void form burn.",
  slots: [
    // Tanks
    { id: "sol-mt", label: "Main Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "sol-astromancer-tank-1", label: "Astromancer Tank 1", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Solarium Agent that spawns from a portal in P2" },
    { id: "sol-astromancer-tank-2", label: "Astromancer Tank 2", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "sol-astromancer-tank-3", label: "Astromancer Tank 3", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"] },

    // P2 — Portal spread spots
    { id: "sol-portal-spread", label: "Spread Spots", group: "P2 — Portals", multi: true, description: "Pre-assigned spread positions so portals are safe distances apart" },

    // Adds — Solarium Priests need to be AoE'd / interrupted
    { id: "sol-priest-aoe", label: "Priest AoE / Kill", group: "P2 — Adds", multi: true, accepts: ["Mage", "Warlock", "Shaman", "Druid", "Hunter"], description: "AoE the 9 Solarium Priests when they spawn" },
    { id: "sol-priest-interrupt", label: "Interrupt Priest Heals", group: "P2 — Adds", multi: true, description: "Interrupt Solarium Priest Greater Heal casts" },

    // Healers
    { id: "sol-mt-heal", label: "MT Healers", group: "Healers", multi: true },
    { id: "sol-add-heal", label: "Add Tank Healers", group: "Healers", multi: true },
    { id: "sol-raid-heal", label: "Raid Healers", group: "Healers", multi: true, description: "Top raid through Wrath of the Astromancer & Void Bolt" },

    // Dispels
    { id: "sol-dispel-bomb", label: "Dispel Wrath of the Astromancer", group: "Dispels", multi: true, accepts: ["Priest", "Paladin", "Shaman", "Druid", "Mage"], description: "Dispel the bomb debuff so it explodes early — keep target away from raid" },
  ],
}
