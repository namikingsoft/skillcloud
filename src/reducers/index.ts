import {combineReducers} from 'redux'
import skill from 'reducers/skill'
import tag from 'reducers/tag'
import background from 'reducers/background'
import crosshair from 'reducers/crosshair'
import zoom from 'reducers/zoom'

const rootReducer = combineReducers({
  skill, tag, background, crosshair, zoom,
});

export default rootReducer;
