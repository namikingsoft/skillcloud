import Skill from 'domains/Skill'
import * as SkillConst from 'constants/SkillConst'
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
  selected: SkillConst.initialSkill,
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
