import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import {reducer as form} from 'redux-form';
import info from './info';
import likes from './likes';
import intellipedia from './intellipedia';
import exercises from './exercises';
import passwd from './password';
import permissions from './permissions';
import menu from './menu';
import users from './users';

export default combineReducers({
  router: routerStateReducer,
  auth,
  permissions,
  intellipedia,
  form,
  menu,
  info,
  likes,
  exercises,
  passwd,
  users
});
