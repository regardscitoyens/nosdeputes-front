"use client";
import { styled, Theme } from "@mui/system";
import Chip, { chipClasses, ChipProps } from "@mui/material/Chip";

export type Status = "validated" | "review" | "refused" | "dropped";
interface StatusChipProps extends ChipProps {
  status?: Status;
}

function getColor(status: StatusChipProps["status"], theme: Theme) {
  switch (status) {
    case "validated":
      return theme.palette.success;
    case "review":
      return theme.palette.info;
    case "refused":
      return theme.palette.warning;
    case "dropped":
    default:
      return { main: theme.palette.grey[800], light: theme.palette.grey[100] };
  }
}

function StatusChip(props: StatusChipProps) {
  return <Chip icon={<div className="point" />} {...props} />;
}

const StyledStatusChip = styled(StatusChip, {
  shouldForwardProp: (prop) => prop !== "status",
  name: "StatusChip",
})(({ theme, status, size }) => {
  const color = getColor(status, theme);

  return {
    backgroundColor: color.light,
    color: color.main,
    height: 37,
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    borderRadius: 37 / 2,
    ...(size === "small" && {
      height: 26,
      borderRadius: 26 / 2,
    }),
    [`& .${chipClasses.label}`]: {
      paddingLeft: theme.spacing(1),
      paddingRight: 0,
    },
    [`& .${chipClasses.icon}`]: {
      margin: 0,
      width: 10,
      height: 10,
      borderRadius: "50%",
      backgroundColor: color.main,
      ...(size === "small" && {
        width: 8,
        height: 8,
      }),
    },
  };
});

export default StyledStatusChip;
