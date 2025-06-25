import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { FC, JSX } from "react";
import {
  ArrowOutward,
  Delete,
  Edit,
  Visibility,
  Message,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import { PostType } from "../../types";
import UserInfo from "../UserInfo";
import { useDispatch } from "react-redux";
import { fetchRemovePost } from "../../store/slices/postsSlice";
import { AppDispatch } from "../../store/store";
import { showToast } from "../../store/slices/toastSlice";

interface PostProps {
  post: PostType;
  children?: JSX.Element;
  isFullPost: boolean;
  isEditable: boolean;
}

const Post: FC<PostProps> = ({ post, children, isFullPost, isEditable }) => {
  const {
    _id,
    title,
    imageUrl,
    viewsCount,
    createdAt,
    user,
    tags,
    commentsCount,
  } = post;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRemovePost = () => {
    try {
      dispatch(fetchRemovePost(_id as string));
      dispatch(
        showToast({
          message: "Post deleted successfully!",
          severity: "success",
        })
      );
      navigate("/");
    } catch (err) {
      console.warn(err);
      dispatch(
        showToast({
          message: "Failed to delete post",
          severity: "error",
        })
      );
    }
  };

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {isEditable && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
              display: "flex",
              gap: 1,
            }}
          >
            <Link to={`/posts/${_id}/edit`}>
              <IconButton
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,1)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.6)",
                  },
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Link>

            <IconButton
              onClick={handleRemovePost}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,1)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.6)",
                },
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        )}

        {imageUrl ? (
          <Box
            sx={{
              position: "relative",
            }}
          >
            <img
              src={`http://localhost:8000${imageUrl}`}
              alt="Post image"
              style={{
                width: "100%",
                height: isFullPost ? "auto" : 300,
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <UserInfo
              user={user!}
              createdAt={createdAt!}
              isImagePresent={!!imageUrl}
            />
          </Box>
        ) : (
          <UserInfo
            user={user!}
            createdAt={createdAt!}
            isImagePresent={!!imageUrl}
          />
        )}

        <Box
          sx={{
            px: 2,
            paddingTop: imageUrl && 2,
            paddingBottom: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography variant="h6">{title}</Typography>

          {children && <Typography variant="body2">{children} </Typography>}

          {tags && tags.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                flexWrap: "wrap",
              }}
            >
              {tags?.map((tag, index) => (
                <Typography key={index} variant="caption" color="secondary">
                  #{tag}
                </Typography>
              ))}
            </Box>
          )}

          <Stack sx={{ justifyContent: "space-between" }}>
            {!isFullPost && (
              <Link to={`/posts/${_id}`}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    "& svg, p": {
                      transition: "transform 0.3s ease, color 0.3s ease",
                    },
                    "&:hover p": {
                      color: "text.secondary",
                    },
                    "&:hover svg": {
                      transform: "translate(2px, -2px)",
                      color: "text.secondary",
                    },
                  }}
                >
                  <Typography variant="body2">Read post</Typography>
                  <ArrowOutward fontSize="small" />
                </Box>
              </Link>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Visibility fontSize="small" color="secondary" />
              <Typography variant="body2" color="secondary">
                {viewsCount}
              </Typography>
              <Message fontSize="small" color="secondary" />
              <Typography variant="body2" color="secondary">
                {commentsCount}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </>
  );
};

export default Post;
