"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1B7B7E",
      light: "#8FD4C8",
      dark: "#146062",
    },
    secondary: {
      main: "#F0A0B0",
      light: "#FADCE3",
      dark: "#D4788A",
    },
    background: {
      default: "#FDF9F0",
      paper: "#FFFFFF",
    },
    info: {
      main: "#B8E4F0",
      light: "#D6F0F8",
      dark: "#7CC8DC",
    },
    warning: {
      main: "#F5EBC8",
      light: "#FAF4E0",
      dark: "#E8D89A",
    },
    success: {
      main: "#8FD4C8",
      light: "#B5E4DB",
      dark: "#5CB8A8",
    },
    text: {
      primary: "#2D2D2D",
      secondary: "#6B6B6B",
    },
  },
  typography: {
    fontFamily: "var(--font-fredoka), var(--font-mitr), Arial, sans-serif",
    h1: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      letterSpacing: "0.02em",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 24,
          padding: "10px 28px",
          fontSize: "1rem",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #1B7B7E 0%, #8FD4C8 100%)",
          boxShadow: "0 4px 15px rgba(27, 123, 126, 0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #146062 0%, #6BC4B4 100%)",
            boxShadow: "0 6px 20px rgba(27, 123, 126, 0.4)",
          },
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #F0A0B0 0%, #FADCE3 100%)",
          color: "#2D2D2D",
          boxShadow: "0 4px 15px rgba(240, 160, 176, 0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #D4788A 0%, #F0C0CE 100%)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 16,
          },
        },
      },
    },
  },
});

export default theme;
