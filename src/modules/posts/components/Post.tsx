import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import {
  ArrowOutward,
  Delete,
  Edit,
  Visibility,
  Message,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import UserInfo from "../../../shared/components/ui/UserInfo";
import { AppDispatch } from "../../../app/store";
import { Post as PostType } from "../types";
import { showToast } from "../../../store/toastSlice";
import {
  useLikePostMutation,
  useRemovePostMutation,
  useUnlikePostMutation,
} from "../../../api/postsApi";

interface PostProps {
  post: PostType;
  children?: ReactNode;
  isFullPost: boolean;
  isEditable: boolean;
}

const Post: FC<PostProps> = ({ post, children, isFullPost, isEditable }) => {
  const {
    id,
    title,
    imageUrl,
    viewsCount,
    createdAt,
    user,
    tags,
    comments,
    likesCount: initialLikesCount,
    isLikedByMe: initiallyLiked,
  } = post;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [removePost, { isLoading }] = useRemovePostMutation();

  const [liked, setLiked] = useState(initiallyLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const [likePost, { isLoading: likeLoading }] = useLikePostMutation();
  const [unlikePost, { isLoading: unlikeLoading }] = useUnlikePostMutation();
  const togglingLike = likeLoading || unlikeLoading;

  const handleToggleLike = () => {
    if (liked) {
      unlikePost(id)
        .unwrap()
        .then(({ likesCount }) => {
          setLiked(false);
          setLikesCount(likesCount);
        })
        .catch(() => {});
    } else {
      likePost(id)
        .unwrap()
        .then(({ likesCount }) => {
          setLiked(true);
          setLikesCount(likesCount);
        })
        .catch(() => {});
    }
  };

  const handleRemovePost = () => {
    removePost(id)
      .unwrap()
      .then(() => {
        dispatch(
          showToast({
            message: "Post deleted successfully!",
            severity: "success",
          })
        );
        navigate("/", {
          replace: true,
        });
      })
      .catch(() => {});
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
            <Link to={`/post/${id}/edit`}>
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
              disabled={isLoading}
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
            <Box
              component="img"
              src={imageUrl}
              alt={title}
              style={{
                width: "100%",
                height: isFullPost ? "70vh" : 300,
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <UserInfo
              user={user}
              createdAt={createdAt}
              isImagePresent={!!imageUrl}
            />
          </Box>
        ) : (
          <UserInfo
            user={user}
            createdAt={createdAt}
            isImagePresent={!!imageUrl}
          />
        )}

        <Box
          sx={{
            px: 2,
            pt: imageUrl ? 2 : 0,
            pb: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="h6">{title}</Typography>

          {children && (
            <Typography component="div" variant="body2">
              {children}{" "}
            </Typography>
          )}

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
              <Link to={`/post/${id}`}>
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
                {comments.length}
              </Typography>
              <IconButton
                size="small"
                onClick={handleToggleLike}
                disabled={togglingLike}
                sx={{ p: 0.1 }}
              >
                {liked ? (
                  <Favorite fontSize="small" color="error" />
                ) : (
                  <FavoriteBorder fontSize="small" color="secondary" />
                )}
              </IconButton>
              <Typography variant="body2" color="secondary">
                {likesCount}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </>
  );
};

export default Post;
