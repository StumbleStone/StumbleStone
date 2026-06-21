import { css } from "@emotion/react";
import type { AppTheme } from "@stumblestone/components";
import { baseTheme } from "@stumblestone/components";

export interface GraveyardThemeTokens {
  pageTopGlow: string;
  pageSideGlow: string;
  pageGradientStart: string;
  pageGradientEnd: string;
  heroGlow: string;
  heroMossGlow: string;
  eyebrowText: string;
  panelSurface: string;
  panelSurfaceStrong: string;
  cardSurface: string;
  panelText: string;
}

export type GraveyardTheme = AppTheme & {
  graveyard: GraveyardThemeTokens;
};

declare module "@emotion/react" {
  export interface Theme {
    graveyard: GraveyardThemeTokens;
  }
}

export const graveyardTheme: GraveyardTheme = {
  ...baseTheme,
  name: "graveyard-theme",
  colors: {
    ...baseTheme.colors,
    background: "#110d0c",
    surface: "#171210",
    surfaceAlt: "#211916",
    border: "rgba(243, 181, 126, 0.14)",
    text: "#f5ead8",
    textMuted: "#c9b8a3",
    accent: "#d98245",
    accentOrange: "#f3b57e",
    accentBlue: "#7ac7d4",
    accentPink: "#df8ea8",
    accentGreen: "#9cb77f",
    danger: "#ff8f8f",
    backdrop: "rgba(9, 7, 6, 0.78)",
  },
  button: {
    ...baseTheme.button,
    focusRingColor: "#f3b57e",
    tones: {
      ...baseTheme.button.tones,
      primary: {
        background: "#d98245",
        borderColor: "#d98245",
        boxShadow: "0 0 18px rgba(217, 130, 69, 0.32)",
        textColor: "#180f0a",
      },
      secondary: {
        background: "rgba(255, 255, 255, 0.02)",
        borderColor: "rgba(243, 181, 126, 0.18)",
        boxShadow: "none",
        textColor: "#f5ead8",
      },
    },
  },
  input: {
    ...baseTheme.input,
    background: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(243, 181, 126, 0.16)",
    focusBorderColor: "#f3b57e",
    focusBoxShadow: "0 0 0 3px rgba(243, 181, 126, 0.18)",
    placeholderColor: "rgba(201, 184, 163, 0.66)",
    textColor: "#f5ead8",
  },
  graveyard: {
    pageTopGlow: "rgba(217, 130, 69, 0.18)",
    pageSideGlow: "rgba(156, 183, 127, 0.12)",
    pageGradientStart: "#0b0807",
    pageGradientEnd: "#140f0d",
    heroGlow: "rgba(243, 181, 126, 0.16)",
    heroMossGlow: "rgba(156, 183, 127, 0.12)",
    eyebrowText: "#f3b57e",
    panelSurface: "rgba(32, 24, 20, 0.78)",
    panelSurfaceStrong: "rgba(28, 20, 17, 0.9)",
    cardSurface: "rgba(24, 18, 15, 0.86)",
    panelText: "rgba(245, 234, 216, 0.76)",
  },
};

export const globalStyles = css`
  :root {
    color-scheme: dark;
    font-family:
      "Iowan Old Style",
      "Palatino Linotype",
      "Book Antiqua",
      Georgia,
      serif;
    background: ${graveyardTheme.colors.background};
  }

  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    min-height: 100%;
  }

  body {
    background:
      radial-gradient(circle at top, ${graveyardTheme.graveyard.pageTopGlow}, transparent 32%),
      radial-gradient(circle at 84% 14%, ${graveyardTheme.graveyard.pageSideGlow}, transparent 22%),
      linear-gradient(
        180deg,
        ${graveyardTheme.graveyard.pageGradientStart} 0%,
        ${graveyardTheme.graveyard.pageGradientEnd} 100%
      );
    color: ${graveyardTheme.colors.text};
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  a {
    color: inherit;
  }
`;
