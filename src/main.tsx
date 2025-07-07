import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import { theme } from "./theme.ts";
import { store } from "./app/store.ts";
import App from "./app/App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <CssBaseline>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </CssBaseline>
);
