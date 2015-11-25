import Skill from 'domains/Skill'
import Tag from 'domains/Tag'
import * as Types from 'constants/ActionTypes';

export function selectSkill(selected: Skill) {
  return {type: Types.SELECT_SKILL, selected};
}

export function displaySkill(displayed: Skill) {
  return {type: Types.DISPLAY_SKILL, displayed};
}

export function displayTag(displayed: Tag) {
  return {type: Types.DISPLAY_TAG, displayed};
}
