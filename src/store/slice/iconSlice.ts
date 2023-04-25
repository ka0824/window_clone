// Redux Toolkit을 사용하여 아이콘 관련 상태 관리를 구현하는 코드입니다.

import { createSlice } from "@reduxjs/toolkit";
import { IconState } from "../../types";

// 상태 초기값을 정의합니다.
const initialState: IconState = {
  selectedIcon: [],
  displayedIcon: [],
  renamedIcon: "",
  loading: false,
};

// Redux Toolkit을 사용하여 slice를 생성합니다.
const iconSlice = createSlice({
  name: "icon",
  initialState,
  reducers: {
    // 현재 선택된 아이콘을 업데이트하는 액션입니다.
    selectSingleIcon(state, action) {
      const iconId = action.payload;
      state.selectedIcon = [iconId];
    },
    // 선택된 아이콘 하나의 이름을 변경하는 액션입니다.
    renameSingleIcon(state, action) {
      const {
        payload: { id, newTitle },
      } = action;

      state.displayedIcon = state.displayedIcon.map((icon) => {
        if (icon.id === id && newTitle.trim() !== "") {
          icon.title = newTitle;
        }
        return icon;
      });
    },
    // 선택된 하나의 아이콘을 삭제하는 액션입니다.
    deleteSingleIcon(state) {
      state.displayedIcon = state.displayedIcon.filter(
        (icon) => !state.selectedIcon.includes(icon.id)
      );
    },

    // 화면에 표시되는 아이콘 목록을 변경하는 액션 입니다.
    changeDisplay(state, action) {
      const iconId = action.payload;

      state.displayedIcon = iconId;
    },

    // 선택된 아이콘 목록을 초기화하는 액션 입니다.
    resetSelect(state) {
      state.selectedIcon = [];
    },

    // 아이콘 이름 변경을 시작하는 액션입니다. 현재 선택된 아이콘이 1개일 경우만 진행됩니다.
    renameStart(state) {
      if (state.selectedIcon.length === 1) {
        state.renamedIcon = state.selectedIcon[0];
      }
    },

    // 아이콘 이름 변경을 종료하는 액션입니다.
    renameEnd(state) {
      state.renamedIcon = "";
    },

    // 아이콘 목록을 가져오는 비동기 작업을 시작하는 액션입니다.
    getIconStart(state) {
      state.loading = true;
    },

    // 아이콘 목록을 가져오는 데에 성공했을 시 진행되는 액션입니다.
    getIconSuccess(state, action) {
      state.displayedIcon = action.payload;

      state.loading = false;
    },

    // 아이콘 목록을 가져오는 데에 실패했을 시 진행되는 액션입니다.
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
