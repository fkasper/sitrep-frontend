const LOAD = 'sitrep-auth/intellipedia/LOAD';
const LOAD_SUCCESS = 'sitrep-auth/intellipedia/LOAD_SUCCESS';
const LOAD_FAIL = 'sitrep-auth/intellipedia/LOAD_FAIL';
const EDIT_START = 'sitrep-auth/intellipedia/EDIT_START';
const EDIT_STOP = 'sitrep-auth/intellipedia/EDIT_STOP';
const SAVE = 'sitrep-auth/intellipedia/SAVE';
const SAVE_SUCCESS = 'sitrep-auth/intellipedia/SAVE_SUCCESS';
const SAVE_FAIL = 'sitrep-auth/intellipedia/SAVE_FAIL';

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
  return globalState.intellipedia && globalState.intellipedia.loaded;
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/intellipedia-article/${id}`) // params not used, just shown as demonstration
  };
}

export function save(widget) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: widget.Subject,
    promise: (client) => client.put(`/intellipedia-article/${widget.Subject}`, {
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
