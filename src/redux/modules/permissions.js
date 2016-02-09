const LOAD = 'sitrep-auth/permissions/LOAD';
const LOAD_SUCCESS = 'sitrep-auth/permissions/LOAD_SUCCESS';
const LOAD_FAIL = 'sitrep-auth/permissions/LOAD_FAIL';

const UPDATE = 'sitrep-auth/permissions/UPDATE';
const UPDATE_SUCCESS = 'sitrep-auth/permissions/UPDATE_SUCCESS';
const UPDATE_FAIL = 'sitrep-auth/permissions/UPDATE_FAIL';


const initialState = {
  loaded: false
};

export default function permissions(state = initialState, action = {}) {
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
    case UPDATE:
      return state; // 'saving' flag handled by redux-form
    case UPDATE_SUCCESS:
      const data = {...state.data};
      const result = action.result;
      data[result.key] = result.value;
      return {
        ...state,
        data: data,
        saveError: null
      };
    case UPDATE_FAIL:
      return {
        ...state,
        saveError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.permissions && globalState.permissions.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/settings')
  };
}

export function updateSettings(key, value) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.post('/settings', {
      data: {
        key: key,
        value: value
      }
    })
  };
}


export function updateMapLocation(location) {
  return updateSettings('mapLocation', location.mapLocation);
}
