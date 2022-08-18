// eslint-disable-next-line

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginServer = process.env.REACT_APP_LOGIN;
const signupServer = process.env.REACT_APP_SIGNUP;

// const loginServer = process.env.EC2_API_URL_LOGIN;

// const userToken = localStorage.getItem("userToken")
//   ? localStorage.getItem("userToken")
//   : null;

// const refreshToken = localStorage.getItem("refreshToken")
//   ? localStorage.getItem("refreshToken")
//   : null;

// let configs = {
//   headers: {
//     Authorization: userToken,
//     refreshToken: refreshToken,
//   },
// };

export const registerUser = createAsyncThunk(
  // action type string
  "user/register",
  // callback function
  async ({ loginId, password, passwordConfirm }, thunkAPI) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // make request to backend
      const response = await axios.post(
        signupServer,
        { loginId, password, passwordConfirm },
        config
      );
      window.alert("회원가입 성공");
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      window.alert("회원가입 실패!");
      return thunkAPI.rejectWithValue();
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ loginId, password }, thunkAPI) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        loginServer,
        { loginId, password },
        config
      );
      // //console.log(response);
      if (response.data.success === false) {
        window.alert(response.data.error.message);
        return thunkAPI.rejectWithValue();
      } else {
        // store user's token in local storage
        localStorage.setItem("userToken", response.headers.authorization);
        localStorage.setItem("loginId", response.data.data.loginId);
        localStorage.setItem("refreshToken", response.headers.refreshtoken);
        // //console.log(response);
        window.alert("로그인 성공");
        return thunkAPI.fulfillWithValue(response);
      }
    } catch (error) {
      // return custom error message from API if any
      // if (error.response && error.response.data.message) {
      //   return rejectWithValue(error.response.data.message);
      // } else {
      //   return rejectWithValue(error.message);
      // }
    }
  }
);

// export const logoutUser = createAsyncThunk(
//   // action type string
//   "user/logut",
//   // callback function
//   async ({ loginId, password }, thunkAPI) => {
//     try {
//       const refreshToken = localStorage.getItem("refreshToken");
//       // configure header's Content-Type as JSON
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       // make request to backend
//       const response = await axios.post(
//         "http://43.200.1.214:8080/api/member/logout",
//         { loginId, password },
//         configs
//       );
//       window.alert("로그아웃 성공");
//       return thunkAPI.fulfillWithValue(response);
//     } catch (error) {
//       window.alert("로그아웃 실패");
//       return thunkAPI.rejectWithValue();
//     }
//   }
// );
