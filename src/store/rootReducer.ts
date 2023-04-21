import { combineReducers } from "redux";
import iconReducer from "./slice/iconSlice";
import programReducer from "./slice/programSlice";

const rootReducer = combineReducers({
  icon: iconReducer,
  program: programReducer,
});

export default rootReducer;
