const LOAD = 'sitrep-auth/newsstories/LOAD';
const LOAD_SUCCESS = 'sitrep-auth/newsstories/LOAD_SUCCESS';
const LOAD_FAIL = 'sitrep-auth/newsstories/LOAD_FAIL';
const LOAD_SINGLE = 'sitrep-auth/newsstories/LOAD_SINGLE';
const LOAD_SINGLE_SUCCESS = 'sitrep-auth/newsstories/LOAD_SINGLE_SUCCESS';
const LOAD_SINGLE_FAIL = 'sitrep-auth/newsstories/LOAD_SINGLE_FAIL';
const EDIT_START = 'sitrep-auth/newsstories/EDIT_START';
const EDIT_STOP = 'sitrep-auth/newsstories/EDIT_STOP';
const SAVE = 'sitrep-auth/newsstories/SAVE';
const SAVE_SUCCESS = 'sitrep-auth/newsstories/SAVE_SUCCESS';
const SAVE_FAIL = 'sitrep-auth/newsstories/SAVE_FAIL';
const CREATE = 'sitrep-auth/newsstories/CREATE';
const CREATE_SUCCESS = 'sitrep-auth/newsstories/CREATE_SUCCESS';
const CREATE_FAIL = 'sitrep-auth/newsstories/CREATE_FAIL';
const TRENDING = 'sitrep-auth/newsstories/TRENDING';
const TRENDING_SUCCESS = 'sitrep-auth/newsstories/TRENDING_SUCCESS';
const TRENDING_FAIL = 'sitrep-auth/newsstories/TRENDING_FAIL';
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
    case TRENDING:
      return state; // 'saving' flag handled by redux-form
    case TRENDING_SUCCESS:
      return {
        ...state,
        data: action.result,
      };
    case TRENDING_FAIL:
      return state;
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = {
        ...state.single,
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
    case CREATE:
      return state; // 'saving' flag handled by redux-form
    case CREATE_SUCCESS:
      return {
        ...state,
        single: {id: action.result},
      };
    case CREATE_FAIL:
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
  return globalState.newsstories && globalState.newsstories.loaded;
}

export function isSingleLoaded(globalState) {
  return globalState.newsstories && globalState.newsstories.singleLoaded;
}

export function load(chId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/news-sites/${chId}`)
  };
}

export function loadSingle(chId, id) {
  return {
    types: [LOAD_SINGLE, LOAD_SINGLE_SUCCESS, LOAD_SINGLE_FAIL],
    promise: (client) => client.get(`/news-sites/${chId}/stories/${id}`)
  };
}

export function save(chId, id, bio) {
  if (!id) {
    return {
      types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
      promise: (client) => client.post(`/news-sites/${chId}`, {
        data: bio
      })
    };
  }
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: id,
    promise: (client) => client.put(`/news-sites/${chId}/stories/${id}`, {
      data: bio
    })
  };
}

export function switchTrending(chId, newStory, oldStory) {
  return {
    types: [TRENDING, TRENDING_SUCCESS, TRENDING_FAIL],
    promise: (client) => client.put(`/news-sites/${chId}/trending/${newStory.id}/${oldStory.id}`, {
      data: {
        oldS: oldStory,
        newS: newStory
      }
    })
  };
}

export function editStart(id) {
  if (!id) {
    return { type: EDIT_START, id: 'create' };
  }
  return { type: EDIT_START, id };
}

export function editStop(id) {
  if (!id) {
    return { type: EDIT_STOP, id: 'create' };
  }
  return { type: EDIT_STOP, id };
}
