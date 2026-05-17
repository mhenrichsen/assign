import type { EncounterDef } from "../types"

export const alar: EncounterDef = {
  id: "alar",
  name: "Al'ar",
  raid: "tempest-keep",
  raidName: "Tempest Keep",
  description:
    "Phoenix God — 2 phases. P1: tanks on platforms, ranged DPS kills Phoenix adds before they reach Al'ar. P2: ground fight with Melt Armor tank swaps, Flame Patches and Ember adds.",
  slots: [
    // P1 — Platform tanks
    { id: "alar-p1-tank-1", label: "Platform 1 Tank", group: "P1 — Platforms", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Al'ar on platform 1" },
    { id: "alar-p1-tank-2", label: "Platform 2 Tank", group: "P1 — Platforms", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Al'ar on platform 2" },
    { id: "alar-p1-phoenix-kill", label: "Phoenix Adds Kill", group: "P1 — Platforms", multi: true, accepts: ["Hunter", "Mage", "Warlock", "Shaman", "Druid", "Priest"], description: "Ranged DPS that burn the Phoenix adds before they reach Al'ar (heals him)" },

    // P2 — Ground fight (Melt Armor tank swap)
    { id: "alar-p2-tank-1", label: "P2 Main Tank", group: "P2 — Ground", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Al'ar after rebirth — swap on Melt Armor" },
    { id: "alar-p2-tank-2", label: "P2 Off Tank", group: "P2 — Ground", accepts: ["Warrior", "Druid", "Paladin"], description: "Taunt swap when Melt Armor (80% armor reduction) lands on MT" },
    { id: "alar-ember-tank", label: "Ember of Al'ar Tank", group: "P2 — Ground", accepts: ["Warrior", "Druid", "Paladin"], description: "Pick up Embers — kill before they reach Al'ar's corpse" },
    { id: "alar-ember-kill", label: "Ember DPS", group: "P2 — Ground", multi: true, description: "Burn Embers before they self-rez Al'ar" },

    // Healers
    { id: "alar-mt-heal", label: "MT Healers", group: "Healers", multi: true },
    { id: "alar-add-heal", label: "Add Tank Healers", group: "Healers", multi: true },
    { id: "alar-raid-heal", label: "Raid Healers", group: "Healers", multi: true, description: "Top raid through Flame Patches & Meteor in P2" },
  ],
}
