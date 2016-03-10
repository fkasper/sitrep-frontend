const UPLOAD = 'sitrep-auth/uploads/UPLOAD';
const UPLOAD_DONE = 'sitrep-auth/uploads/UPLOAD_DONE';
const UPLOAD_FAIL = 'sitrep-auth/uploads/UPLOAD_FAIL';
const LOAD = 'sitrep-auth/uploads/LOAD';
const LOAD_SUCCESS = 'sitrep-auth/uploads/LOAD_SUCCESS';
const LOAD_FAIL = 'sitrep-auth/uploads/LOAD_FAIL';
const initialState = {
  loading: false,
  loaded: false,
  loadedAll: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPLOAD:
      return {
        ...state,
        loading: true,
        loaded: false,
        fileName: action.filename
      };
    case UPLOAD_DONE:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        fileName: '',
        success: true
      };
    case UPLOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        fileName: '',
        error: action.error,
        success: false
      };
    case LOAD:
      return {
        ...state,
        loadedAll: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loadedAll: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loadedAll: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.uploads && globalState.uploads.loadedAll;
}

export function uploadFile(files) {
  const file = files[0];
  const formData = new FormData();

  formData.append('file', file);
  console.log(file);
  return {
    types: [UPLOAD, UPLOAD_DONE, UPLOAD_FAIL],
    promise: (client) => client.post('/apis/authentication/uploads', {
      file: file
    })
  };
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/apis/authentication/uploads`)
  };
}
