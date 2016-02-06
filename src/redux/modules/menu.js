const LOAD = 'sitrep-auth/menu/LOAD';
const LOAD_SUCCESS = 'sitrep-auth/menu/LOAD_SUCCESS';
const LOAD_FAIL = 'sitrep-auth/menu/LOAD_FAIL';
const ACTIVATE = 'sitrep-auth/menu/ACTIVATE';
const ACTIVATE_SUCCESS = 'sitrep-auth/menu/ACTIVATE_SUCCESS';
const ACTIVATE_FAIL = 'sitrep-auth/menu/ACTIVATE_FAIL';

const initialState = {
  loaded: false,
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
};

export default function menu(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case ACTIVATE:
      return {
        ...state,
        loading: true
      };
    case ACTIVATE_SUCCESS:
      return {
        ...state,
        last: state.active,
        loading: false,
        loaded: true,
        active: action.result
      };
    case ACTIVATE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.menu && globalState.menu.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/exercise-menu')
  };
}

export function activateMenu(item) {
  return {
    types: [ACTIVATE, ACTIVATE_SUCCESS, ACTIVATE_FAIL],
    promise: () => {
      return new Promise((ok) => {
        ok(item);
      });
    }
  };
}
