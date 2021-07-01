import { all, takeLatest } from 'redux-saga/effects';
import {
  GET_USER_REQUEST_MADE,
} from '../../constant';
import {
  submitGetUserSaga
} from './userSaga';
import AppService from '../../services/index';

const userpApi = AppService.user;

export default function* rootSaga() {
  yield all([
    takeLatest(GET_USER_REQUEST_MADE,submitGetUserSaga,userpApi),
  ]);
}
