import type { EncounterDef, RaidInstance } from "../types"
import { alar } from "./alar"
import { generalAssignments } from "./general"
import { gruul } from "./gruul"
import { hydross } from "./hydross"
import { kaelthas } from "./kaelthas"
import { karathress } from "./karathress"
import { leotheras } from "./leotheras"
import { lurker } from "./lurker"
import { magtheridon } from "./magtheridon"
import { maulgar } from "./maulgar"
import { morogrim } from "./morogrim"
import { solarian } from "./solarian"
import { vashj } from "./vashj"
import { voidReaver } from "./voidreaver"

export const ALL_ENCOUNTERS: EncounterDef[] = [
  generalAssignments,
  maulgar,
  gruul,
  magtheridon,
  hydross,
  lurker,
  leotheras,
  karathress,
  morogrim,
  vashj,
  voidReaver,
  alar,
  solarian,
  kaelthas,
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
  {
    id: "serpentshrine-cavern",
    name: "Serpentshrine Cavern",
    encounters: [
      generalAssignments,
      hydross,
      lurker,
      leotheras,
      karathress,
      morogrim,
      vashj,
    ],
  },
  {
    id: "tempest-keep",
    name: "Tempest Keep",
    encounters: [generalAssignments, voidReaver, alar, solarian, kaelthas],
  },
]
