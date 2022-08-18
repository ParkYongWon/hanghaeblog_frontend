// eslint-disable-next-line

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const commentServer = process.env.REACT_APP_COMMENT;

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
  comments: [],
};

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (payload, thunkAPI) => {
    try {
      const targetId = payload;
      const response = await axios.get(
        `http://43.200.1.214:8080/api/content/${targetId}`
      );
      //console.log(response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const postComments = createAsyncThunk(
  "comment/postComment",
  async (payload, thunkAPI) => {
    try {
      //console.log(payload);
      const contentId = payload.contentId;
      const commentText = payload.commentText;
      const commentPost = await axios.post(
        commentServer,
        {
          contentId: contentId,
          commentText: commentText,
        },
        config
      );
      //console.log(commentPost);
      return thunkAPI.fulfillWithValue(commentPost.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (payload, thunkAPI) => {
    try {
      //console.log(payload);
      const delCommentRes = await axios.delete(
        commentServer + `/${payload}`,
        config
      );
      //console.log(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const patchComment = createAsyncThunk(
//   "comment/patchComment",
//   async (payload, thunkAPI) => {
//     try {
//       const commentId = payload.id;
//       const commentText = payload.newDesc;
//       //console.log(commentId);
//       //console.log(commentText);
//       const patchCommentRes = await axios.put(
//         commentServer + `/${commentId}`,
//         { commentId, commentText },
//         config
//       );
//       //console.log(patchCommentRes.data);
//       return thunkAPI.fulfillWithValue(patchCommentRes.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {},
  extraReducers: {
    // [patchComment.pending]: (state = initialState, action) => {
    //   state.isLoading = true;
    // },
    // [patchComment.fulfilled]: (state = initialState, action) => {
    //   state.isLoading = false;
    //   state.comments = action.payload;
    // },
    // [patchComment.rejected]: (state = initialState, action) => {
    //   state.isLoading = false;
    //   state.err = action.payload.comments;
    // },
    [getComments.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload.data.comments;
      //console.log(action.payload.data.comments);
    },
    [getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.comments = [];
      state.err = action.payload;
    },
    [postComments.pending]: (state) => {
      state.isLoading = true;
    },
    [postComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.comments.push(...action.payload);
      //console.log(state.comments);
      //console.log(action.payload);
      state.comments = [...state.comments, action.payload];
    },
    [postComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteComment.pending]: (state, action) => {
      state.isLoading = true;
      // state.status = 0;
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.status = action.payload;
      //console.log(action.payload);
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    [deleteComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.payload.comments;
    },
  },
});

// export const {} = commentSlice.actions;
export default commentSlice.reducer;
