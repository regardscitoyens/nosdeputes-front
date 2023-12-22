import { Raleway } from "next/font/google";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { createTheme } from "@mui/material/styles";
import { MinusIcon } from "@/icons/MinusIcon";
import { PlusIcon } from "@/icons/PlusIcon";
import type {} from "@mui/lab/themeAugmentation";

const AccordionIcon = (props: SvgIconProps) => (
  <>
    <MinusIcon {...props} className="minus-icon" />
    <PlusIcon {...props} className="plus-icon" />
  </>
);

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
    primary: {
      main: "#171B1E",
      contrastText: "white",
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

    h1: { fontSize: "1.802rem", lineHeight: "2.7rem" },
    h2: { fontSize: "1.602rem", lineHeight: "2.4rem" },
    h3: { fontSize: "1.424rem", lineHeight: "2.136rem" },
    h4: { fontSize: "1.266rem", lineHeight: "1.899rem" },
    subtitle1: { fontSize: "1.125rem", lineHeight: "1.687rem" },
    body1: { fontSize: "1rem", lineHeight: "1.5rem" },
    body2: { fontSize: "0.889rem", lineHeight: "1.333rem" },
    caption: { fontSize: "0.79rem", lineHeight: "1.185rem" },
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
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          ":hover": {
            backgroundColor: "#F8F9FA",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 2,
          backgroundColor: "#171B1E",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          color: "#171B1E",
          "&.Mui-selected": {
            color: "#171B1E",
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: "4px",
          backgroundColor:
            ownerState.color === "secondary" ? "#F8F9FA" : "#FFFFFF",
          "&:before": {
            display: "none",
          },
        }),
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: ownerState.expanded ? "4px 4px 0px 0px" : "4px",
          ...(ownerState.expanded
            ? { ["& .plus-icon"]: { display: "none" } }
            : { ["& .minus-icon"]: { display: "none" } }),
        }),
      },
      defaultProps: {
        expandIcon: <AccordionIcon sx={{ fontSize: 10 }} />,
      },
    },
    MuiCollapse: {
      styleOverrides: {
        root: {
          borderRadius: " 0px 0px 4px 4px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "#F8F9FA",
          "& .MuiInputBase-input": {
            padding: "4px 32px 4px 8px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        },
      },
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          marginLeft: "auto",
          marginRight: "auto",
        },
      },
    },
  },
});

export default theme;
