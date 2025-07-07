import { Post } from "../modules/posts/types";
import { api } from "./api";

export interface PostPayload {
  title: string;
  tags: string[];
  text: string;
  imageUrl: string | null;
}

export interface PostsResponse {
  posts: Post[];
  totalPages: number;
  currentPage: number;
}

export const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchPosts: build.query<
      PostsResponse,
      { sort: "new" | "popular"; page: number; limit?: number }
    >({
      query: ({ sort, page, limit = 4 }) => {
        const params = new URLSearchParams({
          sort,
          page: page.toString(),
          limit: limit.toString(),
        });
        return `/posts?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.posts.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    fetchPost: build.query<Post, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Post", id }],
    }),
    createPost: build.mutation<Post, PostPayload>({
      query: (body) => ({ url: "/posts", method: "POST", body }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    updatePost: build.mutation<Post, { id: string; body: PostPayload }>({
      query: ({ id, body }) => ({ url: `/posts/${id}`, method: "PATCH", body }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Post", id },
        { type: "Posts", id: "LIST" },
      ],
    }),
    removePost: build.mutation<void, string>({
      query: (id) => ({ url: `/posts/${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Post", id },
        { type: "Posts", id: "LIST" },
      ],
    }),
    fetchTags: build.query<string[], void>({
      query: () => "/tags",
      providesTags: [{ type: "Tags", id: "LIST" }],
    }),
    likePost: build.mutation<{ likesCount: number }, string>({
      query: (id) => ({ url: `/posts/${id}/like`, method: "PUT" }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Post", id },
        { type: "Posts", id: "LIST" },
      ],
    }),
    unlikePost: build.mutation<{ likesCount: number }, string>({
      query: (id) => ({ url: `/posts/${id}/like`, method: "DELETE" }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Post", id },
        { type: "Posts", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useFetchPostsQuery,
  useFetchPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useRemovePostMutation,
  useFetchTagsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} = postsApi;
