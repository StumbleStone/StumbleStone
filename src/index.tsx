import React from "react";
import { createRoot } from "react-dom/client";
import { AppThemeProvider } from "@stumblestone/components";
import { createRefdownTheme } from "@stumblestone/refdown-ui";
import { bookinatorThemeFragment } from "@stumblestone/project-bookinator";
import { App } from "./App";
import { globalStyles, graveyardTheme } from "./theme";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Missing root container");
}

const appTheme = createRefdownTheme({
  name: graveyardTheme.name,
  base: graveyardTheme,
  legacyTheme: bookinatorThemeFragment,
  packageThemes: {
    bookinator: bookinatorThemeFragment,
  },
});

createRoot(container).render(
  <React.StrictMode>
    <AppThemeProvider
      themes={[appTheme]}
      activeThemeName={appTheme.name}
      globalStyles={globalStyles}
    >
      <App />
    </AppThemeProvider>
  </React.StrictMode>
);
