import { createSlice } from "@reduxjs/toolkit";

const snackBarSlice = createSlice({
  name: "auth",
  initialState: {
    severity: "",
    value: "",
    open: false,
  },
  reducers: {
    showSnackBar: (state, action) => {
      state.open = true;
      state.severity = action.payload.severity;
      state.value = action.payload.value;
    },
    hideSnackBar: (state) => {
      state.open = false;
      state.severity = "";
      state.value = "";
    },
  },
});

export const { showSnackBar, hideSnackBar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
