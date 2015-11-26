import {ActionType} from '../constants/ActionConst'
import match from 'match-case'

interface State {
  x: number
  y: number
  timeout: number
  seqMove: number
  seqFlash: number
}

interface Action {
  type: ActionType
  x: number
  y: number
  timeout: number
}

const initialState = {
  x: 0,
  y: 0,
  timeout: 0,
  seqMove: 0,
  seqFlash: 0,
}

export default function background(state = initialState, action) {
  return match<ActionType, State>(action.type).
    caseOf(ActionType.MOVE_BACKGROUND, v => {
      state.x = action.x
      state.y = action.y
      state.seqMove = state.seqMove + 1
      return state
    }).
    caseOf(ActionType.FLASH_BACKGROUND, v => {
      state.timeout = action.timeout
      state.seqFlash = state.seqFlash + 1
      return state
    }).
    caseOfElse(v => state).
  end()
}
