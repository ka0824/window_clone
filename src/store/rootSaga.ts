import { all } from "redux-saga/effects";
import { getIconSaga } from "./saga/iconSaga";

export default function* rootSaga() {
  yield all([getIconSaga()]);
}
