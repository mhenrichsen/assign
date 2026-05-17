import type { EncounterDef } from "../types"

export const karathress: EncounterDef = {
  id: "karathress",
  name: "Fathom-Lord Karathress",
  raid: "serpentshrine-cavern",
  raidName: "Serpentshrine Cavern",
  description:
    "4-target fight — kill order Tidalvess → Sharkkis → Caribdis → Karathress. Karathress gets stronger as each adviser dies.",
  slots: [
    // Karathress himself
    { id: "kara-mt", label: "Karathress Tank", group: "Fathom-Lord Karathress", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Karathress, kept far from the advisers" },
    { id: "kara-heal", label: "Karathress Healers", group: "Fathom-Lord Karathress", multi: true },

    // Tidalvess (Shaman — kill 1st, deny Spitfire Totem)
    { id: "tidalvess-tank", label: "Tidalvess Tank", group: "Tidalvess (Shaman — kill 1st)", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "tidalvess-heal", label: "Tidalvess Healers", group: "Tidalvess (Shaman — kill 1st)", multi: true },
    { id: "tidalvess-purge", label: "Totem Killers / Purge", group: "Tidalvess (Shaman — kill 1st)", multi: true, description: "Kill Spitfire/Poison Cleansing totems, purge buffs" },

    // Sharkkis (Hunter — kill 2nd)
    { id: "sharkkis-tank", label: "Sharkkis Tank", group: "Sharkkis (Hunter — kill 2nd)", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "sharkkis-pet-tank", label: "Pet (Leviathan) Tank", group: "Sharkkis (Hunter — kill 2nd)", accepts: ["Warrior", "Druid", "Paladin", "Warlock"], description: "Off-tank the pet — Warlock can chain-banish if elemental variant" },
    { id: "sharkkis-heal", label: "Sharkkis Healers", group: "Sharkkis (Hunter — kill 2nd)", multi: true },
    { id: "sharkkis-tranq", label: "Tranquilizing Shot", group: "Sharkkis (Hunter — kill 2nd)", multi: true, accepts: ["Hunter"], description: "Tranq The Beast Within / Frenzy buff off Sharkkis" },

    // Caribdis (Priest — kill 3rd)
    { id: "caribdis-tank", label: "Caribdis Tank", group: "Caribdis (Priest — kill 3rd)", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "caribdis-heal", label: "Caribdis Healers", group: "Caribdis (Priest — kill 3rd)", multi: true },
    { id: "caribdis-interrupt", label: "Ranged Healing Wave Interrupts", group: "Caribdis (Priest — kill 3rd)", multi: true, accepts: ["Shaman", "Mage", "Priest"], description: "Ranged interrupts only — Tidal Surge knocks melee away. Earth Shock / Counterspell / Silence" },
  ],
}
