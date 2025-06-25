import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { PostType } from "../../types";

interface PostsState {
  posts: {
    items: PostType[];
    status: "loading" | "loaded" | "error";
  };
  tags: {
    items: string[];
    status: "loading" | "loaded" | "error";
  };
}

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (sort: string = "") => {
    const { data } = await axios.get(`/posts?sort=${sort}`);
    return data;
  }
);

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id: string, { dispatch }) => {
    await axios.delete(`/posts/${id}`);
    dispatch(fetchTags());
  }
);

export const fetchAddComment = createAsyncThunk(
  "posts/fetchAddComment",
  async ({ postId, text }: { postId: string; text: string }) => {
    const { data } = await axios.post(`posts/${postId}/comments`, {
      text: text,
    });

    return data;
  }
);

const initialState: PostsState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.status = "error";
      })
      .addCase(fetchTags.pending, (state) => {
        state.tags.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = "loaded";
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.status = "error";
      })
      .addCase(fetchRemovePost.pending, (state) => {
        state.posts.status = "loading";
      })
      .addCase(fetchRemovePost.fulfilled, (state, action) => {
        state.posts.items = state.posts.items.filter(
          (post: PostType) => post._id !== action.meta.arg
        );
        state.posts.status = "loaded";
      })
      .addCase(fetchRemovePost.rejected, (state) => {
        state.posts.status = "error";
      })
      .addCase(fetchAddComment.pending, (state) => {
        state.posts.status = "loading";
      })
      .addCase(fetchAddComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        const post = state.posts.items.find((post) => post._id === postId);
        if (post) {
          post.comments.push(comment);
        }
        state.posts.status = "loaded";
      })
      .addCase(fetchAddComment.rejected, (state) => {
        state.posts.status = "error";
      });
  },
});

export default postSlice.reducer;
