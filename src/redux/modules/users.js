const LOAD = 'sitrep-auth/users/LOAD';
const LOAD_SUCCESS = 'sitrep-auth/users/LOAD_SUCCESS';
const LOAD_FAIL = 'sitrep-auth/users/LOAD_FAIL';
const EDIT_START = 'sitrep-auth/users/EDIT_START';
const EDIT_STOP = 'sitrep-auth/users/EDIT_STOP';
const SAVE = 'sitrep-auth/users/SAVE';
const SAVE_SUCCESS = 'sitrep-auth/users/SAVE_SUCCESS';
const SAVE_FAIL = 'sitrep-auth/users/SAVE_FAIL';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {}
};

export default function reducer(state = initialState, action = {}) {
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
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      return {
        ...state,
        editing: false,
        saveError: null
      };
    case SAVE_FAIL:
      return {
        ...state,
        saveError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.users && globalState.users.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/users/list') // params not used, just shown as demonstration
  };
}

export function save(id, user) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: id,
    promise: (client) => client.put(`/users/${id}`, {
      data: user
    })
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
