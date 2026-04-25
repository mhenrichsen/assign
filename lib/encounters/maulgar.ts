import type { EncounterDef } from "../types"

export const maulgar: EncounterDef = {
  id: "maulgar",
  name: "High King Maulgar",
  raid: "gruuls-lair",
  raidName: "Gruul's Lair",
  description: "Council fight — 5 ogre lords engaged simultaneously",
  slots: [
    { id: "maulgar-mt", label: "Main Tank", group: "High King Maulgar", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "maulgar-ot", label: "Off Tank", group: "High King Maulgar", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "maulgar-heal", label: "Healers", group: "High King Maulgar", multi: true },

    { id: "blindeye-tank", label: "Tank", group: "Blindeye the Seer", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "blindeye-heal", label: "Healers", group: "Blindeye the Seer", multi: true },
    { id: "blindeye-interrupt", label: "Interrupts", group: "Blindeye the Seer", multi: true, description: "Interrupt Prayer of Healing" },

    { id: "olm-tank", label: "Tank", group: "Olm the Summoner", accepts: ["Warrior", "Druid", "Paladin"] },
    { id: "olm-heal", label: "Healers", group: "Olm the Summoner", multi: true },
    { id: "olm-felhound", label: "Felhound Management", group: "Olm the Summoner", multi: true, accepts: ["Warlock", "Mage"], description: "Enslave or banish felhounds" },

    { id: "krosh-tank", label: "Mage Tank", group: "Krosh Firehand", accepts: ["Mage"], description: "Spellsteal Krosh's shield" },
    { id: "krosh-heal", label: "Healers", group: "Krosh Firehand", multi: true },

    { id: "kiggler-tank", label: "Ranged Tank", group: "Kiggler the Crazed", accepts: ["Hunter", "Warlock", "Druid"], description: "Ranged tank — Hunter, Warlock, or Boomkin" },
    { id: "kiggler-heal", label: "Healers", group: "Kiggler the Crazed", multi: true },
  ],
}
