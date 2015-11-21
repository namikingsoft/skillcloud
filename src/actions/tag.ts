import Tag from 'domains/Tag'
import * as Types from 'constants/ActionTypes';

export function display(displayed: Tag) {
  return {type: Types.DISPLAY, displayed};
}
