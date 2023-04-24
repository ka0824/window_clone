import { createSlice } from "@reduxjs/toolkit";
import { ProgramState } from "../../types";

const initialState: ProgramState = {
  executed: [],
  currentProgram: "",
  nextZIndex: 21,
};

const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
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
    close: (state, action) => {
      const { payload } = action;

      state.executed = state.executed.filter(
        (program) => program.id !== payload
      );
    },
    toggleMinimize: (state, action) => {
      const { payload } = action;

      state.executed = state.executed.map((program) => {
        if (program.id === payload) {
          state.currentProgram = program.isMinimize ? payload : "";
          return { ...program, isMinimize: !program.isMinimize };
        }
        return program;
      });
    },
    handleCurrentProgram: (state, action) => {
      const { payload } = action;

      if (state.currentProgram === payload) {
        state.currentProgram = "";
      } else {
        state.currentProgram = payload;
        state.executed = state.executed.map((program) => {
          if (program.id === payload) {
            return { ...program, zIndex: state.nextZIndex++ };
          } else {
            return program;
          }
        });
      }
    },
    handleZIndex: (state, action) => {
      const { payload } = action;

      state.currentProgram = payload;
      state.executed = state.executed.map((program) => {
        if (program.id === payload) {
          return { ...program, zIndex: state.nextZIndex++ };
        }
        return program;
      });
    },
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
