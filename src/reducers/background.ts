import {ActionType} from '../constants/ActionConst'
import match from 'match-case'

interface State {
  timeout: number
  seq: number
}

interface Action {
  type: ActionType
  timeout: number
}

const initialState = {
  timeout: 0,
  seq: 0,
}

export default function background(state = initialState, action) {
  return match<ActionType, State>(action.type).
    caseOf(ActionType.FLASH_BACKGROUND, v => {
      state.timeout = action.timeout
      state.seq = state.seq + 1
      return state
    }).
    caseOfElse(v => state).
  end()
}
