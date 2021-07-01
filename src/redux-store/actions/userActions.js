import { action } from 'typesafe-actions';
import {
  GET_USER_REQUEST_MADE,
  GET_USER_RESOLVED,
  GET_USER_FAILED
} from '../../constant';

export default {
  submitGetUser: payload => action(GET_USER_REQUEST_MADE, payload),
  getUserSubmitted: payload => action(GET_USER_RESOLVED, payload),
  submitGetUserFailed: payload => action(GET_USER_FAILED, payload),
};
