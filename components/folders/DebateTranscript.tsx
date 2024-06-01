"use client";

import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { SpeakingTime } from "@/components/folders/SpeakingTime";
import { DebateTimeline } from "@/components/folders/DebateTimeline";

import { ClockMovingIcon } from "@/icons/ClockMovingIcon";
import { useTheme } from "@mui/material";

type DebateTranscriptProps = {
  // TODO: Define type from prisma (to generate)
  paragraphs: any[];
};
export const DebateTranscript = (props: DebateTranscriptProps) => {
  const { paragraphs } = props;

  const theme = useTheme();

  return (
    <>
      <Stack spacing={1}>
        <Typography variant="h4">
          Retranscription écrite de la séance en hémicycle du Jeudi 22 Juin 2023
          de 9h30.
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ClockMovingIcon fontSize="inherit" fill={theme.palette.grey[900]} />
          <Typography
            variant="caption"
            fontWeight="light"
            sx={{ color: theme.palette.grey[700] }}
          >
            Temps de lecture : 18 minutes
          </Typography>
        </Stack>
      </Stack>
      <Accordion
        elevation={0}
        disableGutters
        defaultExpanded
        variant="outlined"
      >
        <AccordionSummary
          aria-controls="additional-info-content"
          id="additional-info-header"
        >
          <Typography>Temps de parole par groupe</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SpeakingTime />
        </AccordionDetails>
      </Accordion>
      <DebateTimeline paragraphs={paragraphs} />
    </>
  );
};
