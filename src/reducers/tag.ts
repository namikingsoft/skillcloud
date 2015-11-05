import TagCloudFactory from 'domains/TagCloudFactory'
import TagFactory from 'domains/TagFactory'
import * as types from '../constants/ActionTypes'
const data = require('data/tag.yaml')

const initialState = {
  cloud: TagCloudFactory.create(
    TagFactory.create(data)
  ),
}

export default function tag(state = initialState, action) {
  switch (action.type) {
  default:
    return state
  }
}
