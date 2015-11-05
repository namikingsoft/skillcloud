import {combineReducers} from 'redux'
import skill from 'reducers/skill'
import tag from 'reducers/tag'

const rootReducer = combineReducers({
  skill, tag
});

export default rootReducer;
