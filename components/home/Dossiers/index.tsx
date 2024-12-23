import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Dossiers from "./Dossiers";

export default function DossiersSection() {
  return (
    <Box
      sx={{
        maxWidth: 1088,
        margin: {
          xs: 1,
          md: 4,
          lg: "auto",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h2">Les derniers dossiers</Typography>
        <Button
          variant="text"
          component={Link}
          href="/dossiers/"
          endIcon={<ArrowForwardIcon />}
        >
          Tous les dossiers
        </Button>
      </Box>
      <React.Suspense>
        <Dossiers />
      </React.Suspense>
    </Box>
  );
}
