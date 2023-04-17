import { combineReducers } from "redux";
import iconReducer from "./slice/iconSlice";

const rootReducer = combineReducers({
  icon: iconReducer,
});

export default rootReducer;
