import { fork, take } from "redux-saga/effects";
import { LoginPayload, authActions } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleLogin(payload: LoginPayload) {
  localStorage.setItem('access_token', 'fake_token');
}

function* handleLogout() {
  localStorage.removeItem('access_token');
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
