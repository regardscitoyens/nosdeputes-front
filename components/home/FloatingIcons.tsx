import Box from "@mui/material/Box";
import * as React from "react";

const MAX_WIDTH = 1088;

type IconProps = {
  radius?: number;
  emoji?: string;
  imageUrl?: string;
  limit: "xs" | "sm" | "md" | "lg";
  sx?: React.CSSProperties;
};

function Icon(props: IconProps) {
  const { radius = 20, emoji, imageUrl, sx, limit } = props;
  return (
    <Box
      sx={{
        width: 2 * radius,
        height: 2 * radius,
        borderRadius: radius,
        position: "absolute",
        backgroundColor: "#fff",
        border: "solid gray 1px",
        textAlign: "center",
        lineHeight: `${2 * radius}px`,
        fontSize: radius - 2,
        ...(imageUrl && {
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: "center",
        }),
        display: { xs: "none", [limit]: "initial", lg: "initial" },
        ...sx,
      }}
    >
      {emoji || null}
    </Box>
  );
}

export default function FloatingIcons() {
  return (
    <React.Fragment>
      <Icon
        radius={20}
        sx={{ top: 425, left: `${100 * (171 / MAX_WIDTH)}%` }}
        emoji="🇫🇷"
        limit="sm"
      />
      <Icon
        radius={20}
        sx={{ top: 93, left: `${100 * (162 / MAX_WIDTH)}%` }}
        emoji="💰"
        limit="md"
      />
      <Icon
        radius={14}
        sx={{ top: 497, left: `${100 * (362 / MAX_WIDTH)}%` }}
        emoji="🚍"
        limit="xs"
      />
      <Icon
        radius={21}
        sx={{ top: 182, left: `${100 * (250 / MAX_WIDTH)}%` }}
        emoji="🌱"
        limit="md"
      />
      <Icon
        radius={27}
        sx={{ top: 335, left: `${100 * (132 / MAX_WIDTH)}%` }}
        emoji="🇫🇷"
        limit="md"
      />
      <Icon
        radius={26}
        sx={{ top: 538, left: `${100 * (721 / MAX_WIDTH)}%` }}
        emoji="💰"
        limit="xs"
      />
      <Icon
        radius={40}
        sx={{ top: 295, left: `${100 * (965 / MAX_WIDTH)}%` }}
        emoji="🚍"
        limit="md"
      />
      <Icon
        radius={20}
        sx={{ top: 422, left: `${100 * (882 / MAX_WIDTH)}%` }}
        emoji="🌱"
        limit="sm"
      />
      <Icon
        radius={32}
        sx={{ top: 145, left: `${100 * (989 / MAX_WIDTH)}%` }}
        emoji="🇫🇷"
        limit="md"
      />
    </React.Fragment>
  );
}
