"use client";
import { styled, Theme } from "@mui/system";
import Chip, { chipClasses, ChipProps } from "@mui/material/Chip";

interface StatusChipProps extends ChipProps {
  status: "validated" | "review" | "refused" | "dropped";
}

function getColor(status: StatusChipProps["status"], theme: Theme) {
  if (status === "validated") {
    return theme.palette.success;
  }
  if (status === "review") {
    return theme.palette.info;
  }
  if (status === "dropped") {
    return theme.palette.warning;
  }
  return { main: theme.palette.grey[800], light: theme.palette.grey[100] };
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
      color: theme.palette.grey[900],
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
