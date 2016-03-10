const LOAD = 'sitrep-auth/search/LOAD';
const LOAD_SUCCESS = 'sitrep-auth/search/LOAD_SUCCESS';
const LOAD_FAIL = 'sitrep-auth/search/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      const data = state.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        data: {...data, [action.metric]: action.result.hits.hits},
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: state.data,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.search && globalState.search.loaded;
}

export function loadSuggestion(metric, queryData) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    metric: metric,
    promise: (client) => client.post(`/exercise-data/search/_suggest`, {
      data: queryData
    }) // params not used, just shown as demonstration
  };
}

export function loadSearch(metric, queryData) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    metric: metric,
    promise: (client) => client.post(`/exercise-data/search/_search/?scroll=10m`, {
      data: queryData
    }) // params not used, just shown as demonstration
  };
}
