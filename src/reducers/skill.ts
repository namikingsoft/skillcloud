import Skill from 'domains/Skill'
import * as SkillConst from 'constants/SkillConst'
import {ActionType} from 'constants/ActionConst'
import match from 'match-case'

interface State {
  selected: Skill
  displayed: Skill
}

interface Action {
  type: ActionType
  selected?: Skill
  displayed?: Skill
}

const initialState = {
  selected: SkillConst.initialSkill,
  displayed: undefined,
}

export default function skill(state: State = initialState, action: Action) {
  return match<ActionType, State>(action.type).
    caseOf(ActionType.SELECT_SKILL, v => {
      state.selected = action.selected
      return state
    }).
    caseOf(ActionType.DISPLAY_SKILL, v => {
      state.displayed = action.displayed
      return state
    }).
    caseOfElse(v => state).
  end()
}
