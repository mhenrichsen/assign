import type { EncounterDef } from "../types"

export const kaelthas: EncounterDef = {
  id: "kaelthas",
  name: "Kael'thas Sunstrider",
  raid: "tempest-keep",
  raidName: "Tempest Keep",
  description:
    "5-phase fight. P1: 4 advisors. P2: 7 weapons — equip Devastate/Cosmic Infuser/etc. P3: 4 advisors return. P4: Kael solo, Mind Control & Pyroblast. P5: gravity lapse + burn.",
  slots: [
    // P1 — Advisors (4)
    { id: "kt-thaladred-tank", label: "Thaladred Aggro Holder", group: "P1 — Advisors", description: "Thaladred fixates randomly — kite him" },
    { id: "kt-sanguinar-tank", label: "Sanguinar Tank", group: "P1 — Advisors", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Lord Sanguinar (Fear Howl)" },
    { id: "kt-capernian-tank", label: "Capernian Interrupt/Engage", group: "P1 — Advisors", multi: true, accepts: ["Warrior", "Rogue", "Shaman", "Mage"], description: "Interrupt and kill Capernian — Fireball + Conflagration" },
    { id: "kt-telonicus-tank", label: "Telonicus Tank", group: "P1 — Advisors", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Telonicus — interrupt Remote Toy" },
    { id: "kt-advisor-heal", label: "Advisor Healers", group: "P1 — Advisors", multi: true },

    // P2 — Weapons (kill order 1-7)
    { id: "kt-weapon-tank", label: "Weapon Tank", group: "P2 — Weapons", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank the Cosmic Infuser / Devastate / etc. — main aggro on staff" },
    { id: "kt-dagger-handler-1", label: "{ability:misdirection} Dagger Handler 1", group: "P2 — Weapons", description: "Pick up Bladefist / Bloodsong dagger — they apply DoT/parry buff" },
    { id: "kt-dagger-handler-2", label: "{ability:misdirection} Dagger Handler 2", group: "P2 — Weapons", description: "Pick up Bladefist / Bloodsong dagger — they apply DoT/parry buff" },
    { id: "kt-staff-tank", label: "Cosmic Infuser Tank", group: "P2 — Weapons", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank the healing staff" },
    { id: "kt-bow-handler", label: "Netherstrand Longbow Handler", group: "P2 — Weapons", accepts: ["Hunter"], description: "Hunter takes the bow for the arrow attack" },
    { id: "kt-shield-handler", label: "Phaseshift Bulwark Handler", group: "P2 — Weapons", description: "Use shield for damage absorb" },
    { id: "kt-weapon-heal", label: "Weapon Phase Healers", group: "P2 — Weapons", multi: true },

    // P3 — Advisors return (same assignments as P1 typically)
    { id: "kt-p3-resurrect-priority", label: "Mass Dispel / Cleanse Priorities", group: "P3 — Advisors Return", multi: true, accepts: ["Priest", "Paladin", "Shaman", "Druid", "Mage"], description: "Dispel Capernian Fireball / Mind Control etc." },

    // P4 — Kael himself
    { id: "kt-mt", label: "Kael'thas Tank", group: "P4 — Kael'thas", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Kael — Mind Control breaks aggro, prepare for swaps" },
    { id: "kt-mc-break", label: "Mind Control Breakers", group: "P4 — Kael'thas", multi: true, accepts: ["Priest", "Paladin", "Shaman", "Druid", "Mage"], description: "Dispel/Mass Dispel Mind Control on raid" },
    { id: "kt-pyro-interrupt", label: "Pyroblast Interrupts", group: "P4 — Kael'thas", multi: true, accepts: ["Warrior", "Rogue", "Shaman", "Mage"], description: "Interrupt Kael's Pyroblast cast" },

    // P5 — Gravity Lapse
    { id: "kt-p5-air-killer", label: "Nether Vapor Killers", group: "P5 — Gravity Lapse", multi: true, description: "DPS that kill the Nether Vapors while floating" },

    // Healers
    { id: "kt-mt-heal", label: "MT Healers", group: "Healers", multi: true },
    { id: "kt-raid-heal", label: "Raid Healers", group: "Healers", multi: true, description: "Top raid through Gravity Lapse / Pyroblast / Arcane Disruption" },
  ],
}
