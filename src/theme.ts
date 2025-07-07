import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    allVariants: {
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#54585e",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          paddingTop: "8px",
          paddingBottom: "8px",
        },
      },
    },
    MuiStack: {
      defaultProps: {
        direction: "row",
        spacing: 1,
        alignItems: "center",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: "inherit",
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
  },
});
