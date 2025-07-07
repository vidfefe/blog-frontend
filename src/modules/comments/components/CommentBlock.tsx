import { FC, Fragment, useState } from "react";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import SideBlock from "../../../shared/components/layout/SideBlock";
import CommentBlockSkeleton from "./Skeleton";
import { Comment } from "../types";
import {
  useAddCommentMutation,
  useRemoveCommentMutation,
  useUpdateCommentMutation,
} from "../../../api/commentApi";
import { selectCurrentUser } from "../../../store/authSlice";
import { showToast } from "../../../store/toastSlice";
import { AppDispatch } from "../../../app/store";
import { CommentForm } from "./CommentForm";

interface CommentBlockProps {
  comments: Comment[];
  isLoading: boolean;
}

export const CommentBlock: FC<CommentBlockProps> = ({
  isLoading,
  comments,
}) => {
  const { id: postId } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const [editingId, setEditingId] = useState<string | null>(null);

  const [addComment, { isLoading: isAdding }] = useAddCommentMutation();
  const [updateComment, { isLoading: isUpdating }] = useUpdateCommentMutation();
  const [removeComment, { isLoading: isRemoving }] = useRemoveCommentMutation();

  const userData = useSelector(selectCurrentUser);

  const handleAdd = (text: string) => {
    if (!postId) return Promise.reject();
    return addComment({ postId, text })
      .unwrap()
      .then(() => {
        dispatch(
          showToast({
            message: "Comment published successfully!",
            severity: "success",
          })
        );
      })
      .catch(() => {});
  };

  const handleEdit = (text: string) => {
    if (!postId || !editingId) return Promise.reject();
    return updateComment({
      postId,
      commentId: editingId,
      text,
    })
      .unwrap()
      .then(() => {
        dispatch(
          showToast({
            message: "Comment updated successfully!",
            severity: "success",
          })
        );
      })
      .catch(() => {})
      .finally(() => {
        setEditingId(null);
      });
  };

  const handleRemove = async (commentId: string) => {
    if (!postId) return;
    removeComment({ postId, commentId })
      .unwrap()
      .then(() => {
        dispatch(
          showToast({
            message: "Comment deleted successfully!",
            severity: "success",
          })
        );
      })
      .catch(() => {});
  };

  return (
    <SideBlock title="Comments">
      <List>
        {isLoading ? (
          <CommentBlockSkeleton />
        ) : comments.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ px: 2, pb: 2 }}
          >
            There are no comments yet
          </Typography>
        ) : (
          comments.map((comment) => {
            const isAuthor = comment.user.id === userData?.id;
            const isEditing = editingId === comment.id;

            return (
              <Fragment key={comment.id}>
                {isEditing ? (
                  <CommentForm
                    avatarUrl={userData?.avatarUrl}
                    initialValue={comment.text}
                    isLoading={isUpdating}
                    onSubmit={handleEdit}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      isAuthor &&
                      !isAdding &&
                      !isUpdating &&
                      !isRemoving && (
                        <>
                          <IconButton
                            aria-label="Edit"
                            onClick={() => setEditingId(comment.id)}
                            disabled={isUpdating}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            onClick={() => handleRemove(comment.id)}
                            disabled={isRemoving}
                          >
                            <Delete />
                          </IconButton>
                        </>
                      )
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={comment.user.fullname}
                        src={comment.user.avatarUrl}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" color="text.primary">
                          {comment.user.fullname}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {comment.text}
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
                <Divider component="li" />
              </Fragment>
            );
          })
        )}
      </List>
      <CommentForm
        avatarUrl={userData?.avatarUrl}
        onSubmit={handleAdd}
        isLoading={isAdding}
        submitLabel="Send"
        placeholder="Write a comment..."
      />
    </SideBlock>
  );
};
