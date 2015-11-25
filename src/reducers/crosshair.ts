import {ActionType} from '../constants/ActionConst'
import match from 'match-case'

interface State {
  x: number
  y: number
  opacity: number
  timeout: number
}

interface Action {
  type: ActionType
  x: number
  y: number
  opacity: number
  timeout: number
}

const initialState = {
  x: 0,
  y: 0,
  opacity: 0,
  timeout: 0,
}

export default function crosshair(state = initialState, action) {
  return match<ActionType, State>(action.type).
    caseOf(ActionType.MOVE_CROSSHAIR, v => {
      state.x = action.x
      state.y = action.y
      state.timeout = action.timeout
      return state
    }).
    caseOf(ActionType.OPACITY_CROSSHAIR, v => {
      state.opacity = action.opacity
      state.timeout = action.timeout
      return state
    }).
    caseOfElse(v => state).
  end()
}
