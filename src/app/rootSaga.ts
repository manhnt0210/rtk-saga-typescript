import { all } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
import counterSaga from "../features/counter/counterSaga";
import dashboardSaga from '../features/dashboard/dashboardSaga';
import studentSaga from "../features/student/studentSage";

export default function* rootSaga() {
  yield all([
    counterSaga(),
    authSaga(),
    dashboardSaga(),
    studentSaga(),
  ])
}
