import type { EncounterDef } from "../types"

export const alar: EncounterDef = {
  id: "alar",
  name: "Al'ar",
  raid: "tempest-keep",
  raidName: "Tempest Keep",
  description:
    "Phoenix God — 2 phases. P1 platform tanks, kill adds. P2 ground fight with Flame Patches and Ember adds.",
  slots: [
    // P1 Platform tanks
    { id: "alar-p1-tank-1", label: "Platform 1 Tank", group: "P1 — Platforms", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Al'ar on first platform" },
    { id: "alar-p1-tank-2", label: "Platform 2 Tank", group: "P1 — Platforms", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Al'ar on second platform" },
    { id: "alar-p1-add-tank", label: "P1 Add Tank", group: "P1 — Platforms", accepts: ["Warrior", "Druid", "Paladin"], description: "Pick up Phoenix adds at the base" },

    // P2 — Ground fight
    { id: "alar-p2-tank", label: "P2 Main Tank", group: "P2 — Ground", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Al'ar after rebirth" },
    { id: "alar-ember-tank", label: "Ember of Al'ar Tank", group: "P2 — Ground", accepts: ["Warrior", "Druid", "Paladin"], description: "Pick up Embers — kill before they reach Al'ar" },
    { id: "alar-ember-kill", label: "Ember DPS", group: "P2 — Ground", multi: true, description: "Burn Embers before they self-rez Al'ar" },

    // Healers
    { id: "alar-mt-heal", label: "MT Healers", group: "Healers", multi: true },
    { id: "alar-add-heal", label: "Add Tank Healers", group: "Healers", multi: true },
    { id: "alar-raid-heal", label: "Raid Healers", group: "Healers", multi: true, description: "Top raid through Flame Patches & Meteor in P2" },
  ],
}
