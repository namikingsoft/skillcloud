import Tag from 'domains/Tag'
import * as Types from '../constants/ActionTypes'

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
  switch (action.type) {
  case Types.SELECT:
    state.selected = action.selected
    return state
  default:
    return state
  }
}
