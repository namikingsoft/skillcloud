import {ActionType} from '../constants/ActionConst'
import match from 'match-case'

interface State {
  x: number
  y: number
  opacity: number
}

interface Action {
  type: ActionType
  x: number
  y: number
  opacity: number
}

const initialState = {
  x: 0,
  y: 0,
  opacity: 0,
}

export default function crosshair(state = initialState, action) {
  return match<ActionType, State>(action.type).
    caseOf(ActionType.MOVE_CROSSHAIR, v => {
      state.x = action.x
      state.y = action.y
      return state
    }).
    caseOf(ActionType.OPACITY_CROSSHAIR, v => {
      state.opacity = action.opacity
      return state
    }).
    caseOfElse(v => state).
  end()
}
