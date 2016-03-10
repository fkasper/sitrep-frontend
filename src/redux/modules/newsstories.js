const LOAD = 'sitrep-auth/newsstories/LOAD';
const LOAD_SUCCESS = 'sitrep-auth/newsstories/LOAD_SUCCESS';
const LOAD_FAIL = 'sitrep-auth/newsstories/LOAD_FAIL';

const LOAD_SINGLE = 'sitrep-auth/newsstories/LOAD_SINGLE';
const LOAD_SINGLE_SUCCESS = 'sitrep-auth/newsstories/LOAD_SINGLE_SUCCESS';
const LOAD_SINGLE_FAIL = 'sitrep-auth/newsstories/LOAD_SINGLE_FAIL';
const LOAD_TRENDS = 'sitrep-auth/newsstories/LOAD_TRENDS';
const LOAD_TRENDS_SUCCESS = 'sitrep-auth/newsstories/LOAD_TRENDS_SUCCESS';
const LOAD_TRENDS_FAIL = 'sitrep-auth/newsstories/LOAD_TRENDS_FAIL';

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
    case LOAD_TRENDS:
      return {
        ...state,
        trendsLoaded: true
      };
    case LOAD_TRENDS_SUCCESS:
      return {
        ...state,
        loading: false,
        trendsLoaded: true,
        trends: action.result.hits.hits,
        error: null
      };
    case LOAD_TRENDS_FAIL:
      return {
        ...state,
        loading: false,
        trendsLoaded: false,
        single: null,
        error: action.error
      };
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
        ...state
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
    promise: (client) => client.get(`/apis/authentication/news-sites/${chId}`)
  };
}

export function loadSingle(chId, id) {
  return {
    types: [LOAD_SINGLE, LOAD_SINGLE_SUCCESS, LOAD_SINGLE_FAIL],
    promise: (client) => client.get(`/apis/authentication/news-sites/${chId}/stories/${id}`)
  };
}

export function loadTrending(chId) {
  return {
    types: [LOAD_TRENDS, LOAD_TRENDS_SUCCESS, LOAD_TRENDS_FAIL],
    promise: (client) => client.post(`/exercise-data/trends/_search/?scroll=10m`, {
      data: {
        query: {
          match: {
            channel: chId
          }
        },
        sort: [
          {
            priority: 'desc'
          }
        ]
      }
    })
  };
}

export function save(chId, id, bio) {
  if (!id) {
    return {
      types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
      promise: (client) => client.post(`/apis/authentication/news-sites/${chId}`, {
        data: bio
      })
    };
  }
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: id,
    promise: (client) => client.put(`/apis/authentication/news-sites/${chId}/stories/${id}`, {
      data: bio
    })
  };
}

export function updateTrendingStory(id, updateValues) {
  return {
    types: [TRENDING, TRENDING_SUCCESS, TRENDING_FAIL],
    promise: (client) => client.post(`/exercise-data/trends/${id}/_update`, {
      data: {
        doc: updateValues,
        doc_as_upsert: true
      }
    })
  };
}

export function switchTrending(chId, newStory, oldStory) {
  let priority = 0;
  if (!oldStory) {
    priority = 1;
  } else {
    priority = oldStory._source.priority + 1;
  }
  return {
    types: [TRENDING, TRENDING_SUCCESS, TRENDING_FAIL],
    promise: (client) => {
      const promises = [];
      promises.push(client.post(`/exercise-data/trends/${newStory._id ? newStory._id : newStory.id}/_update`, {
        data: {
          doc: {
            priority: priority,
            hidden: false,
            title: newStory._source ? newStory._source.title : newStory.title,
            channel: chId,
            timestamp: (newStory._source ? newStory._source.timestamp : newStory.scheduledPostDate * 1000)
            // previewImage: newStory.preview
          },
          doc_as_upsert: true
        }
      }));
      return Promise.all(promises);
    }
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
