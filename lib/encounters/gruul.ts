import type { EncounterDef } from "../types"

export const gruul: EncounterDef = {
  id: "gruul",
  name: "Gruul the Dragonkiller",
  raid: "gruuls-lair",
  raidName: "Gruul's Lair",
  description: "Single boss — Hurtful Strike hits highest-threat melee",
  slots: [
    { id: "gruul-mt", label: "Main Tank", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "gruul-ot1", label: "Off Tank (Hurtful Soak)", group: "Tanks", accepts: ["Warrior", "Druid", "Paladin"], description: "Stay 2nd on threat to soak Hurtful Strike" },
    { id: "gruul-mt-heal", label: "MT Healers", group: "Healers", multi: true },
    { id: "gruul-ot-heal", label: "OT Healers", group: "Healers", multi: true },
    { id: "gruul-raid-heal", label: "Raid Healers", group: "Healers", multi: true, description: "Heal raid after Shatter" },
  ],
}
