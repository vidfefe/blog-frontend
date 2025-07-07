import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Skeleton,
  Divider,
} from "@mui/material";
import { Fragment } from "react";

const CommentBlockSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText
              primary={<Skeleton width="20%" height={20} />}
              secondary={<Skeleton width="50%" height={24} />}
            />
          </ListItem>
          <Divider component="li" />
        </Fragment>
      ))}
    </>
  );
};

export default CommentBlockSkeleton;
