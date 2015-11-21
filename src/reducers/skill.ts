import Skill from 'domains/Skill'
import * as Types from 'constants/ActionTypes'
import match from 'match-case'

interface State {
  selected: Skill
  displayed: Skill
}

interface Action {
  type: string
  selected?: Skill
  displayed?: Skill
}

const initialState = {
  selected: undefined,
  displayed: undefined,
}

export default function skill(state: State = initialState, action: Action) {
  return match<string, State>(action.type).
    caseOf(Types.SELECT, v => {
      state.selected = action.selected
      return state
    }).
    caseOf(Types.DISPLAY, v => {
      state.displayed = action.displayed
      return state
    }).
    caseOfElse(v => state).
  end()
}
