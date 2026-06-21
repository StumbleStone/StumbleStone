import React from "react";
import {createRoot} from "react-dom/client";
import { AppThemeProvider } from "@stumblestone/components";
import {App} from "./App";
import { globalStyles, graveyardTheme } from "./theme";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Missing root container");
}

createRoot(container).render(
  <React.StrictMode>
    <AppThemeProvider
      themes={[graveyardTheme]}
      activeThemeName={graveyardTheme.name}
      globalStyles={globalStyles}
    >
      <App />
    </AppThemeProvider>
  </React.StrictMode>
);
