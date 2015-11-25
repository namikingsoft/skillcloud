import Tag from 'domains/Tag'
import {ActionType} from '../constants/ActionConst'
import match from 'match-case'

interface State {
  displayed: Tag
}

interface Action {
  type: ActionType
  displayed?: Tag
}

const initialState = {
  displayed: null,
}

export default function tag(state = initialState, action) {
  return match<ActionType, State>(action.type).
    caseOf(ActionType.DISPLAY_TAG, v => {
      state.displayed = action.displayed
      return state
    }).
    caseOfElse(v => state).
  end()
}
