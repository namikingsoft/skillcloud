import * as types from '../constants/actionTypes';

export function select(node) {
  return {type: types.SELECT, node};
}
