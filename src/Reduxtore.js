// import configure store
import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";

export const ReduxStore = configureStore({
  reducer: {
    login: loginSlice,
  },
});
