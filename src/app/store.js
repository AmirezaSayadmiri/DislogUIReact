import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import snackBarSlice from "./features/snackBar/snackBarSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    snackBar:snackBarSlice
  },
});

export default store;
