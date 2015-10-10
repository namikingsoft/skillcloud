import * as types from '../constants/actionTypes';
import data from 'data/langs.yaml';

const initialState = {
  data,
};

export default function skill(state = initialState, action) {
  switch (action.type) {
  default:
    return state;
  }
}
