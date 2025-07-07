import { FC } from "react";
import { Grid } from "@mui/material";

import PostSkeleton from "./Skeleton";
import Post from "./Post";
import { Post as PostType } from "../types";

interface PostsGridProps {
  posts: PostType[];
  isLoading: boolean;
  currentUserId?: string;
}

export const PostsGrid: FC<PostsGridProps> = ({
  posts,
  isLoading,
  currentUserId,
}) => {
  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {[...Array(4)].map((_, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index}>
            <PostSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid size={{ xs: 12, sm: 6 }} key={post.id}>
          <Post
            post={post}
            isFullPost={false}
            isEditable={currentUserId === post.user?.id}
          />
        </Grid>
      ))}
    </Grid>
  );
};
