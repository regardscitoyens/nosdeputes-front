import { Raleway } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const raleway = Raleway({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          border: "solid red 5px",
        }),
      },
    },
  },
});

export default theme;
