import Tag from 'domains/Tag'
import * as Types from '../constants/ActionTypes'
import match from 'match-case'

interface State {
  displayed: Tag
}

interface Action {
  type: string
  displayed?: Tag
}

const initialState = {
  displayed: null,
}

export default function tag(state = initialState, action) {
  return match<string, State>(action.type).
    caseOf(Types.DISPLAY, v => {
      state.displayed = action.displayed
      return state
    }).
    caseOfElse(v => state).
  end()
}
