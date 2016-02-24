const UPLOAD = 'sitrep-auth/uploads/UPLOAD';
const UPLOAD_DONE = 'sitrep-auth/uploads/UPLOAD_DONE';
const UPLOAD_FAIL = 'sitrep-auth/uploads/UPLOAD_FAIL';

const initialState = {
  loading: false,
  loaded: false
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
    default:
      return state;
  }
}


export function uploadFile(files) {
  const file = files[0];
  const formData = new FormData();

  formData.append('file', file);
  console.log(file);
  return {
    types: [UPLOAD, UPLOAD_DONE, UPLOAD_FAIL],
    promise: (client) => client.post('/uploads', {
      file: file
    })
  };
}
