import Skill from 'domains/Skill'
import Tag from 'domains/Tag'
import {ActionType} from 'constants/ActionConst';

export function selectSkill(selected: Skill) {
  return {type: ActionType.SELECT_SKILL, selected}
}

export function displaySkill(displayed: Skill) {
  return {type: ActionType.DISPLAY_SKILL, displayed}
}

export function displayTag(displayed: Tag) {
  return {type: ActionType.DISPLAY_TAG, displayed}
}

export function flashBackground(timeout: number = 0) {
  return {type: ActionType.FLASH_BACKGROUND, timeout}
}

export function moveCrossHair(x: number, y: number) {
  return {type: ActionType.MOVE_CROSSHAIR, x, y}
}

export function opacityCrossHair(opacity: number) {
  return {type: ActionType.OPACITY_CROSSHAIR, opacity}
}
