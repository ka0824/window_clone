// Redux Toolkit을 사용하여 프로그램 관련 상태 관리를 구현하는 코드입니다.

import { createSlice } from "@reduxjs/toolkit";
import { ProgramState } from "../../types";

// 상태 초기값을 정의합니다.
const initialState: ProgramState = {
  executed: [],
  currentProgram: "",
  nextZIndex: 21,
};

// Redux Toolkit을 사용하여 slice를 생성합니다.
const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    // 프로그램 실행 목록에 추가하는 액션입니다. 프로그램 실행을 의미합니다. 이미 실행되고 있는 프로그램일 시, 목록에 추가되지 않습니다.
    execute: (state, action) => {
      const {
        payload: { id, type, title },
      } = action;

      const filtered = state.executed.filter((program) => program.id === id);

      if (filtered.length !== 0) {
        state.executed = state.executed.map((program) => {
          if (program.id === id) {
            return {
              ...program,
              isMinimize: false,
              zIndex: state.nextZIndex++,
            };
          }
          return program;
        });
        state.currentProgram = id;
        return;
      }

      state.currentProgram = id;
      state.executed.push({
        id,
        type,
        title,
        pos: null,
        zIndex: state.nextZIndex++,
        isMinimize: false,
      });
    },

    // 프로그램 실행 목록에서 제거하는 액션입니다. 프로그램 종료를 의미합니다.
    close: (state, action) => {
      const id = action.payload;

      state.executed = state.executed.filter((program) => program.id !== id);
    },
    toggleMinimize: (state, action) => {
      const id = action.payload;

      const index = state.executed.findIndex((program) => program.id === id);

      if (index !== -1) {
        const program = state.executed[index];
        state.currentProgram = program.isMinimize ? program.id : "";
        program.isMinimize = !program.isMinimize;
        program.zIndex = state.nextZIndex++;
      }
    },

    // 가장 상단에서 실행되는 프로그램으로 업데이트하는 액션입니다. zIndex가 가장 높으며, 하단 작업 표시줄에 표시됩니다.
    handleCurrentProgram: (state, action) => {
      const id = action.payload;

      if (state.currentProgram === id) {
        state.currentProgram = "";
      } else {
        state.currentProgram = id;
        state.executed = state.executed.map((program) => {
          if (program.id === id) {
            return { ...program, zIndex: state.nextZIndex++ };
          } else {
            return program;
          }
        });
      }
    },

    // 해당 프로그램의 zIndex를 현재 실행되는 프로그램 모두보다 높게 업데이트 하는 액션입니다.
    handleZIndex: (state, action) => {
      const id = action.payload;

      state.currentProgram = id;
      state.executed = state.executed.map((program) => {
        if (program.id === id) {
          return { ...program, zIndex: state.nextZIndex++ };
        }
        return program;
      });
    },

    // 현재 프로그램의 x, y 좌표를 업데이트 하는 액션입니다.
    handlePos: (state, action) => {
      const {
        payload: { id, pos },
      } = action;

      state.executed = state.executed.map((program) => {
        if (program.id === id) {
          return { ...program, pos };
        } else {
          return program;
        }
      });
    },
    closeAll: (state) => {
      state.executed = [];
    },
  },
});

export const {
  execute,
  close,
  toggleMinimize,
  handleCurrentProgram,
  handleZIndex,
  handlePos,
  closeAll,
} = programSlice.actions;

export default programSlice.reducer;
