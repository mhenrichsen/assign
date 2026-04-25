export type WowClass =
  | "Warrior"
  | "Paladin"
  | "Hunter"
  | "Rogue"
  | "Priest"
  | "Shaman"
  | "Mage"
  | "Warlock"
  | "Druid"

export interface Player {
  id: string
  name: string
  class: WowClass
  spec?: string
  specIcon?: string
}

export interface AssignmentSlot {
  id: string
  label: string
  group: string
  description?: string
  accepts?: WowClass[]
  multi?: boolean
  maxPlayers?: number
  repeatable?: boolean // "+" button to expand maxPlayers
  pairLabels?: [string, string] // for paired slots like MD: ["Hunter", "Target"]
  selectFrom?: WowClass // render as dropdown picking from this class
  exclusiveGroup?: string // players can only be in ONE slot with this group key
}

export interface EncounterDef {
  id: string
  name: string
  raid: string
  raidName: string
  description: string
  slots: AssignmentSlot[]
}

export interface RaidInstance {
  id: string
  name: string
  encounters: EncounterDef[]
}

export type AssignmentMap = Record<string, string[]>

export interface RaidSession {
  id: string
  name: string
  roster: Player[]
  encounters: Record<string, AssignmentMap>
  slotMaxOverrides?: Record<string, Record<string, number>> // encounterId -> slotId -> new maxPlayers
  createdAt: number
}
