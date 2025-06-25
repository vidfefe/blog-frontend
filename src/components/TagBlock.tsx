import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import SideBlock from "./SideBlock";
import { Tag } from "@mui/icons-material";
import { FC } from "react";

interface TagBlockProps {
  tags: string[];
  isLoading: boolean;
}

const TagBlock: FC<TagBlockProps> = ({ tags, isLoading }) => {
  return (
    <SideBlock title="Last tags">
      <List>
        {(isLoading ? [...Array(5)] : tags).map((tag, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Tag />
              </ListItemIcon>
              {isLoading ? (
                <Skeleton width="50%" />
              ) : (
                <ListItemText primary={tag} />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </SideBlock>
  );
};

export default TagBlock;
