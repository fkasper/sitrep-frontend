const LOAD = 'sitrep-auth/menu/LOAD';
const LOAD_SUCCESS = 'sitrep-auth/menu/LOAD_SUCCESS';
const LOAD_FAIL = 'sitrep-auth/menu/LOAD_FAIL';
const ACTIVATE = 'sitrep-auth/menu/ACTIVATE';
const ACTIVATE_SUCCESS = 'sitrep-auth/menu/ACTIVATE_SUCCESS';
const ACTIVATE_FAIL = 'sitrep-auth/menu/ACTIVATE_FAIL';

const initialState = {
  loaded: false,
  minimal: false,
  active: 'Home',
  last: null,
  items: [
    { text: 'Home', icon: 'home', target: '/' },
    { text: 'Intellipedia', icon: 'info_outline', target: '/intellipedia' },
    { text: 'Publicly Available Information', icon: 'touch_app', target: '/pai' },
    { text: 'Biographies', icon: 'fingerprint', target: '/biographies' },
    { text: 'Trainer Dashboard', icon: 'track_changes', target: '/trainer-dashboard' },
    { text: 'Change language', icon: 'language', hoverMenu: 'language' },
    { text: 'Global Settings', icon: 'settings', hoverMenu: 'system', onlyIfHasRole: 'admin' },
    { text: 'Logout', icon: 'directions_run', target: 'logout()' },
  ],
  subMenus: {
    system: [],
    language: []
  },
  disabled: false
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
        disabled: action.disabled,
        loaded: true,
        minimal: action.result
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

export function changeMenuMode(state, disabled) {
  return {
    types: [ACTIVATE, ACTIVATE_SUCCESS, ACTIVATE_FAIL],
    disabled: disabled,
    promise: () => {
      return new Promise((ok) => {
        ok(state);
      });
    }
  };
}
