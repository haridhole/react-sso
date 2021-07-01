import * as ls from 'local-storage';
import { LOCAL_STORAGE_X_AUTH_KEY } from '../constant';
import { store } from '../redux-store/Store';

const deviceId = 'test';
const deviceType = 'Web';

export const parseJwt = token => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
};

export const tokenRequiresRefresh = token => {
  let parsedJWT = parseJwt(token);
  if (!parsedJWT.expiry_time) {
    return true;
  }
  //Diff from current epoch time
  // let timeToExpiry = parsedJWT.expiry_time - new Date().getTime() / 1000;
  // return timeToExpiry < window.config.AUTH.THRESHOLD_FOR_AUTH_REFRESH;

  // if current time is greater than expiry time then we need to refresh token
  return new Date().getTime() / 1000 >= parsedJWT.expiry_time
};

export const authServiceApi = () => {
  const refreshToken = async token => {
    if (!token) {
      token = ls.get(LOCAL_STORAGE_X_AUTH_KEY);
      if (!token) token = store.getState().user.auth_token;
      if (!token)
        throw 'Oops something went wrong. Please Close the Deal and Open Again';
    }
    if (!tokenRequiresRefresh(token)) {
      return
    }
    let parsedJWT = parseJwt(token);
    let url = `${window.config.USER_MANAGEMENT.BASE_URL +
      window.config.USER_MANAGEMENT.API_NAMESPACE}/users/login/${
      parsedJWT.external_id
      }/cooldown_refresh_token`;

    //Getting another token with 4 days validity
    let payload = {
      auth_token: token,
      device_id: parsedJWT.device_id,
      extension_duration: 5600,
      delete_on_expires: false,
      force_refresh_token: false
    };
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (resp.ok) {
      const response = await resp.json();
      //Setting refreshed token
      ls.set(LOCAL_STORAGE_X_AUTH_KEY, response.auth_token);
    }
  };

  const getAuthToken = async (request = {}) => {
    const authRequest = await fetch(
      window.config.AUTH.BASE_URL + '/users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          device: {
            device_id: deviceId,
            device_type: deviceType
          },
          email: request.email,
          password: request.password,
          login_duration: 60
        })
      }
    );

    const response = await authRequest;
    return response.json();

  };
  return { refreshToken, getAuthToken };
};
