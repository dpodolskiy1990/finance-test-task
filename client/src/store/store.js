import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import dataSlice from "./Slice/DataSlice";

const rootReducer = combineReducers({
  data: dataSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
