import { combineReducers } from 'redux';
import skill from './skill';
import langs from './langs';

const rootReducer = combineReducers({
  skill, langs
});

export default rootReducer;
