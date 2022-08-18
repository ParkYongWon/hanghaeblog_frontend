// eslint-disable-next-line

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const contentServer = process.env.REACT_APP_CONTENT;

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const refreshToken = localStorage.getItem("refreshToken")
  ? localStorage.getItem("refreshToken")
  : null;

let config = {
  headers: {
    Authorization: userToken,
    refreshToken: refreshToken,
  },
};

const initialState = {
  list: [],
  singleContent: {},
  isLoading: false,
  err: null,
};

export const getContent = createAsyncThunk(
  "content/getContent",
  async (extr, thunkAPI) => {
    try {
      const { data } = await axios.get(contentServer);
      //console.log(data);
      // return thunkAPI.fulfillWithValue(data.data);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const postContent = createAsyncThunk(
  "content/postContent",
  async (args, thunkAPI) => {
    try {
      const response = await axios.post(contentServer, args, config);
      //console.log(response.data.data);
      // //console.log("여기까지오냐?");
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteContent = createAsyncThunk(
  "content/deleteContent",
  async (arg, thunkAPI) => {
    try {
      const response = await axios.delete(contentServer + `/${arg}`, config);
      const deletedRes = await axios.get(contentServer, config);
      //console.log(response);
      //console.log(deletedRes);
      return thunkAPI.fulfillWithValue(deletedRes.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateContent = createAsyncThunk(
  "content/updateContent",
  async (arg, thunkAPI) => {
    //console.log(arg);
    try {
      const id = arg.id;
      const { title, text } = { ...arg };
      const response = await axios.put(
        contentServer + `/${id}`,
        {
          title,
          text,
        },
        config
      );
      //console.log(response);
      //console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      //console.log(error);
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

export const getSingleContent = createAsyncThunk(
  "content/getSingleContent",
  async (args, thunkAPI) => {
    try {
      // //console.log("args:", args);
      // const targetId = args.id;
      const response = await axios.get(contentServer + `/${args}`);
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const contentSlice = createSlice({
  name: "contentSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getContent.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getContent.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
      //console.log(action.payload);
    },
    [getContent.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    [postContent.pending]: (state, action) => {
      state.isLoading = true;
    },
    [postContent.fulfilled]: (state, action) => {
      // //console.log("여기까지오냐?");
      //console.log(action.payload);
      //console.log(state.list);
      // state.list.push(...action.payload);
      state.list = [{ ...state.list, ...action.payload }];
    },
    [postContent.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    [deleteContent.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteContent.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    },
    [deleteContent.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    [updateContent.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateContent.fulfilled]: (state, action) => {
      state.isLoading = false;
      //console.log(action.payload);
      state.singleContent = action.payload;
    },
    [updateContent.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
    [getSingleContent.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getSingleContent.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.singleContent = action.payload;
    },
    [getSingleContent.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
    },
  },
});

export const {} = contentSlice.actions;
export default contentSlice.reducer;
