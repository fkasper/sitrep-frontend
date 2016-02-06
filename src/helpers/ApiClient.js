import superagent from 'superagent';
import config from '../config';
import Cookie from 'js-cookie';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__DEVELOPMENT__) {
    return `http://${config.apiHost}:${7101}/apis/authentication${adjustedPath}`;
  }
  // if (__SERVER__) {
  // Prepend host and port of the API server to the path.
  return `http://${config.apiHost}:${config.apiPort || 7101}/apis/authentication${adjustedPath}`;
  // return 'http://' + config.apiHost + ':' + (config.apiPort||7717) + '/apis/authentication' + adjustedPath;
  // }
  // return `/apis/authentication${adjustedPath}`;
  // return 'http://' + config.apiHost + ':7717/apis/authentication' + adjustedPath;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }
        if (typeof document !== 'undefined') {
          const cookie = Cookie.get('sid');

          if (cookie) {
            request.set('Authorization', `Bearer ${cookie}`);
          }
          const ckie = Cookie.get('ex_id');
          if (ckie) {
            request.set('X-EXERCISE-ID', `${ckie}`);
          }
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }


        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
