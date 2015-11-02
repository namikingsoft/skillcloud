import * as types from 'constants/actionTypes'
import data from 'data/skill.yaml'
import SkillFactory from 'domains/SkillFactory'
import SkillCloudFactory from 'domains/SkillCloudFactory'

const initialState = {
  cloud: SkillCloudFactory.create(
    SkillFactory.create(data)
  ),
  comment: '初期化中',
  selected: null,
}

export default function skill(state = initialState, action) {
  switch (action.type) {
  case types.SELECT:
    if (!action.node) {
      state.selected = null
      state.comment = '初期化中'
    } else if (state.selected == action.node) {
      state.selected = state.cloud.nodes[0]
      state.comment = state.selected.comment
    } else {
      state.selected = action.node
      state.comment = state.selected.comment
    }
    return state
  default:
    return state
  }
}
