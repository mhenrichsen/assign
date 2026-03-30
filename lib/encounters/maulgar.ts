import type { EncounterDef } from "../types"

export const maulgar: EncounterDef = {
  id: "maulgar",
  name: "High King Maulgar",
  raid: "gruuls-lair",
  raidName: "Gruul's Lair",
  description: "Council fight — 5 ogre lords engaged simultaneously",
  slots: [
    // High King Maulgar
    {
      id: "maulgar-mt",
      label: "Main Tank",
      group: "High King Maulgar",
      accepts: ["Warrior", "Druid", "Paladin"],
    },
    {
      id: "maulgar-ot",
      label: "Off Tank",
      group: "High King Maulgar",
      accepts: ["Warrior", "Druid", "Paladin"],
    },
    {
      id: "maulgar-heal",
      label: "Healers",
      group: "High King Maulgar",
      multi: true,
      maxPlayers: 3,
      repeatable: true,
    },

    // Blindeye the Seer
    {
      id: "blindeye-tank",
      label: "Tank",
      group: "Blindeye the Seer",
      accepts: ["Warrior", "Druid", "Paladin"],
    },
    {
      id: "blindeye-heal",
      label: "Healers",
      group: "Blindeye the Seer",
      multi: true,
      maxPlayers: 2,
      repeatable: true,
    },
    {
      id: "blindeye-interrupt",
      label: "Interrupts",
      group: "Blindeye the Seer",
      multi: true,
      maxPlayers: 2,
      repeatable: true,
      description: "Interrupt Prayer of Healing",
    },

    // Olm the Summoner
    {
      id: "olm-tank",
      label: "Tank",
      group: "Olm the Summoner",
      accepts: ["Warrior", "Druid", "Paladin"],
    },
    {
      id: "olm-heal",
      label: "Healers",
      group: "Olm the Summoner",
      multi: true,
      maxPlayers: 2,
      repeatable: true,
    },
    {
      id: "olm-felhound",
      label: "Felhound Management",
      group: "Olm the Summoner",
      multi: true,
      maxPlayers: 2,
      accepts: ["Warlock", "Mage"],
      description: "Enslave or banish felhounds",
    },

    // Krosh Firehand
    {
      id: "krosh-tank",
      label: "Mage Tank",
      group: "Krosh Firehand",
      accepts: ["Mage"],
      description: "Spellsteal Krosh's shield",
    },
    {
      id: "krosh-heal",
      label: "Healers",
      group: "Krosh Firehand",
      multi: true,
      maxPlayers: 2,
      repeatable: true,
    },

    // Kiggler the Crazed
    {
      id: "kiggler-tank",
      label: "Ranged Tank",
      group: "Kiggler the Crazed",
      accepts: ["Hunter", "Warlock"],
      description: "Ranged tank — usually a Hunter",
    },
    {
      id: "kiggler-heal",
      label: "Healers",
      group: "Kiggler the Crazed",
      multi: true,
      maxPlayers: 2,
      repeatable: true,
    },

  ],
}
