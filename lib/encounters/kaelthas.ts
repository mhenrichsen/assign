import type { EncounterDef } from "../types"

export const kaelthas: EncounterDef = {
  id: "kaelthas",
  name: "Kael'thas Sunstrider",
  raid: "tempest-keep",
  raidName: "Tempest Keep",
  description:
    "5-phase fight. P1: 4 advisors. P2: 7 legendary weapons — pick up and use against Kael. P3: 4 advisors return. P4: Kael solo with Mind Control, Pyroblast, Phoenixes. P5: gravity lapse + burn.",
  slots: [
    // P1 — Advisors (4)
    { id: "kt-thaladred-kite", label: "Thaladred Kiter", group: "P1 — Advisors", description: "Thaladred fixates a random target (Gaze) — kite him, can't be tanked normally" },
    { id: "kt-sanguinar-tank", label: "Sanguinar Tank", group: "P1 — Advisors", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Lord Sanguinar (Fear Howl)" },
    { id: "kt-capernian-engage", label: "Capernian DPS / Interrupt", group: "P1 — Advisors", multi: true, accepts: ["Warrior", "Rogue", "Shaman", "Mage"], description: "Engage Capernian at range and interrupt Fireball / Conflagration" },
    { id: "kt-telonicus-tank", label: "Telonicus Tank", group: "P1 — Advisors", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Telonicus — interrupt Remote Toy / dispel Bomb on raid" },
    { id: "kt-advisor-heal", label: "Advisor Healers", group: "P1 — Advisors", multi: true },

    // P2 — Legendary Weapons (7 unique items)
    { id: "kt-devastation-tank", label: "Devastation Tank (2H axe)", group: "P2 — Legendary Weapons", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Devastation away from raid — it Whirlwinds" },
    { id: "kt-cosmic-infuser", label: "Cosmic Infuser Wielder (healer mace)", group: "P2 — Legendary Weapons", accepts: ["Priest", "Paladin", "Druid", "Shaman"], description: "Healer picks up Cosmic Infuser after kill — heals grant 50% Fire/Shadow reduction" },
    { id: "kt-staff-disintegration", label: "Staff of Disintegration Wielder", group: "P2 — Legendary Weapons", accepts: ["Mage", "Warlock", "Priest", "Druid", "Shaman", "Paladin"], description: "Caster wields the staff — its field grants stun/silence immunity" },
    { id: "kt-bow-handler", label: "Netherstrand Longbow Wielder", group: "P2 — Legendary Weapons", accepts: ["Hunter"], description: "Hunter picks up the bow — face away from raid (Multi-Shot)" },
    { id: "kt-shield-handler", label: "Phaseshift Bulwark Wielder", group: "P2 — Legendary Weapons", accepts: ["Warrior", "Paladin"], description: "Tank picks up shield — 100k absorb + fear/snare immunity, saved for Pyroblast in P4/P5" },
    { id: "kt-warp-slicer", label: "Warp Slicer Wielder (sword)", group: "P2 — Legendary Weapons", accepts: ["Warrior", "Rogue", "Paladin", "Druid", "Hunter", "Shaman"], description: "Melee DPS picks up Warp Slicer" },
    { id: "kt-infinity-blade", label: "Infinity Blade Wielder (sword)", group: "P2 — Legendary Weapons", accepts: ["Warrior", "Rogue", "Paladin", "Druid", "Shaman", "Hunter"], description: "Melee DPS picks up Infinity Blade — attacks break Kael's P4 Mind Control instantly" },
    { id: "kt-weapon-heal", label: "Weapon Phase Healers", group: "P2 — Legendary Weapons", multi: true },

    // P3 — Advisors return as ghosts
    { id: "kt-p3-dispel-priority", label: "Dispel Priorities (P3 returning advisors)", group: "P3 — Advisors Return", multi: true, accepts: ["Priest", "Paladin", "Shaman", "Druid", "Mage"], description: "Dispel Telonicus Bomb / Capernian Fireball debuffs while advisors revive" },

    // P4 — Kael himself
    { id: "kt-mt", label: "Kael'thas Tank", group: "P4 — Kael'thas", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Kael — Pyroblast eats shields, holds threat through Mind Control swaps" },
    { id: "kt-mc-breakers", label: "MC Breakers (Infinity Blade / DPS)", group: "P4 — Kael'thas", multi: true, description: "Damage MC'd players to break the MC (Infinity Blade breaks instantly on hit). Mass Dispel does NOT remove Kael MC" },
    { id: "kt-pyro-interrupt", label: "Pyroblast Interrupts", group: "P4 — Kael'thas", multi: true, accepts: ["Warrior", "Rogue", "Shaman", "Mage"], description: "Interrupt Kael's Pyroblast cast" },
    { id: "kt-phoenix-kill", label: "Phoenix Kill", group: "P4 — Kael'thas", multi: true, accepts: ["Hunter", "Mage", "Warlock", "Shaman", "Druid", "Priest"], description: "Burn Phoenixes before they egg + rebirth — handle egg with cleave/AoE" },

    // P5 — Gravity Lapse
    { id: "kt-p5-spread", label: "Gravity Lapse Spread Positions", group: "P5 — Gravity Lapse", multi: true, description: "Pre-assigned floating spread spots — avoid Nether Vapor clouds (not killable)" },

    // Healers
    { id: "kt-mt-heal", label: "MT Healers", group: "Healers", multi: true },
    { id: "kt-raid-heal", label: "Raid Healers", group: "Healers", multi: true, description: "Top raid through Gravity Lapse / Pyroblast / Arcane Disruption" },
  ],
}
