import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Acteur } from "@/repository/database";

export const DeputyPreview = ({
  acteur = { prenom: "David", nom: "Fauster" },
}: {
  acteur: Acteur;
}) => {
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
        <Avatar sx={{ bgcolor: "grey.200" }}>TO</Avatar>
        <Stack direction="column">
          <Typography variant="caption" fontWeight="bold">
            {acteur.prenom} {acteur.nom}
          </Typography>
          <Typography variant="caption" fontWeight="light">
            ?{/* A definir comment trouver le groupe politique */}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
