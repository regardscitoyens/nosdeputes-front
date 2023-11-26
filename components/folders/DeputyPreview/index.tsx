import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

const DeputyPreview = () => {
  const theme = useTheme();

  return (
    <Box
      p={1}
      sx={{
        borderRadius: 1,
        "&:hover": {
          bgcolor: "grey.50",
          cursor: "pointer",
        },
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar sx={{ bgcolor: theme.palette.grey[200] }} aria-label="recipe">
          TO
        </Avatar>
        <Stack direction="column">
          <Typography variant="caption" fontWeight="bold">
            David Fauster
          </Typography>
          <Typography variant="caption" fontWeight="light">
            REN
          </Typography>
          <Typography variant="caption" fontWeight="light">
            Info complémentaire
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DeputyPreview;
