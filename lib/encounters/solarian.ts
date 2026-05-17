import type { EncounterDef } from "../types"

export const solarian: EncounterDef = {
  id: "solarian",
  name: "High Astromancer Solarian",
  raid: "tempest-keep",
  raidName: "Tempest Keep",
  description:
    "3-phase fight. P1: tank Solarian, spread for Wrath of the Astromancer. P2: she vanishes — 15 Solarium Agents (3 portals × 5) and 2 Solarium Priests spawn. P3: void form burn.",
  slots: [
    // Tanks (1 tank does it — others soak Wrath)
    { id: "sol-mt", label: "Main Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Solarian + AoE-tank the 15 Agents in P2 (Prot Pala consecration preferred)" },
    { id: "sol-wrath-soakers", label: "Wrath Soakers", group: "Tanks", multi: true, accepts: ["Warrior", "Druid", "Paladin"], description: "Off-tanks soak Wrath of the Astromancer hits — arcane-resist gear helps" },

    // P2 — Spread positions
    { id: "sol-portal-spread", label: "Spread Spots", group: "P2 — Portals", multi: true, description: "Pre-assigned spread positions so portals open at safe distances" },

    // P2 — Priest kill priority
    { id: "sol-priest-kill", label: "Solarium Priest Kill (priority)", group: "P2 — Adds", multi: true, accepts: ["Mage", "Warlock", "Hunter", "Rogue", "Shaman", "Druid", "Priest", "Warrior", "Paladin"], description: "Burn the 2 Solarium Priests immediately — they heal Solarian/Agents" },
    { id: "sol-priest-interrupt", label: "Interrupt Greater Heal", group: "P2 — Adds", multi: true, accepts: ["Warrior", "Rogue", "Shaman", "Mage"], description: "Interrupt Solarium Priest Greater Heal casts" },
    { id: "sol-agent-aoe", label: "Agent AoE", group: "P2 — Adds", multi: true, accepts: ["Mage", "Warlock", "Shaman", "Druid", "Hunter"], description: "AoE down the 15 Solarium Agents after Priests die" },

    // Healers
    { id: "sol-mt-heal", label: "MT Healers", group: "Healers", multi: true },
    { id: "sol-raid-heal", label: "Raid Healers", group: "Healers", multi: true, description: "Top raid through Wrath of the Astromancer & Void Bolt" },
  ],
}
