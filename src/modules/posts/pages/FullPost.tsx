import { useParams } from "react-router";
import { Box } from "@mui/material";
import ReactMarkDown from "react-markdown";
import { useSelector } from "react-redux";

import Post from "../components/Post";
import { CommentBlock } from "../../comments/components/CommentBlock";
import PostSkeleton from "../components/Skeleton";
import NotFound from "../../../pages/NotFound";
import { useFetchPostQuery } from "../../../api/postsApi";
import { selectCurrentUser } from "../../../store/authSlice";

const FullPost = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const userData = useSelector(selectCurrentUser);
  const { data: post, isLoading, isError } = useFetchPostQuery(id ?? "");

  if (isLoading) {
    return (
      <Box sx={{ my: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <PostSkeleton isFullPost />
      </Box>
    );
  }

  if (isError || !post) {
    return <NotFound />;
  }

  return (
    <Box sx={{ my: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <Post
        post={post}
        isFullPost={true}
        isEditable={userData?.id === post.user?.id}
      >
        <ReactMarkDown children={post.text} />
      </Post>
      <CommentBlock comments={post.comments ?? []} isLoading={isLoading} />
    </Box>
  );
};

export default FullPost;
