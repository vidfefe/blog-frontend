import { Box, Paper, Skeleton, Stack } from "@mui/material";
import { FC } from "react";

interface PostSkeletonProps {
  isFullPost?: boolean;
}

const PostSkeleton: FC<PostSkeletonProps> = ({ isFullPost }) => {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Skeleton variant="rectangular" height={isFullPost ? "70vh" : 300} />

      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        <Skeleton variant="text" width="50%" height={28} />
        <Skeleton variant="text" width="80%" height={20} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            flexWrap: "wrap",
          }}
        >
          <Skeleton variant="text" width={40} height={16} />
          <Skeleton variant="text" width={30} height={16} />
          <Skeleton variant="text" width={35} height={16} />
        </Box>

        <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Skeleton variant="text" width={80} height={16} />
            <Skeleton variant="circular" width={16} height={16} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton variant="text" width={30} height={16} />
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};

export default PostSkeleton;
