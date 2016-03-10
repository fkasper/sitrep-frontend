import Cookies from 'js-cookie';

const LOAD = 'sitrep-auth/auth/LOAD';
const LOAD_SUCCESS = 'sitrep-auth/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'sitrep-auth/auth/LOAD_FAIL';
const LOGIN = 'sitrep-auth/auth/LOGIN';
const LOGIN_SUCCESS = 'sitrep-auth/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'sitrep-auth/auth/LOGIN_FAIL';
const LOGOUT = 'sitrep-auth/auth/LOGOUT';
const LOGOUT_SUCCESS = 'sitrep-auth/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'sitrep-auth/auth/LOGOUT_FAIL';
const CREATE = 'sitrep-auth/auth/CREATE';
const CREATE_SUCCESS = 'sitrep-auth/auth/CREATE_SUCCESS';
const CREATE_FAIL = 'sitrep-auth/auth/CREATE_FAIL';


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
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case CREATE:
      return state; // 'saving' flag handled by redux-form
    case CREATE_SUCCESS:
      return {
        ...state,
        created: action.result,
        editing: false,
        saveError: null
      };
    case CREATE_FAIL:
      return {
        ...state,
        saveError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/apis/authentication/me')
  };
}

export function login(name, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/apis/authentication/login', {
      data: {
        username: name,
        password: password,
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer'
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: () => {
      return new Promise((accept) => {
        Cookies.remove('sid');
        Cookies.remove('ex_id');
        accept();
      });
    }
  };
}

export function createUser(user) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    id: user.email,
    promise: (client) => client.post('/apis/authentication/users', {
      data: user
    })
  };
}
