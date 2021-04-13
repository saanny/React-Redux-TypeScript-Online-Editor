import cellReducer from "./cellsReducers";
import bundlesReducer from "./bundlesReducers";
import { combineReducers } from "redux";

const reducers = combineReducers({
  cells: cellReducer,
  bundles: bundlesReducer,
});
export default reducers;

export type RootState = ReturnType<typeof reducers>;
