import TagCloudFactory from 'domains/TagCloudFactory'
import TagFactory from 'domains/TagFactory'
import * as types from '../constants/ActionTypes';
import data from 'data/tag.yaml';

const initialState = {
  cloud: TagCloudFactory.create(
    TagFactory.create(data)
  ),
};

export default function skill(state = initialState, action) {
  switch (action.type) {
  default:
    return state
  }
}
