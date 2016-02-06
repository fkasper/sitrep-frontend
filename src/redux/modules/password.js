const CHANGE = 'sitrep-auth/passwd/CHANGE';
const CHANGE_SUCCESS = 'sitrep-auth/passwd/CHANGE_SUCCESS';
const CHANGE_FAIL = 'sitrep-auth/passwd/CHANGE_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        loading: true
      };
    case CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        response: action.result
      };
    case CHANGE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.passwd && globalState.passwd.loaded;
}

export function change(newPw, confirmation, old) {
  return {
    types: [CHANGE, CHANGE_SUCCESS, CHANGE_FAIL],
    promise: (client) => client.post('/change-password', {
      data: {
        new_password: newPw,
        new_password_confirmation: confirmation,
        old_password: old
      }
    })
  };
}
