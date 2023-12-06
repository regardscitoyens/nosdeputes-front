import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ClockMovingIcon } from "@/icons/ClockMovingIcon";
import { MinusIcon } from "@/icons/MinusIcon";

import { useTheme } from "@mui/material";

export const DebateSummary = () => {
  const theme = useTheme();

  return (
    <Accordion elevation={0} disableGutters defaultExpanded color="secondary">
      <AccordionSummary
        expandIcon={<MinusIcon sx={{ fontSize: "10px" }} />}
        aria-controls="additional-info-content"
        id="additional-info-header"
      >
        <Typography>Sommaire</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2} pb={3}>
          <Box
            sx={{
              backgroundColor: theme.palette.grey[900],
              p: 1,
              borderRadius: 2,
            }}
          >
            <Typography color="white">Titre 1</Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <ClockMovingIcon sx={{ fontSize: "12px" }} fill="white" />
              <Typography color="white" variant="caption" fontWeight="light">
                1 minutes
              </Typography>
            </Stack>
          </Box>
          <Typography variant="body2">Titre 2</Typography>
          <Typography variant="body2">Titre 3</Typography>
          <Typography variant="body2">Titre 4</Typography>
        </Stack>
        <Typography variant="caption" fontWeight="light">
          Il s&apos;agit du sommaire concernant uniquement le dossier
          sélectionné ; pour accéder à l&apos;intégralité de la séance, veuillez
          cliquer ici
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
