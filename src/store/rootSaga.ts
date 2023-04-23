import { all } from "redux-saga/effects";
import { getIconSaga } from "./slice/iconSlice";

export default function* rootSaga() {
  yield all([getIconSaga()]);
}
