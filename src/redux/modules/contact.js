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

export function save(id, bio) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: id,
    promise: (client) => client.post(`/apis/authentication/contact`, {
      data: bio
    })
  };
}
