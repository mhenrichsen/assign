import type { EncounterDef } from "../types"

export const vashj: EncounterDef = {
  id: "vashj",
  name: "Lady Vashj",
  raid: "serpentshrine-cavern",
  raidName: "Serpentshrine Cavern",
  description:
    "3-phase fight. P1 tank Vashj. P2 shield down — kill striders, run Tainted Cores between elementals, kill Tainted Elementals. P3 burn + Toxic/Coilfang/Spore management.",
  slots: [
    // Phase 1 / Phase 3 — Vashj herself
    { id: "vashj-mt", label: "Main Tank", group: "Vashj", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Vashj in P1 and P3" },
    { id: "vashj-mt-heal", label: "MT Healers", group: "Vashj", multi: true },

    // Phase 2 — Striders (kited)
    { id: "vashj-strider-tank-1", label: "Strider Tank 1", group: "P2 — Striders", accepts: ["Hunter", "Warlock", "Mage", "Warrior", "Druid", "Paladin"], description: "Kite Coilfang Strider — they Forked Lightning" },
    { id: "vashj-strider-tank-2", label: "Strider Tank 2", group: "P2 — Striders", accepts: ["Hunter", "Warlock", "Mage", "Warrior", "Druid", "Paladin"] },
    { id: "vashj-strider-heal", label: "Strider Healers", group: "P2 — Striders", multi: true },

    // Phase 2 — Tainted Elementals
    { id: "vashj-elem-tank", label: "Tainted Elemental Tank", group: "P2 — Tainted Elementals", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank the Tainted Elementals as they spawn" },
    { id: "vashj-elem-heal", label: "Tainted Elemental Healers", group: "P2 — Tainted Elementals", multi: true },

    // Phase 2 — Tainted Core runners
    { id: "vashj-core-runner-1", label: "Core Runner 1", group: "P2 — Tainted Core Runners", description: "Carry the Tainted Core from a Tainted Elemental to a shield generator" },
    { id: "vashj-core-runner-2", label: "Core Runner 2", group: "P2 — Tainted Core Runners", description: "Carry the Tainted Core from a Tainted Elemental to a shield generator" },
    { id: "vashj-core-runner-3", label: "Core Runner 3", group: "P2 — Tainted Core Runners", description: "Carry the Tainted Core from a Tainted Elemental to a shield generator" },
    { id: "vashj-core-runner-4", label: "Core Runner 4", group: "P2 — Tainted Core Runners", description: "Carry the Tainted Core from a Tainted Elemental to a shield generator" },

    // Phase 2 — Naga adds
    { id: "vashj-naga-tank", label: "Enchanted Elemental Sweeper", group: "P2 — Adds", accepts: ["Warrior", "Druid", "Paladin", "Mage"], description: "Sweep up Enchanted Elementals — they buff Vashj if they reach her" },

    // Phase 3 — Tainted/Spore management
    { id: "vashj-spore-kill", label: "Spore Bat Kill", group: "P3 — Adds", multi: true, accepts: ["Hunter", "Mage", "Warlock", "Shaman", "Druid", "Priest"], description: "Kill Toxic Spore Bats in P3" },
    { id: "vashj-coilfang-tank", label: "Coilfang Elite Tank", group: "P3 — Adds", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank elite naga adds in P3" },

    // Healers
    { id: "vashj-raid-heal", label: "Raid Healers", group: "Healers", multi: true, description: "Top raid through Shock Blast / Toxic Spore Bats" },
  ],
}
