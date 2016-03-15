import superagent from 'superagent';
import config from '../config';
import Cookie from 'js-cookie';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return `${config.apiBaseUrl}${adjustedPath}`;
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
      this[method] = (path, { params, data, file } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }
        if (typeof document !== 'undefined') {
          if (typeof(Storage) !== 'undefined') {
            const auth = localStorage.getItem('sitrep_ex_id');
            request.set('Authorization', `Bearer ${auth}`);
          } else {
            const cookie = Cookie.get('sid');

            if (cookie) {
              request.set('Authorization', `Bearer ${cookie}`);
            }
            const ckie = Cookie.get('ex_id');
            if (ckie) {
              request.set('X-EXERCISE-ID', `${ckie}`);
            }
          }
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (file) {
          // request.type('multipart/form-data');
          request.set('X-File-Name', file.name);
          request.set('X-File-Preview', file.preview);
          request.set('X-File-LastModified', file.lastModified);
          request.send(file);
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
