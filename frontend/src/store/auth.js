// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  role: "student", // default role
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.role = "student"; // logout ke baad default role
    },
    changeRole(state, action) {
      const validRoles = ["admin", "student", "teacher"];
      const newRole = action.payload;
      if (validRoles.includes(newRole)) {
        state.role = newRole;
      } else {
        console.warn("Invalid role:", newRole);
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
