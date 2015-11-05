import Tag from 'domains/Tag'
import * as Types from 'constants/ActionTypes';

export function select(selected: Tag) {
  return {type: Types.SELECT, selected};
}
