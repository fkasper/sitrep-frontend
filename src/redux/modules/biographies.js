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
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = [...state.data];
      data[action.result.Subject] = action.result;
      return {
        ...state,
        data: data,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
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

export function save(widget) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: widget.id,
    promise: (client) => client.put(`/biographies/${widget.id}`, {
      data: widget
    })
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
