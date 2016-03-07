const LOAD = 'sitrep-auth/biographies/LOAD';
const LOAD_SUCCESS = 'sitrep-auth/biographies/LOAD_SUCCESS';
const LOAD_FAIL = 'sitrep-auth/biographies/LOAD_FAIL';
const LOAD_SINGLE = 'sitrep-auth/biographies/LOAD_SINGLE';
const LOAD_SINGLE_SUCCESS = 'sitrep-auth/biographies/LOAD_SINGLE_SUCCESS';
const LOAD_SINGLE_FAIL = 'sitrep-auth/biographies/LOAD_SINGLE_FAIL';
const EDIT_START = 'sitrep-auth/biographies/EDIT_START';
const EDIT_STOP = 'sitrep-auth/biographies/EDIT_STOP';
const SAVE = 'sitrep-auth/biographies/SAVE';
const SAVE_SUCCESS = 'sitrep-auth/biographies/SAVE_SUCCESS';
const SAVE_FAIL = 'sitrep-auth/biographies/SAVE_FAIL';

const CREATE = 'sitrep-auth/biographies/CREATE';
const CREATE_SUCCESS = 'sitrep-auth/biographies/CREATE_SUCCESS';
const CREATE_FAIL = 'sitrep-auth/biographies/CREATE_FAIL';

const initialState = {
  loaded: false,
  singleLoaded: false,
  editing: {},
  saveError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SINGLE:
      return {
        ...state,
        singleLoaded: true
      };
    case LOAD_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        singleLoaded: true,
        single: action.result,
        error: null
      };
    case LOAD_SINGLE_FAIL:
      return {
        ...state,
        loading: false,
        singleLoaded: false,
        single: null,
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
    case CREATE:
      return state; // 'saving' flag handled by redux-form
    case CREATE_SUCCESS:
      return {
        ...state,
        id: action.result.id,
        single: action.bio,
      };
    case CREATE_FAIL:
      return {
        ...state,
        saveError: action.error
      };
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = {
        ...state.data,
        ...action.result,
        id: action.id};
      return {
        ...state,
        single: data,
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.biographies && globalState.biographies.loaded;
}

export function isSingleLoaded(globalState) {
  return globalState.biographies && globalState.biographies.singleLoaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/biographies`)
  };
}

export function loadSingle(id) {
  return {
    types: [LOAD_SINGLE, LOAD_SINGLE_SUCCESS, LOAD_SINGLE_FAIL],
    promise: (client) => client.get(`/biographies/${id}`)
  };
}
export function create(bio) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    bio,
    promise: (client) => client.post(`/biographies`, {
      data: bio
    })
  };
}
export function save(id, bio) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: id,
    promise: (client) => client.put(`/biographies/${id}`, {
      data: bio
    })
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
