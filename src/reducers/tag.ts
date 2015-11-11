import Tag from 'domains/Tag'
import * as Types from '../constants/ActionTypes'
import match from 'match-case'

interface State {
  selected: Tag
}

interface Action {
  type: string
  selected?: Tag
}

const initialState = {
  selected: null,
}

export default function tag(state = initialState, action) {
  return match<string, State>(action.type).
    caseOf(Types.SELECT, v => {
      state.selected = action.selected
      return state
    }).
    caseOfElse(v => state).
  end()
}
