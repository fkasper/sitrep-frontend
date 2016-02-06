import React from 'react';
import {Route, IndexRoute} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { isLoaded as isPermissionLoaded, load as loadPermissions } from 'redux/modules/permissions';
import {
    App,
    Login,
    LoginSuccess,
    Home,
    ChangePassword,
    NotFound,
    Intellipedia,
    CmsUsersIndex,
    CmsExerciseParameters,
    CmsExerciseUsers,
    CmsExerciseCreate,
    CmsExerciseIndex
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/auth/login');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState()) || !isPermissionLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(() => {
        store.dispatch(loadPermissions()).then(checkAuth);
      });
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <IndexRoute component={Home}/>
        <Route path="/intellipedia" component={Intellipedia}/>
        <Route path="/intellipedia/:subject" component={Intellipedia}/>
        <Route path="/exercise/select" component={LoginSuccess}/>
        <Route path="/cms/exercises/create" component={CmsExerciseCreate}/>
        <Route path="/cms/exercises/maintain/:id" component={CmsExerciseParameters}/>
        <Route path="/cms/exercises" component={CmsExerciseIndex}/>
        <Route path="/cms/users" component={CmsUsersIndex}/>
        <Route path="/cms/parameters" component={CmsExerciseParameters}/>
        <Route path="/cms/exercise-users" component={CmsExerciseUsers}/>
        <Route path="/cms/exercise/:exercise" component={LoginSuccess}/>
        <Route path="/cms/user/:email" component={LoginSuccess}/>
      </Route>

      { /* Routes */ }

      <Route path="/auth/login" component={Login}/>
      <Route path="/auth/change-password" component={ChangePassword}/>


      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
