import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: {},
    userId: null,
    access: null,
    refresh: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
      state.userId = action.payload.userId;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
