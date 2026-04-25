// TBC raid utility abilities with actual WoW icon names
// Icons served from: https://wow.zamimg.com/images/wow/icons/medium/{icon}.jpg

export interface Ability {
  name: string
  icon: string // WoW icon filename (without extension)
}

export const ABILITIES: Record<string, Ability> = {
  // Warlock Curses
  "curse-of-elements": {
    name: "Curse of the Elements",
    icon: "spell_shadow_chilltouch",
  },
  "curse-of-recklessness": {
    name: "Curse of Recklessness",
    icon: "spell_shadow_unholystrength",
  },
  "curse-of-tongues": {
    name: "Curse of Tongues",
    icon: "spell_shadow_curseoftounges",
  },
  "curse-of-doom": {
    name: "Curse of Doom",
    icon: "spell_shadow_auraofdarkness",
  },

  // Warrior Debuffs
  thunderclap: {
    name: "Thunder Clap",
    icon: "spell_nature_thunderclap",
  },
  "sunder-armor": {
    name: "Sunder Armor",
    icon: "ability_warrior_sunder",
  },
  "demo-shout": {
    name: "Demoralizing Shout",
    icon: "ability_warrior_warcry",
  },

  // Rogue
  "expose-armor": {
    name: "Expose Armor",
    icon: "ability_warrior_riposte",
  },

  // Hunter
  "hunters-mark": {
    name: "Hunter's Mark",
    icon: "ability_hunter_snipershot",
  },
  misdirection: {
    name: "Misdirection",
    icon: "ability_hunter_misdirection",
  },

  // Druid
  "faerie-fire": {
    name: "Faerie Fire",
    icon: "spell_nature_faeriefire",
  },
  innervate: {
    name: "Innervate",
    icon: "spell_nature_lightning",
  },
  "battle-res": {
    name: "Rebirth",
    icon: "spell_nature_reincarnation",
  },

  // Paladin
  "judgement-of-wisdom": {
    name: "Judgement of Wisdom",
    icon: "spell_holy_righteousnessaura",
  },
  "judgement-of-light": {
    name: "Judgement of Light",
    icon: "spell_holy_healingaura",
  },
  "judgement-of-crusader": {
    name: "Judgement of the Crusader",
    icon: "spell_holy_holysmite",
  },

  // Mage
  "improved-scorch": {
    name: "Fire Vulnerability",
    icon: "spell_fire_soulburn",
  },
  "winters-chill": {
    name: "Winter's Chill",
    icon: "spell_frost_chillingblast",
  },

  // Shaman
  bloodlust: {
    name: "Bloodlust / Heroism",
    icon: "spell_nature_bloodlust",
  },

  // Priest
  "shadow-weaving": {
    name: "Shadow Weaving",
    icon: "spell_shadow_blackplague",
  },
}

const ICON_BASE = "https://wow.zamimg.com/images/wow/icons"

export function getAbilityIconUrl(
  abilityKey: string,
  size: "small" | "medium" | "large" = "medium"
): string | null {
  const ability = ABILITIES[abilityKey]
  if (!ability) return null
  return `${ICON_BASE}/${size}/${ability.icon}.jpg`
}
