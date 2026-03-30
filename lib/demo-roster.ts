import type { Player } from "./types"

// A realistic 25-man TBC raid roster
export const DEMO_ROSTER: Player[] = [
  // Warriors (3) - tanks
  { id: "demo-01", name: "Thunderclap", class: "Warrior" },
  { id: "demo-02", name: "Shieldwall", class: "Warrior" },
  { id: "demo-03", name: "Ironbark", class: "Warrior" },

  // Paladins (3) - tank + healers
  { id: "demo-04", name: "Holylight", class: "Paladin" },
  { id: "demo-05", name: "Divineaura", class: "Paladin" },
  { id: "demo-06", name: "Justicar", class: "Paladin" },

  // Hunters (2) - ranged DPS
  { id: "demo-07", name: "Arrowstorm", class: "Hunter" },
  { id: "demo-08", name: "Deadshot", class: "Hunter" },

  // Rogues (2) - melee DPS
  { id: "demo-09", name: "Shadowstab", class: "Rogue" },
  { id: "demo-10", name: "Backstabber", class: "Rogue" },

  // Priests (3) - healers + shadow
  { id: "demo-11", name: "Prayerful", class: "Priest" },
  { id: "demo-12", name: "Faithhealer", class: "Priest" },
  { id: "demo-13", name: "Spiritbind", class: "Priest" },

  // Shamans (3) - healer + enhance + ele
  { id: "demo-14", name: "Stormtotem", class: "Shaman" },
  { id: "demo-15", name: "Earthcaller", class: "Shaman" },
  { id: "demo-16", name: "Tidalforce", class: "Shaman" },

  // Mages (3) - ranged DPS
  { id: "demo-17", name: "Frostbolt", class: "Mage" },
  { id: "demo-18", name: "Blizzardx", class: "Mage" },
  { id: "demo-19", name: "Pyroblast", class: "Mage" },

  // Warlocks (3) - ranged DPS
  { id: "demo-20", name: "Felflame", class: "Warlock" },
  { id: "demo-21", name: "Darkpact", class: "Warlock" },
  { id: "demo-22", name: "Soulreap", class: "Warlock" },

  // Druids (3) - tank + healer + boomkin
  { id: "demo-23", name: "Moonshift", class: "Druid" },
  { id: "demo-24", name: "Clawstrike", class: "Druid" },
  { id: "demo-25", name: "Lifebloom", class: "Druid" },
]

// Pre-filled assignments for the demo
export const DEMO_ASSIGNMENTS: Record<string, Record<string, string[]>> = {
  general: {}, // Auto-filled by computePrefills based on roster
  maulgar: {
    "maulgar-mt": ["demo-01"], // Thunderclap tanks Maulgar
    "maulgar-ot": ["demo-03"], // Ironbark offtanks
    "maulgar-heal": ["demo-12", "demo-14", "demo-25"], // Faithhealer, Stormtotem, Lifebloom
    "blindeye-tank": ["demo-06"], // Justicar tanks Blindeye
    "blindeye-heal": ["demo-11", "demo-15"], // Prayerful, Earthcaller
    "blindeye-interrupt": ["demo-09", "demo-10"], // Shadowstab, Backstabber
    "olm-tank": ["demo-02"], // Shieldwall tanks Olm
    "olm-heal": ["demo-04", "demo-16"], // Holylight, Tidalforce
    "olm-felhound": ["demo-20", "demo-17"], // Felflame, Frostbolt
    "krosh-tank": ["demo-18"], // Blizzardx mage-tanks Krosh
    "krosh-heal": ["demo-05", "demo-13"], // Divineaura, Spiritbind
    "kiggler-tank": ["demo-07"], // Arrowstorm hunter-tanks Kiggler
    "kiggler-heal": ["demo-23", "demo-24"], // Moonshift, Clawstrike (resto)
  },
  gruul: {
    "gruul-mt": ["demo-01"], // Thunderclap
    "gruul-ot1": ["demo-03"], // Ironbark
    "gruul-mt-heal": ["demo-12", "demo-04", "demo-14", "demo-25"], // Faithhealer, Holylight, Stormtotem, Lifebloom
    "gruul-ot-heal": ["demo-11", "demo-05", "demo-16"], // Prayerful, Divineaura, Tidalforce
    "gruul-raid-heal": ["demo-13", "demo-15", "demo-23"], // Spiritbind, Earthcaller, Moonshift
  },
  magtheridon: {
    "mag-mt": ["demo-01"], // Thunderclap
    "mag-ot": ["demo-03"], // Ironbark
    "mag-mt-heal": ["demo-12", "demo-04", "demo-14", "demo-25"], // Faithhealer, Holylight, Stormtotem, Lifebloom
    "channeler-tank-1": ["demo-02"], // Shieldwall
    "channeler-tank-2": ["demo-06"], // Justicar
    "channeler-tank-3": ["demo-24"], // Clawstrike (bear)
    "channeler-tank-4": ["demo-09"], // Shadowstab (evasion tank)
    "channeler-tank-5": ["demo-10"], // Backstabber (evasion tank)
    "channeler-heal": ["demo-11", "demo-05", "demo-15", "demo-16", "demo-23"], // Prayerful, Divineaura, Earthcaller, Tidalforce, Moonshift
    "cube-1": ["demo-20"], // Felflame
    "cube-2": ["demo-21"], // Darkpact
    "cube-3": ["demo-22"], // Soulreap
    "cube-4": ["demo-08"], // Deadshot
    "cube-5": ["demo-07"], // Arrowstorm
    "interrupt-1": ["demo-09"], // Shadowstab
    "interrupt-2": ["demo-10"], // Backstabber
    "interrupt-3": ["demo-02"], // Shieldwall
    "interrupt-4": ["demo-06"], // Justicar
    "interrupt-5": ["demo-17"], // Frostbolt
    "mag-raid-heal": ["demo-13", "demo-04", "demo-14", "demo-25"], // Spiritbind, Holylight, Stormtotem, Lifebloom
  },
}
