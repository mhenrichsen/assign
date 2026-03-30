import type { AssignmentMap, Player, RaidSession } from "./types"

export type RaidAction =
  | { type: "SET_SESSION"; session: RaidSession }
  | { type: "SET_NAME"; name: string }
  | { type: "ADD_PLAYER"; player: Player }
  | { type: "REMOVE_PLAYER"; playerId: string }
  | { type: "IMPORT_PLAYERS"; players: Player[] }
  | {
      type: "ASSIGN_PLAYER"
      encounterId: string
      slotId: string
      playerId: string
    }
  | {
      type: "UNASSIGN_PLAYER"
      encounterId: string
      slotId: string
      playerId: string
    }
  | { type: "CLEAR_ENCOUNTER"; encounterId: string }
  | {
      type: "EXPAND_SLOT"
      encounterId: string
      slotId: string
      currentMax: number
    }

function removePlayerFromEncounter(
  assignments: AssignmentMap,
  playerId: string
): AssignmentMap {
  const result: AssignmentMap = {}
  for (const [slotId, playerIds] of Object.entries(assignments)) {
    result[slotId] = playerIds.filter((id) => id !== playerId)
  }
  return result
}

export function raidReducer(
  state: RaidSession,
  action: RaidAction
): RaidSession {
  switch (action.type) {
    case "SET_SESSION":
      return action.session

    case "SET_NAME":
      return { ...state, name: action.name }

    case "ADD_PLAYER":
      return { ...state, roster: [...state.roster, action.player] }

    case "REMOVE_PLAYER": {
      const encounters: Record<string, AssignmentMap> = {}
      for (const [encId, assignments] of Object.entries(state.encounters)) {
        encounters[encId] = removePlayerFromEncounter(
          assignments,
          action.playerId
        )
      }
      return {
        ...state,
        roster: state.roster.filter((p) => p.id !== action.playerId),
        encounters,
      }
    }

    case "IMPORT_PLAYERS":
      return { ...state, roster: [...state.roster, ...action.players] }

    case "ASSIGN_PLAYER": {
      const { encounterId, slotId, playerId } = action
      const encounterAssignments = state.encounters[encounterId] ?? {}
      const slotPlayers = encounterAssignments[slotId] ?? []

      if (slotPlayers.includes(playerId)) return state

      return {
        ...state,
        encounters: {
          ...state.encounters,
          [encounterId]: {
            ...encounterAssignments,
            [slotId]: [...slotPlayers, playerId],
          },
        },
      }
    }

    case "UNASSIGN_PLAYER": {
      const { encounterId, slotId, playerId } = action
      const encounterAssignments = state.encounters[encounterId] ?? {}
      const slotPlayers = encounterAssignments[slotId] ?? []

      return {
        ...state,
        encounters: {
          ...state.encounters,
          [encounterId]: {
            ...encounterAssignments,
            [slotId]: slotPlayers.filter((id) => id !== playerId),
          },
        },
      }
    }

    case "CLEAR_ENCOUNTER":
      return {
        ...state,
        encounters: {
          ...state.encounters,
          [action.encounterId]: {},
        },
      }

    case "EXPAND_SLOT": {
      const { encounterId, slotId, currentMax } = action
      const encOverrides = state.slotMaxOverrides?.[encounterId] ?? {}
      return {
        ...state,
        slotMaxOverrides: {
          ...state.slotMaxOverrides,
          [encounterId]: {
            ...encOverrides,
            [slotId]: currentMax + 1,
          },
        },
      }
    }

    default:
      return state
  }
}
