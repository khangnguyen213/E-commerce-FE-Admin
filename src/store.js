import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./Redux/Reducer/sessionSlice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
});
