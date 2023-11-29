import { Raleway } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { buttonClasses } from "@mui/material/Button";

const raleway = Raleway({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
    success: {
      light: "#DCF9D2",
      main: "#1F8E2C",
    },
    info: {
      light: "#C7F9F8",
      main: "#006C93",
    },
    warning: {
      light: "#FEE6D9",
      main: "#EF4444",
    },
    secondary: {
      main: "#E9ECEF",
      contrastText: "#495057",
    },
    grey: {
      900: "#171B1E",
      800: "#343A40",
      700: "#495057",
      600: "#868E96",
      500: "#ADB5BD",
      400: "#CED4DA",
      300: "#DEE2E6",
      200: "#E9ECEF",
      100: "#F1F3F5",
      50: "#F8F9FA",
    },
  },
  spacing: 8,
  typography: {
    fontFamily: raleway.style.fontFamily,
    fontWeightBold: 700,
    fontWeightRegular: 600,
    fontWeightLight: 400,
    h1: { fontSize: "1.602rem" },
    h2: { fontSize: "1.602rem" },
    h3: { fontSize: "1.424rem" },
    h4: { fontSize: "1.266rem" },
    subtitle1: { fontSize: "1.125rem" },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.889rem" },
    caption: { fontSize: "0.79rem" },
    allVariants: {
      color: "#171B1E",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          fontSize: 12,
          fontWeight: 700,
          textTransform: ownerState.color === "secondary" ? "none" : "inherit",
        }),
      },
    },
  },
});

export default theme;
