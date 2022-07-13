import { fork, take, call, delay, put } from "redux-saga/effects";
import { LoginPayload, authActions } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';

import history from "../../utils/history";

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);
    localStorage.setItem('access_token', 'fake token');
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'ManhNT',
      })
    );
  // redirect to admin page
    history.replace('/admin')
  } catch {
    yield put(authActions.loginFailed(''));
  }
}

function* handleLogout() {
  yield delay(1000);
  localStorage.removeItem('access_token');
  history.replace('/login')
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    if(!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
