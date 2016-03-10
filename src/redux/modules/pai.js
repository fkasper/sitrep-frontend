const LOAD = 'sitrep-auth/pai/LOAD';
const LOAD_SUCCESS = 'sitrep-auth/pai/LOAD_SUCCESS';
const LOAD_FAIL = 'sitrep-auth/pai/LOAD_FAIL';
const EDIT_START = 'sitrep-auth/pai/EDIT_START';
const EDIT_STOP = 'sitrep-auth/pai/EDIT_STOP';
const SAVE = 'sitrep-auth/pai/SAVE';
const SAVE_SUCCESS = 'sitrep-auth/pai/SAVE_SUCCESS';
const SAVE_FAIL = 'sitrep-auth/pai/SAVE_FAIL';
const CREATE = 'sitrep-auth/pai/CREATE';
const CREATE_SUCCESS = 'sitrep-auth/pai/CREATE_SUCCESS';
const CREATE_FAIL = 'sitrep-auth/pai/CREATE_FAIL';
const LOAD_SINGLE = 'sitrep-auth/pai/LOAD_SINGLE';
const LOAD_SINGLE_SUCCESS = 'sitrep-auth/pai/LOAD_SINGLE_SUCCESS';
const LOAD_SINGLE_FAIL = 'sitrep-auth/pai/LOAD_SINGLE_FAIL';
const initialState = {
  loaded: false,
  editing: {},
  singleLoaded: false,
  saveError: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SINGLE:
      return {
        ...state,
        single: null,
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
      const createData = [...state.data];
      createData.push(action.raw);
      return {
        ...state,
        data: createData
      };
    case CREATE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: action.error
      } : state;
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

export function isSingleLoaded(globalState) {
  return globalState.pai && globalState.pai.singleLoaded;
}
export function isLoaded(globalState) {
  return globalState.pai && globalState.pai.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/apis/authentication/publicly-available-information`) // params not used, just shown as demonstration
  };
}

export function loadSingle(id) {
  return {
    types: [LOAD_SINGLE, LOAD_SINGLE_SUCCESS, LOAD_SINGLE_FAIL],
    promise: (client) => client.get(`/apis/authentication/publicly-available-information/${id}`)
  };
}

export function create(page) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    raw: page,
    promise: (client) => client.post(`/apis/authentication/publicly-available-information`, {
      data: page
    })
  };
}
export function save(id, page) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: id,
    promise: (client) => client.put(`/apis/authentication/publicly-available-information/${id}`, {
      data: page
    })
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}
