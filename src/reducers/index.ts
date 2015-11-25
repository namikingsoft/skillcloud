import {combineReducers} from 'redux'
import skill from 'reducers/skill'
import tag from 'reducers/tag'
import background from 'reducers/background'
import crosshair from 'reducers/crosshair'

const rootReducer = combineReducers({
  skill, tag, background, crosshair,
});

export default rootReducer;
