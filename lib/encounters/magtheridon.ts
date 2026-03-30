import type { EncounterDef } from "../types"

export const magtheridon: EncounterDef = {
  id: "magtheridon",
  name: "Magtheridon",
  raid: "magtheridons-lair",
  raidName: "Magtheridon's Lair",
  description:
    "Kill 5 channelers, then tank Magtheridon. Click cubes to banish during Blast Nova.",
  slots: [
    // Magtheridon
    {
      id: "mag-mt",
      label: "Main Tank",
      group: "Magtheridon",
      accepts: ["Warrior", "Druid", "Paladin"],
    },
    {
      id: "mag-ot",
      label: "Off Tank",
      group: "Magtheridon",
      accepts: ["Warrior", "Druid", "Paladin"],
    },
    {
      id: "mag-mt-heal",
      label: "MT Healers",
      group: "Magtheridon",
      multi: true,
      maxPlayers: 4,
    },

    // Channeler Tanks (matching cube marks)
    {
      id: "channeler-tank-1",
      label: "{star} Channeler Tank",
      group: "Channeler Tanks",
      accepts: ["Warrior", "Druid", "Paladin"],
    },
    {
      id: "channeler-tank-2",
      label: "{circle} Channeler Tank",
      group: "Channeler Tanks",
      accepts: ["Warrior", "Druid", "Paladin"],
    },
    {
      id: "channeler-tank-3",
      label: "{diamond} Channeler Tank",
      group: "Channeler Tanks",
      accepts: ["Warrior", "Druid", "Paladin"],
    },
    {
      id: "channeler-tank-4",
      label: "{triangle} Channeler Tank",
      group: "Channeler Tanks",
      accepts: ["Warrior", "Druid", "Paladin"],
    },
    {
      id: "channeler-tank-5",
      label: "{skull} Channeler Tank",
      group: "Channeler Tanks",
      accepts: ["Warrior", "Druid", "Paladin"],
    },
    {
      id: "channeler-heal",
      label: "Channeler Healers",
      group: "Channeler Tanks",
      multi: true,
      maxPlayers: 5,
      repeatable: true,
    },

    // Cube Clickers (using raid target icons)
    {
      id: "cube-1",
      label: "{star} Star",
      group: "Cube Clickers",
      description: "Click during Blast Nova to banish Magtheridon",
    },
    {
      id: "cube-2",
      label: "{circle} Circle",
      group: "Cube Clickers",
      description: "Click during Blast Nova to banish Magtheridon",
    },
    {
      id: "cube-3",
      label: "{diamond} Diamond",
      group: "Cube Clickers",
      description: "Click during Blast Nova to banish Magtheridon",
    },
    {
      id: "cube-4",
      label: "{triangle} Triangle",
      group: "Cube Clickers",
      description: "Click during Blast Nova to banish Magtheridon",
    },
    {
      id: "cube-5",
      label: "{skull} Skull",
      group: "Cube Clickers",
      description: "Click during Blast Nova to banish Magtheridon",
    },

    // Interrupts
    {
      id: "channeler-interrupt",
      label: "Shadow Bolt Volley Interrupts",
      group: "Interrupts",
      multi: true,
      maxPlayers: 5,
      repeatable: true,
      description: "Interrupt Shadow Bolt Volley on channelers",
    },

    // Raid
    {
      id: "mag-raid-heal",
      label: "Raid Healers",
      group: "Raid",
      multi: true,
      maxPlayers: 4,
      repeatable: true,
    },

  ],
}
