import {combineReducers} from 'redux'
import skill from 'reducers/skill'
import tag from 'reducers/tag'
import background from 'reducers/background'

const rootReducer = combineReducers({
  skill, tag, background,
});

export default rootReducer;
