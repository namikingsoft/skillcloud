import * as types from '../constants/actionTypes';

export function test(text) {
  return { type: types.TEST, text };
}
