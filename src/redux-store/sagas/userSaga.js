import { call, put } from 'redux-saga/effects';
import _ from 'lodash';

import userActions from '../actions/userActions';

export function* submitGetUserSaga(userApi, action) {
  try {
    const response = yield call(userApi.submitGetUser, action.payload);
    yield put(userActions.getUserSubmitted(response));
  } catch (e) {
    yield put(
      userActions.submitGetUserFailed({
        message: e.message
      })
    );
  }
}