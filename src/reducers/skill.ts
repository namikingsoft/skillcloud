import Skill from 'domains/Skill'
import * as Types from 'constants/ActionTypes'
import match from 'match-case'

interface State {
  selected: Skill
}

interface Action {
  type: string
  selected?: Skill
}

const initialState = {
  selected: undefined,
}

export default function skill(state: State = initialState, action: Action) {
  return match<string, State>(action.type).
    caseOf(Types.SELECT, v => {
      state.selected = action.selected
      return state
    }).
    caseOfElse(v => state).
  end()
}
