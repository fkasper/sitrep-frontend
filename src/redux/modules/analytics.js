const LOAD = 'sitrep-auth/analytics/LOAD';
const LOAD_SUCCESS = 'sitrep-auth/analytics/LOAD_SUCCESS';
const LOAD_FAIL = 'sitrep-auth/analytics/LOAD_FAIL';

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
        data: {...data, [action.metric]: action.result},
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
  return globalState.analytics && globalState.analytics.loaded;
}

export function loadMetric(metric, query, queryData) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    metric: metric,
    promise: (client) => client.post(`/exercise-metrics/${query}/_search`, {
      data: queryData
    }) // params not used, just shown as demonstration
  };
}
