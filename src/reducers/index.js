import { combineReducers } from 'redux';
import skill from './skill';
import langs from './langs';
import tag from './tag';

const rootReducer = combineReducers({
  skill, langs, tag
});

export default rootReducer;
