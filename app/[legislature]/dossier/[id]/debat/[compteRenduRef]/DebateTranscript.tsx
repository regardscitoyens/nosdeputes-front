"use client";

import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { SpeakingTime } from "@/components/folders/SpeakingTime";
import { DebateTimeline } from "@/app/[legislature]/dossier/[id]/debat/[compteRenduRef]/DebateTimeline";

import { ClockMovingIcon } from "@/icons/ClockMovingIcon";
import { useTheme } from "@mui/material";
import { WORDS_PER_MINUTES } from "@/components/const";
import { Acteur, Organe, Paragraphe } from "@prisma/client";

export type ParagrapheWithActeur = Paragraphe & {
  acteurRef: null | (Acteur & { groupeParlementaire: null | Organe });
};

function getWordsPerGroup(paragraphs: ParagrapheWithActeur[]) {
  const groups: Record<
    string,
    {
      count: number;
      color: string;
      libelleShort: string;
    }
  > = {};
  paragraphs.forEach((paragraphe) => {
    const { codeGrammaire, acteurRef, texte } = paragraphe;

    if (
      codeGrammaire !== "PAROLE_GENERIQUE" ||
      !acteurRef ||
      !acteurRef.groupeParlementaire ||
      !acteurRef.groupeParlementaireUid ||
      !texte
    ) {
      return;
    }
    const groupeParlementaire = acteurRef.groupeParlementaire;

    const wordCount = texte.split(" ").length;
    if (groups[groupeParlementaire.uid]) {
      groups[groupeParlementaire.uid].count += wordCount;
    } else {
      groups[groupeParlementaire.uid] = {
        count: wordCount,
        color: groupeParlementaire.couleurAssociee ?? "",
        libelleShort: groupeParlementaire.libelleAbrege,
      };
    }
  });

  return groups;
}

type DebateTranscriptProps = {
  paragraphs: ParagrapheWithActeur[];
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
