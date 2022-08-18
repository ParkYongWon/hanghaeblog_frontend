// // eslint-disable-next-line

import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./userActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const refreshToken = localStorage.getItem("refreshToken")
  ? localStorage.getItem("refreshToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null, // for user object
  userToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
  is_Login: false,
  refreshToken,
  // refreshToken,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // logout: (state) => {
    //   localStorage.removeItem("userToken"); // deletes token from storage
    //   localStorage.removeItem("loginId");
    //   localStorage.removeItem("refreshToken");
    //   state.loading = false;
    //   state.userInfo = null;
    //   state.userToken = null;
    //   state.error = null;
    //   // //console.log(typeof userInfo);
    // },
    loader: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
      // //console.log(payload);
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      // //console.log(payload);
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // logout user
    // [logoutUser.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    // },
    // [registerUser.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.success = true; // logout successful
    //   state.refreshToken = payload.refreshToken;
    // },
    // [registerUser.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload;
    // },
  },
});

export const { logout, loader } = userSlice.actions;

export default userSlice.reducer;