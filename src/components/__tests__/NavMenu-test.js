import React from 'react';
// import ReactDOM from 'react-dom';
import {renderIntoDocument} from 'react-addons-test-utils';
import { expect} from 'chai';
import { NavMenu } from 'components';
import { Provider } from 'react-redux';
import {reduxReactRouter} from 'redux-router';
import createHistory from 'history/lib/createMemoryHistory';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

describe('NavMenu', () => {
  const mockStore = {
    menu: {
      loaded: true,
      active: 'Home',
      last: null,
      items: [
        { Title: 'Home', HasBack: false, Items: [
          { Text: 'Home', Icon: 'home', Target: '/', LinksToSubMenu: false },
          { Text: 'Intellipedia', Icon: 'info_outline', Target: '/intellipedia', LinksToSubMenu: false },
          { Text: 'Publicly Available Information', Icon: 'touch_app', Target: '/pai', LinksToSubMenu: false },
          { Text: 'Biographies', Icon: 'fingerprint', Target: '/biographies', LinksToSubMenu: false },
          { Text: 'Trainer Dashboard', Icon: 'track_changes', Target: '/trainer-dashboard', LinksToSubMenu: false },
          { Text: 'More', Icon: 'perm_data_setting', Target: 'More', LinksToSubMenu: true },
          { Text: 'Global Settings', Icon: 'settings', Target: 'System_Settings', LinksToSubMenu: true },
          { Text: 'Exercise Settings', Icon: 'settings', Target: 'Exercise_Settings', LinksToSubMenu: true },
        ]},
        { Title: 'More', HasBack: true, Items: [
          { Text: 'Language', Icon: 'language', Target: 'Language', LinksToSubMenu: true },
          { Text: 'Sign Out', Icon: 'cancel', Target: 'logout()', LinksToSubMenu: false },
        ]},
        { Title: 'System_Settings', HasBack: true, Items: [
          { Text: 'Users', Icon: 'face', Target: '/cms/users', LinksToSubMenu: false },
          { Text: 'Exercises', Icon: 'settings_input_antenna', Target: '/cms/exercises', LinksToSubMenu: false },
        ]},
        { Title: 'Exercise_Settings', HasBack: true, Items: [
          { Text: 'Users', Icon: 'face', Target: '/cms/exercise-users', LinksToSubMenu: false },
          { Text: 'Parameters', Icon: 'settings_input_antenna', Target: '/cms/parameters', LinksToSubMenu: false },
        ]},
        { Title: 'Language', HasBack: true, Items: []},
      ]
    }
  };

  const store = createStore(reduxReactRouter, null, createHistory, client, mockStore);
  const renderer = renderIntoDocument(
    <Provider store={store} key="provider">
      <NavMenu/>
    </Provider>
  );
  // const dom = ReactDOM.findDOMNode(renderer);

  it('should render correctly', () => {
    return expect(renderer).to.be.ok;
  });
});
