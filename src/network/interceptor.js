import { store } from '../redux-store/Store';
import * as ls from 'local-storage';
import { LOCAL_STORAGE_X_AUTH_KEY } from '../constant';
import { authServiceApi } from '../services/authService';

const _authService = authServiceApi();

const httpInterceptor = (payload = {}, timeout = 60000) => {
  return Promise.race([
    fetchApi(payload),
    new Promise((_, reject) =>
      setTimeout(() => {
        return reject({ error: 'timeout' });
      }, timeout)
    )
  ]);
};

const fetchApi = async payload => {
  // await _authService.refreshToken();
  // let token = ls.get(LOCAL_STORAGE_X_AUTH_KEY);
  // if(!token) {
  //   token = store.getState().user.auth_token;
  // }
  const response = await fetch(payload.url, {
    method: payload.method,
    body: payload.body,
    headers: Object.assign(
      {},
      // {
      //   'X-Auth': token
      // },
      payload.headers
    )
  });

  return response;
};

export default httpInterceptor;
