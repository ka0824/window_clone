import { createSlice } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { takeLatest, call, put } from "redux-saga/effects";
import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { DisplayedIcon, IconState, UserIcon } from "../../types";

const initialState: IconState = {
  selectedIcon: [],
  displayedIcon: [],
  renamedIcon: "",
  loading: false,
};

const iconSlice = createSlice({
  name: "icon",
  initialState,
  reducers: {
    selectSingleIcon(state, action) {
      const { payload } = action;
      state.selectedIcon = [payload];
    },
    renameSingleIcon(state, action) {
      const {
        payload: { id, newTitle },
      } = action;

      state.displayedIcon.map((icon) => {
        if (icon.id === id && newTitle.trim() !== "") {
          icon.title = newTitle;
        }
      });
    },
    deleteSingleIcon(state) {
      state.displayedIcon = state.displayedIcon.filter(
        (icon) => !state.selectedIcon.includes(icon.id)
      );
    },
    changeDisplay(state, action) {
      const { payload } = action;

      state.displayedIcon = payload;
    },
    resetSelect(state) {
      state.selectedIcon = [];
    },
    renameStart(state) {
      if (state.selectedIcon.length === 1) {
        state.renamedIcon = state.selectedIcon[0];
      }
    },
    renameEnd(state) {
      state.renamedIcon = "";
    },
    getIconStart(state) {
      state.loading = true;
    },
    getIconSuccess(state, action) {
      state.displayedIcon = action.payload;

      state.loading = false;
    },
    getIconFail(state) {
      state.displayedIcon = [];
      state.loading = false;
    },
  },
});

export const {
  selectSingleIcon,
  renameSingleIcon,
  deleteSingleIcon,
  changeDisplay,
  resetSelect,
  renameStart,
  renameEnd,
  getIconStart,
  getIconSuccess,
  getIconFail,
} = iconSlice.actions;

export default iconSlice.reducer;

export function* getIconSaga(): SagaIterator {
  yield takeLatest(getIconStart.type, function* () {
    try {
      const result: QuerySnapshot<DocumentData> = yield call(
        getDocs,
        collection(db, "icon")
      );

      const icons: DisplayedIcon = [];

      result.docs.map((doc) => {
        const data = doc.data();
        data.user.map((el: UserIcon) => {
          if (el.name === "basic") {
            icons.push(...el.content);
          }
        });
      });

      yield put(getIconSuccess(icons));
    } catch (error) {
      yield put(getIconFail());
    }
  });
}
