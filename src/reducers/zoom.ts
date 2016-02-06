import {ActionType} from '../constants/ActionConst'
import match from 'match-case'

interface State {
  percent: number
}

interface Action {
  type: ActionType
  percent: number
}

const initialState = {
  percent: 100,
}

export default function zoom(state = initialState, action) {
  return match<ActionType, State>(action.type).
    caseOf(ActionType.CHANGE_ZOOM, v => {
      state.percent = action.percent
      return state
    }).
    caseOfElse(v => state).
  end()
}
