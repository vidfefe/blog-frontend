import { useEffect, useState } from "react";
import Post from "../components/Post/Post";
import { useParams } from "react-router";
import axios from "../axios";
import { PostType } from "../types";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import ReactMarkDown from "react-markdown";
import { CommentBlock } from "../components/CommentBlock/CommentBlock";
import PostSkeleton from "../components/Post/Skeleton";
import { useDispatch } from "react-redux";
import { showToast } from "../store/slices/toastSlice";
import NotFound from "./NorFound";

const FullPost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<PostType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userData = useSelector((state: RootState) => state.auth.data);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          showToast({
            message: "Failed to find post",
            severity: "error",
          })
        );
        setIsLoading(false);
      });
  }, [id, dispatch]);

  if (!data && !isLoading) {
    return <NotFound />;
  }

  return (
    <Box sx={{ my: 5, display: "flex", flexDirection: "column", gap: 2 }}>
      {isLoading ? (
        <PostSkeleton />
      ) : (
        data && (
          <Post
            post={data}
            isFullPost={true}
            isEditable={userData?._id === data?.user?._id}
          >
            <ReactMarkDown children={data.text} />
          </Post>
        )
      )}
      <CommentBlock comments={data?.comments ?? []} isLoading={isLoading} />
    </Box>
  );
};

export default FullPost;
