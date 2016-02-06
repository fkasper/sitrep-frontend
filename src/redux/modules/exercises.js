const LOAD = 'sitrep-auth/exercises/LOAD';
const LOAD_SUCCESS = 'sitrep-auth/exercises/LOAD_SUCCESS';
const LOAD_FAIL = 'sitrep-auth/exercises/LOAD_FAIL';
const LOAD_SINGLE = 'sitrep-auth/exercises/LOAD_SINGLE';
const LOAD_SINGLE_SUCCESS = 'sitrep-auth/exercises/LOAD_SINGLE_SUCCESS';
const LOAD_SINGLE_FAIL = 'sitrep-auth/exercises/LOAD_SINGLE_FAIL';
const EDIT_START = 'sitrep-auth/exercises/EDIT_START';
const EDIT_STOP = 'sitrep-auth/exercises/EDIT_STOP';
const SAVE = 'sitrep-auth/exercises/SAVE';
const SAVE_SUCCESS = 'sitrep-auth/exercises/SAVE_SUCCESS';
const SAVE_FAIL = 'sitrep-auth/exercises/SAVE_FAIL';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SINGLE:
      return {
        ...state,
        loading: true
      };
    case LOAD_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        current: action.result,
        error: null
      };
    case LOAD_SINGLE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
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
        data: action.result,
        editing: false,
        error: null
      };
    case SAVE_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.exercises && globalState.exercises.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/exercises`)
  };
}

export function loadSingle(id) {
  return {
    types: [LOAD_SINGLE, LOAD_SINGLE_SUCCESS, LOAD_SINGLE_FAIL],
    promise: (client) => client.get(`/exercises/${id}`)
  };
}

export function save(ex) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: ex.id,
    promise: (client) => client.post('/exercises', {
      data: ex
    })
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
