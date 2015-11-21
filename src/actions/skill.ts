import Skill from 'domains/Skill'
import * as Types from 'constants/ActionTypes';

export function select(selected: Skill) {
  return {type: Types.SELECT, selected};
}

export function display(displayed: Skill) {
  return {type: Types.DISPLAY, displayed};
}
