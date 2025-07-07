import { api } from "./api";
import { Comment } from "../modules/comments/types";

export const commentApi = api.injectEndpoints({
  endpoints: (build) => ({
    addComment: build.mutation<Comment, { postId: string; text: string }>({
      query: ({ postId, text }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: "Post", id: postId },
      ],
    }),
    updateComment: build.mutation<
      Comment,
      { postId: string; commentId: string; text: string }
    >({
      query: ({ postId, commentId, text }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: "PUT",
        body: { text },
      }),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: "Post", id: postId },
      ],
    }),
    removeComment: build.mutation<
      { success: boolean },
      { postId: string; commentId: string }
    >({
      query: ({ postId, commentId }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: "Post", id: postId },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddCommentMutation,
  useUpdateCommentMutation,
  useRemoveCommentMutation,
} = commentApi;
