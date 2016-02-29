import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
// import multireducer from 'multireducer';

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
import groups from './groups';
import biographies from './biographies';
import notifications from './notifications';
import uploads from './uploads';
import newsstories from './newsstories';
import contact from './contact';
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
  users,
  groups,
  biographies,
  newsstories,
  notifications,
  uploads,
  contact
  // specifics: multireducer({
  //   biographies
  // })
});
