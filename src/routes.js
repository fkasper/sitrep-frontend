import React from 'react';
import {Route, IndexRoute} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { isLoaded as isSettingsLoaded, load as loadSettings } from 'redux/modules/permissions';
import {
    App,
    Login,
    LoginSuccess,
    Home,
    ChangePassword,
    NotFound,
    Intellipedia,
    IntellipediaWrapper,
    CmsUsersIndex,
    CmsExerciseParameters,
    CmsExerciseUsers,
    SignUp,
    PAI,
    BiographiesIndex,
    BiographiesShow,
    BiographiesNew,
    NewsSiteIndex,
    NewsSiteWrapper,
    NewsSiteShow,
    NewsSiteSettings,
    NewsSiteArchive,
    NewsSiteContact,
    NewsSiteAbout,
    IntellipediaShow,
    IndexDashboard,
    IntellipediaNew,
    ExerciseSupportText
  } from 'containers';

export default (store) => {
  const loadSettingsIntoStore = (nextState, replaceState, cb) => {
    if (!isSettingsLoaded(store.getState())) {
      store.dispatch(loadSettings()).then(() => {
        cb();
      });
    }
  };
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // replaceState(null, `/auth/login`);
        // oops, not logged in, so can't be here!
        // if (window) {
        replaceState(null, `/auth/login`);
        // } else {
        //   replaceState(null, `/auth/login`);
        // }
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App} onEnter={loadSettingsIntoStore}>
      { /* Home (main) route */ }

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <IndexRoute component={Home}/>
        <Route path="/pai" component={PAI}/>
        <Route path="/biographies" component={BiographiesIndex}/>
        <Route path="/biographies/new" component={BiographiesNew}/>
        <Route path="/biographies/:id" component={BiographiesShow}/>
        <Route path="/cms/exercise/maintain" component={CmsExerciseParameters}/>
        <Route path="/cms/users" component={CmsUsersIndex}/>
        <Route path="/cms/user-management" component={CmsExerciseUsers}/>
        <Route path="/cms/user/:email" component={LoginSuccess}/>

        <Route path="/intellipedia" component={IntellipediaWrapper}>
          <Route path=":storyId" component={IntellipediaShow} />
          <Route path="new" component={IntellipediaNew} />
          <IndexRoute component={Intellipedia}/>
        </Route>

        <Route path="/news-site/:siteId/" component={NewsSiteWrapper}>
          { /* News Sites (configured in config) */ }
          <Route path="archive(/:categoryName)" component={NewsSiteArchive}/>
          <Route path="search" component={NewsSiteIndex}/>
          <Route path="settings" component={NewsSiteSettings}/>
          <Route path="contact" component={NewsSiteContact}/>
          <Route path="about" component={NewsSiteAbout} />
          <Route path=":storyId" component={NewsSiteShow}/>
          <IndexRoute component={NewsSiteIndex}/>
        </Route>


        <Route path="/cms/user/:email" component={LoginSuccess}/>
        <Route path="/trainer-dashboard" component={IndexDashboard} />
        <Route path="/exercise-support" component={ExerciseSupportText} />
      </Route>

      { /* Routes */ }
      <Route path="/auth/sign-up/:groupId" component={SignUp}/>

      <Route path="/auth/login" component={Login}/>
      <Route path="/auth/change-password" component={ChangePassword}/>


      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
