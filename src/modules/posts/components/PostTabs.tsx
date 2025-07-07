import { Tab, Tabs } from "@mui/material";
import { FC } from "react";

interface PostTabsProps {
  value: number;
  onChange: (value: number) => void;
}

export const PostTabs: FC<PostTabsProps> = ({ value, onChange }) => {
  return (
    <Tabs
      value={value}
      onChange={(_, value) => onChange(value)}
      aria-label="Post tabs"
    >
      <Tab label="New" />
      <Tab label="Popular" />
    </Tabs>
  );
};
