import * as types from '../constants/actionTypes';
import data from 'data';

const initialState = {
  data,
  comment: '初期化中',
  selected: null,
};

export default function skill(state = initialState, action) {
  switch (action.type) {
  case types.SELECT:
    if (state.selected == action.row) {
      state.selected = data;
    } else {
      state.selected = action.row;
    }
    state.comment = state.selected.comment;
    return state;
  default:
    return state;
  }
}
