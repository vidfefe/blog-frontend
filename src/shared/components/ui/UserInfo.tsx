import { Avatar, Box, Typography } from "@mui/material";
import { FC } from "react";

interface UserInfoProps {
  user: {
    avatarUrl: string;
    fullname: string;
  };
  createdAt: string;
  isImagePresent: boolean;
}

const UserInfo: FC<UserInfoProps> = ({ user, createdAt, isImagePresent }) => {
  return (
    <Box
      sx={{
        position: isImagePresent ? "absolute" : undefined,
        bottom: isImagePresent ? 0 : undefined,
        width: "100%",
        background: isImagePresent ? "rgba(255, 255, 255, 0.2)" : "transparent",
        backdropFilter: isImagePresent ? "blur(5px)" : "none",
        color: isImagePresent ? "#fff" : "inherit",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        borderTop: isImagePresent
          ? "1px solid rgba(255, 255, 255, 0.3)"
          : "none",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar
          src={user.avatarUrl}
          alt={user.fullname}
          sx={{ width: 40, height: 40 }}
        />

        <Box>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            {user.fullname}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {new Date(createdAt || "").toDateString()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserInfo;
