import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          This page was not found
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Go to Home Page
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
