import * as types from '../constants/actionTypes'
import data from 'data/skill.yaml'
import Test from 'domains/test'

const initialState = {
  data,
  comment: '初期化中',
  selected: null,
}

export default function skill(state = initialState, action) {
  switch (action.type) {
  case types.SELECT:
    console.log(new Test)
    if (!action.row) {
      state.selected = null
      state.comment = '初期化中'
    } else if (state.selected == action.row) {
      state.selected = data
      state.comment = state.selected.comment
    } else {
      state.selected = action.row
      state.comment = state.selected.comment
    }
    return state
  default:
    return state
  }
}
