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
import { WORDS_PER_MINUTES } from "../const";

function getWordsPerGroup(paragraphs: any[]) {
  const groups: Record<
    string,
    {
      count: number;
      group_color: string;
      group_libelle_short: string;
    }
  > = {};
  paragraphs.forEach(
    ({
      codeGrammaire,
      groupeParlementaireUid,
      group_color,
      group_libelle_short,
      texte,
    }) => {
      if (
        codeGrammaire !== "PAROLE_GENERIQUE" ||
        !groupeParlementaireUid
      ) {
        return;
      }

      const wordCount = texte.split(" ").length;
      if (groups[groupeParlementaireUid]) {
        groups[groupeParlementaireUid].count += wordCount;
      } else {
        groups[groupeParlementaireUid] = {
          count: wordCount,
          group_color,
          group_libelle_short,
        };
      }
    }
  );

  return groups;
}

type DebateTranscriptProps = {
  // TODO: Define type from prisma (to generate)
  paragraphs: any[];
  wordsCounts: Record<string, number>;
  title: string;
};
export const DebateTranscript = (props: DebateTranscriptProps) => {
  const { paragraphs, wordsCounts, title } = props;

  const wordsPerGroup = React.useMemo(
    () => getWordsPerGroup(paragraphs),
    [paragraphs]
  );

  const durationEstimation = Math.round(
    Object.values(wordsCounts).reduce((acc, wordCount) => acc + wordCount, 0) /
      WORDS_PER_MINUTES
  );
  const theme = useTheme();

  return (
    <>
      <Stack spacing={1}>
        <Typography variant="h4">{title}</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ClockMovingIcon fontSize="inherit" fill={theme.palette.grey[900]} />
          <Typography
            variant="caption"
            fontWeight="light"
            sx={{ color: theme.palette.grey[700] }}
          >
            Temps de lecture : {durationEstimation} minute
            {durationEstimation > 1 ? "s" : ""}
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
          <SpeakingTime wordsPerGroup={wordsPerGroup} />
        </AccordionDetails>
      </Accordion>
      <DebateTimeline paragraphs={paragraphs} />
    </>
  );
};
