import { createSlice } from "@reduxjs/toolkit";
import { IconState } from "../../types";

const initialState: IconState = {
  selectedIcon: [],
  displayedIcon: [
    {
      title: "테스트",
      type: "test",
      id: "test1",
    },
    {
      title: "계산기",
      type: "calculator",
      id: "calculator1",
    },
    {
      title: "채팅",
      type: "chat",
      id: "chat1",
    },
    {
      title: "게시판",
      type: "notice",
      id: "notice1",
    },
    {
      title: "타자 연습",
      type: "typing",
      id: "typing1",
    },
    {
      title: "공룡 게임",
      type: "dinoGame",
      id: "dinoGame1",
    },
  ],
  renamedIcon: "",
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
} = iconSlice.actions;

export default iconSlice.reducer;
