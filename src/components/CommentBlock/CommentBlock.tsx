import { FC, Fragment } from "react";
import SideBlock from "../SideBlock";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Comment } from "../../types";
import CommentBlockSkeleton from "./Skeleton";
import AddComment from "./AddComment";

interface CommentBlockProps {
  comments: Comment[];
  isLoading: boolean;
}

export const CommentBlock: FC<CommentBlockProps> = ({
  isLoading,
  comments,
}) => {
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
          comments.map((comment, index) => (
            <Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={comment.user.fullName}
                    src={comment.user.avatarUrl}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2" color="text.primary">
                      {comment.user.fullName}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {comment.text}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </Fragment>
          ))
        )}
      </List>
      <AddComment />
    </SideBlock>
  );
};
