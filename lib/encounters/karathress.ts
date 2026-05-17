import type { EncounterDef } from "../types"

export const karathress: EncounterDef = {
  id: "karathress",
  name: "Fathom-Lord Karathress",
  raid: "serpentshrine-cavern",
  raidName: "Serpentshrine Cavern",
  description:
    "4-target fight — kill order Sharkkis → Tidalvess → Caribdis → Karathress. Karathress gets stronger as each adviser dies.",
  slots: [
    // Karathress himself
    { id: "kara-mt", label: "Karathress Tank", group: "Fathom-Lord Karathress", accepts: ["Warrior", "Druid", "Paladin"], description: "Tank Karathress, kept far from the advisers" },
    { id: "kara-heal", label: "Karathress Healers", group: "Fathom-Lord Karathress", multi: true },

    // Sharkkis (Hunter — kill 1st)
    { id: "sharkkis-tank", label: "Sharkkis Tank", group: "Sharkkis (Hunter — kill 1st)", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "sharkkis-pet-tank", label: "Pet (Leviathan) Tank", group: "Sharkkis (Hunter — kill 1st)", accepts: ["Warrior", "Druid", "Paladin", "Hunter"], description: "Off-tank the pet — banish/kite if possible" },
    { id: "sharkkis-heal", label: "Sharkkis Healers", group: "Sharkkis (Hunter — kill 1st)", multi: true },
    { id: "sharkkis-tranq", label: "Tranquilizing Shot", group: "Sharkkis (Hunter — kill 1st)", multi: true, accepts: ["Hunter"], description: "Tranq the Frenzy buff off Sharkkis" },

    // Tidalvess (Shaman — kill 2nd)
    { id: "tidalvess-tank", label: "Tidalvess Tank", group: "Tidalvess (Shaman — kill 2nd)", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "tidalvess-heal", label: "Tidalvess Healers", group: "Tidalvess (Shaman — kill 2nd)", multi: true },
    { id: "tidalvess-purge", label: "Totem Killers / Purge", group: "Tidalvess (Shaman — kill 2nd)", multi: true, description: "Kill spitfire/poison totems, purge Bloodlust" },

    // Caribdis (Priest — kill 3rd)
    { id: "caribdis-tank", label: "Caribdis Tank", group: "Caribdis (Priest — kill 3rd)", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "caribdis-heal", label: "Caribdis Healers", group: "Caribdis (Priest — kill 3rd)", multi: true },
    { id: "caribdis-interrupt", label: "Interrupt Healing Wave", group: "Caribdis (Priest — kill 3rd)", multi: true, description: "Interrupt Caribdis's Healing Wave on the advisers" },
    { id: "caribdis-dispel", label: "Dispel Cyclone", group: "Caribdis (Priest — kill 3rd)", multi: true, accepts: ["Paladin", "Priest", "Shaman", "Druid", "Mage"], description: "Dispel Cyclone from raid members" },
  ],
}
