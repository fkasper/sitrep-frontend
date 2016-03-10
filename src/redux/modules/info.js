const LOAD = 'sitrep-auth/LOAD';
const LOAD_SUCCESS = 'sitrep-auth/LOAD_SUCCESS';
const LOAD_FAIL = 'sitrep-auth/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function info(state = initialState, action = {}) {
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
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.info && globalState.info.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/apis/authentication/me')
  };
}
