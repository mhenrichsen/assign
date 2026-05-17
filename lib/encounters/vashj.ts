import type { EncounterDef } from "../types"

export const vashj: EncounterDef = {
  id: "vashj",
  name: "Lady Vashj",
  raid: "serpentshrine-cavern",
  raidName: "Serpentshrine Cavern",
  description:
    "3-phase fight. P1 tank Vashj. P2 shield down — kill Striders, run Tainted Cores to shield generators, kill Tainted Elementals, tank Coilfang Elites. P3 burn + Toxic Spore Bat management.",
  slots: [
    // Phase 1 / Phase 3 — Vashj herself
    { id: "vashj-mt", label: "Main Tank", group: "Vashj", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Vashj in P1 and P3" },
    { id: "vashj-mt-heal", label: "MT Healers", group: "Vashj", multi: true },

    // Phase 2 — Striders (kited)
    { id: "vashj-strider-tank", label: "Strider Tanks/Kiters", group: "P2 — Striders", multi: true, accepts: ["Hunter", "Warlock", "Mage", "Warrior", "Druid", "Paladin"], description: "Kite Coilfang Striders — Forked Lightning + they persist, so usually 2-3 up at once" },
    { id: "vashj-strider-heal", label: "Strider Healers", group: "P2 — Striders", multi: true },

    // Phase 2 — Tainted Elementals
    { id: "vashj-elem-tank", label: "Tainted Elemental Tank", group: "P2 — Tainted Elementals", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank the Tainted Elementals as they spawn" },
    { id: "vashj-elem-heal", label: "Tainted Elemental Healers", group: "P2 — Tainted Elementals", multi: true },

    // Phase 2 — Tainted Core relay (passer + catcher)
    { id: "vashj-core-passer", label: "Core Passer", group: "P2 — Tainted Core Relay", description: "Stands at Tainted Elemental, grabs the Core and tosses it toward a Generator Catcher" },
    { id: "vashj-core-catcher", label: "Core Catcher (Backup)", group: "P2 — Tainted Core Relay", description: "Intermediate runner / catcher between passer and the shield generator" },
    { id: "vashj-gen-nw", label: "Generator — NW", group: "P2 — Tainted Core Relay", description: "Stands on the NW shield generator, uses Core to deactivate it" },
    { id: "vashj-gen-ne", label: "Generator — NE", group: "P2 — Tainted Core Relay", description: "Stands on the NE shield generator, uses Core to deactivate it" },
    { id: "vashj-gen-sw", label: "Generator — SW", group: "P2 — Tainted Core Relay", description: "Stands on the SW shield generator, uses Core to deactivate it" },
    { id: "vashj-gen-se", label: "Generator — SE", group: "P2 — Tainted Core Relay", description: "Stands on the SE shield generator, uses Core to deactivate it" },

    // Phase 2 — Naga adds
    { id: "vashj-naga-sweep", label: "Enchanted Elemental Sweeper", group: "P2 — Adds", multi: true, accepts: ["Warrior", "Druid", "Paladin", "Mage"], description: "Sweep up Enchanted Elementals — they buff Vashj if they reach her" },
    { id: "vashj-coilfang-tank", label: "Coilfang Elite Tank", group: "P2 — Adds", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank elite naga adds that spawn from sides in P2" },

    // Phase 3
    { id: "vashj-spore-kill", label: "Spore Bat Kill", group: "P3 — Adds", multi: true, accepts: ["Hunter", "Mage", "Warlock", "Shaman", "Druid", "Priest"], description: "Kill Toxic Spore Bats in P3 before clouds blanket the room" },

    // Healers
    { id: "vashj-raid-heal", label: "Raid Healers", group: "Healers", multi: true, description: "Top raid through Shock Blast / Toxic Spore Bats" },
  ],
}
