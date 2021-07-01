import { action } from 'typesafe-actions';
import { GET_AUTH_TOKEN, SIGN_OUT, RECEIVED_AUTH_TOKEN } from '../../constant';

export const getAuthToken = payload => action(GET_AUTH_TOKEN, payload);
export const receivedAuthToken = payload =>
  action(RECEIVED_AUTH_TOKEN, payload);
export const invalidateAuth = () => action(SIGN_OUT, null);
