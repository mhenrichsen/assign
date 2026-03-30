import type { EncounterDef, RaidInstance } from "../types"
import { generalAssignments } from "./general"
import { gruul } from "./gruul"
import { magtheridon } from "./magtheridon"
import { maulgar } from "./maulgar"

export const ALL_ENCOUNTERS: EncounterDef[] = [
  generalAssignments,
  maulgar,
  gruul,
  magtheridon,
]

export const RAID_INSTANCES: RaidInstance[] = [
  {
    id: "gruuls-lair",
    name: "Gruul's Lair",
    encounters: [generalAssignments, maulgar, gruul],
  },
  {
    id: "magtheridons-lair",
    name: "Magtheridon's Lair",
    encounters: [generalAssignments, magtheridon],
  },
]

export function getEncountersByRaid(raidId: string): EncounterDef[] {
  return (
    RAID_INSTANCES.find((r) => r.id === raidId)?.encounters ?? []
  )
}

export function getEncounter(id: string): EncounterDef | undefined {
  return ALL_ENCOUNTERS.find((e) => e.id === id)
}

export { generalAssignments, maulgar, gruul, magtheridon }
