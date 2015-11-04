import * as types from '../constants/ActionTypes';
import data from 'data/tag.yaml';

const initialState = {data};

export default function skill(state = initialState, action) {
  switch (action.type) {
  default:
    return state;
  }
}
