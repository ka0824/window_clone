// Redux Saga를 사용하여 Firebase Firestore에서 화면에 표시될 데이터를 가져옵니다.

import { SagaIterator } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import { getIconFail, getIconStart, getIconSuccess } from "../slice/iconSlice";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { DisplayedIcon, UserIcon } from "../../types";

// getIconStart 액션이 dispatch되면 실행되는 사가 함수입니다.
export function* getIconSaga(): SagaIterator {
  // takeLatest를 사용하여 getIconStart 액션이 dispatch될 때마다 사가 함수가 실행됩니다.
  yield takeLatest(getIconStart.type, function* () {
    try {
      // firebase에서 'icon'컬렉션의 데이터를 가져옵니다.
      const result: QuerySnapshot<DocumentData> = yield call(
        getDocs,
        collection(db, "icon")
      );

      // 가져온 데이터를 저장할 변수를 선언합니다.
      let icons: DisplayedIcon = [];

      // 반복문을 사용하여 필요한 데이터를 추출합니다.
      result.docs.forEach((doc) => {
        const data = doc.data();
        data.user.forEach((el: UserIcon) => {
          if (el.name === "basic") {
            icons = [...icons, ...el.content];
          }
        });
      });

      // 가져온 데이터를 redux store에 저장합니다.
      yield put(getIconSuccess(icons));
    } catch (error) {
      yield put(getIconFail());
    }
  });
}
