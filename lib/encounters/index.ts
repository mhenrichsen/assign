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
