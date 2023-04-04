import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  userId: "",
  fullname: "",
  role: "",
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogged = true;
      state.userId = action.payload.id;
      state.fullname = action.payload.fullname;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isLogged = false;
      state.userId = "";
      state.fullname = "";
      state.role = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = sessionSlice.actions;

export default sessionSlice.reducer;
