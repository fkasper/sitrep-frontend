const LOAD = 'sitrep-auth/textpart/LOAD';
const LOAD_SUCCESS = 'sitrep-auth/textpart/LOAD_SUCCESS';
const LOAD_FAIL = 'sitrep-auth/textpart/LOAD_FAIL';
const SAVE = 'sitrep-auth/textpart/SAVE';
const SAVE_SUCCESS = 'sitrep-auth/textpart/SAVE_SUCCESS';
const SAVE_FAIL = 'sitrep-auth/textpart/SAVE_FAIL';

const initialState = {
  loaded: false,
  singleLoaded: false,
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

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.textpart && globalState.textpart.loaded;
}

export function load(chId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/news-sites/${chId}`)
  };
}


export function save(id, bio) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: id,
    promise: (client) => client.post(`/text-parts/${id}`, {
      data: {
        partName: '',
        partContent: bio.partContent
      }
    })
  };
}
