import * as types from '../constants/actionTypes';

export function select(row) {
  return {type: types.SELECT, row};
}
