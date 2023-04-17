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
      title: "테스트2",
      type: "test",
      id: "test2",
    },
    {
      title: "테스트3",
      type: "test",
      id: "test3",
    },
    {
      title: "테스트4",
      type: "test",
      id: "test4",
    },
    {
      title: "테스트5",
      type: "test",
      id: "test5",
    },
    {
      title: "테스트6",
      type: "test",
      id: "test6",
    },
    {
      title: "테스트7",
      type: "test",
      id: "test7",
    },
    {
      title: "테스트8",
      type: "test",
      id: "test8",
    },
    {
      title: "테스트9",
      type: "test",
      id: "test9",
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
