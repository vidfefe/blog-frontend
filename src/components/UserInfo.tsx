import { Box, Typography } from "@mui/material";
import { FC } from "react";

interface UserInfoProps {
  user: {
    avatarUrl: string;
    fullName: string;
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
        {user?.avatarUrl && (
          <img
            src={user.avatarUrl}
            alt={user.fullName}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )}
        <Box>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            {user?.fullName}
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
