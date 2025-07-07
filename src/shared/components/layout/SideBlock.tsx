import { Paper, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

interface SideBlockProps {
  title: string;
  children: ReactNode;
}

const SideBlock: FC<SideBlockProps> = ({ title, children }) => {
  return (
    <Paper variant="outlined">
      <Typography variant="h6" sx={{ p: "15px 15px 0px 15px" }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

export default SideBlock;
