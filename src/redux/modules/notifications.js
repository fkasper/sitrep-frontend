const NOTIFY = 'sitrep-auth/notifications/NOTIFY';
const NOTIFY_DONE = 'sitrep-auth/notifications/NOTIFY_DONE';
const NOTIFY_FAIL = 'sitrep-auth/notifications/NOTIFY_FAIL';

const initialState = {
  show: false,
  message: '',
  icon: 'check'
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case NOTIFY:
      return {
        ...state,
        show: true,
        message: action.message,
        icon: action.icon
      };
    case NOTIFY_DONE:
      return {
        ...state,
        show: false,
        message: ''
      };
    case NOTIFY_FAIL:
      return {
        ...state,
        show: true,
        message: action.message,
        icon: action.icon
      };
    default:
      return state;
  }
}

export function notifyInternally() {
  return {
    types: [NOTIFY, NOTIFY_DONE, NOTIFY_FAIL],
    promise: () => {
      return new Promise((accept) => {
        setTimeout(() => {
          accept(false);
        }, 4000);
      });
    }
  };
}
export function notify(message, hide, error) {
  let icon = 'check';
  if (hide) notifyInternally();
  if (error) icon = 'error';
  return {
    type: (error) ? NOTIFY_FAIL : NOTIFY,
    message: message,
    icon: icon
  };
}
export function notifyHide() {
  return {
    type: NOTIFY_DONE
  };
}
