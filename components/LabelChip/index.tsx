"use client";
import { styled } from "@mui/system";
import Chip, { chipClasses, ChipProps } from "@mui/material/Chip";
import BudgetIcon from "@/icons/BudgetIcon";

function LabelChip(props: ChipProps) {
  return (
    <Chip
      icon={<BudgetIcon />}
      variant="outlined"
      deleteIcon={<svg
        width="12"
        height="13"
        viewBox="0 0 12 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.17269 4.98038L6.6525 6.5L8.17269 8.01961C8.21558 8.0625 8.24959 8.1134 8.2728 8.16943C8.29601 8.22546 8.30795 8.28551 8.30795 8.34615C8.30795 8.4068 8.29601 8.46685 8.2728 8.52287C8.24959 8.5789 8.21558 8.62981 8.17269 8.67269C8.12981 8.71557 8.0789 8.74959 8.02288 8.77279C7.96685 8.796 7.9068 8.80795 7.84616 8.80795C7.78551 8.80795 7.72546 8.796 7.66943 8.77279C7.61341 8.74959 7.5625 8.71557 7.51962 8.67269L6 7.1525L4.48039 8.67269C4.4375 8.71557 4.3866 8.74959 4.33057 8.77279C4.27454 8.796 4.21449 8.80795 4.15385 8.80795C4.0932 8.80795 4.03315 8.796 3.97713 8.77279C3.9211 8.74959 3.87019 8.71557 3.82731 8.67269C3.78443 8.62981 3.75041 8.5789 3.7272 8.52287C3.704 8.46685 3.69205 8.4068 3.69205 8.34615C3.69205 8.28551 3.704 8.22546 3.7272 8.16943C3.75041 8.1134 3.78443 8.0625 3.82731 8.01961L5.3475 6.5L3.82731 4.98038C3.74071 4.89378 3.69205 4.77632 3.69205 4.65385C3.69205 4.53137 3.74071 4.41391 3.82731 4.32731C3.91391 4.2407 4.03137 4.19205 4.15385 4.19205C4.27632 4.19205 4.39378 4.2407 4.48039 4.32731L6 5.8475L7.51962 4.32731C7.5625 4.28443 7.61341 4.25041 7.66943 4.2272C7.72546 4.20399 7.78551 4.19205 7.84616 4.19205C7.9068 4.19205 7.96685 4.20399 8.02288 4.2272C8.0789 4.25041 8.12981 4.28443 8.17269 4.32731C8.21558 4.37019 8.24959 4.4211 8.2728 4.47712C8.29601 4.53315 8.30795 4.5932 8.30795 4.65385C8.30795 4.71449 8.29601 4.77454 8.2728 4.83057C8.24959 4.88659 8.21558 4.9375 8.17269 4.98038ZM12 6.5C12 7.68669 11.6481 8.84672 10.9888 9.83342C10.3295 10.8201 9.39246 11.5891 8.2961 12.0433C7.19975 12.4974 5.99335 12.6162 4.82946 12.3847C3.66557 12.1532 2.59648 11.5818 1.75736 10.7426C0.918247 9.90352 0.346802 8.83443 0.115291 7.67054C-0.11622 6.50666 0.00259971 5.30025 0.456725 4.2039C0.910851 3.10754 1.67989 2.17047 2.66658 1.51118C3.65328 0.851894 4.81331 0.5 6 0.5C7.59078 0.50168 9.11593 1.13436 10.2408 2.25921C11.3656 3.38407 11.9983 4.90922 12 6.5ZM11.0769 6.5C11.0769 5.49588 10.7792 4.51431 10.2213 3.67941C9.66345 2.84452 8.87054 2.19379 7.94286 1.80953C7.01517 1.42527 5.99437 1.32473 5.00954 1.52063C4.02472 1.71652 3.1201 2.20005 2.41008 2.91007C1.70006 3.62009 1.21653 4.52471 1.02063 5.50954C0.824737 6.49437 0.925277 7.51517 1.30954 8.44285C1.6938 9.37054 2.34452 10.1634 3.17941 10.7213C4.01431 11.2792 4.99588 11.5769 6 11.5769C7.34602 11.5754 8.63646 11.04 9.58824 10.0882C10.54 9.13646 11.0754 7.84601 11.0769 6.5Z"
          fill="#171B1E"
        />
      </svg>}
      {...props}
    />
  );
}

const StyledLabelChip = styled(LabelChip, {
  shouldForwardProp: (prop) => prop !== "status",
  name: "LabelChip",
})(({ theme, size }) => {
  return {
    height: 37,
    borderRadius: 37 / 2,
    ...(size === "small" && {
      height: 26,
      borderRadius: 26 / 2,
    }),
    [`& .${chipClasses.icon}`]: {
      width: 16,
      height: 16,
      marginRight: -theme.spacing(size === "small" ? 1 : 1.5),
      marginLeft: theme.spacing(size === "small" ? 1 : 1.5),
      ...(size === "small" && {
        width: 14,
        height: 14,
      }),
    },
    [`& .${chipClasses.deleteIcon}`]: {
      color: "#171B1E",
      marginRight: theme.spacing(size === "small" ? 1 : 1.5),
      marginLeft: -theme.spacing(size === "small" ? 1 : 1.5),
    },
  };
});

export default StyledLabelChip;