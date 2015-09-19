import { TEST } from '../constants/actionTypes';

const initialState = {
  text: 'Use Redux',
  count: 0,
};

function todos(state = initialState, action) {
  switch (action.type) {
  case TEST:
    state.count++;
    state.text = action.text;
    console.log(state);
    return state;

  default:
    return state;
  }
}

export default todos;
