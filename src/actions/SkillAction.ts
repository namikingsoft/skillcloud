import SkillNode from 'domains/SkillNode'
import * as Types from 'constants/ActionTypes';

export function select(node: SkillNode) {
  return {type: Types.SELECT, node};
}
