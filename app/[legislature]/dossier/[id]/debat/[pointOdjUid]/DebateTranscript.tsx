"use client";

import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { SpeakingTime } from "@/components/folders/SpeakingTime";
import { DebateTimeline } from "@/app/[legislature]/dossier/[id]/debat/[pointOdjUid]/DebateTimeline";

import { ClockMovingIcon } from "@/icons/ClockMovingIcon";
import { useTheme } from "@mui/material";
import { WORDS_PER_MINUTES } from "@/components/const";
import { Acteur, Organe, Paragraphe } from "@prisma/client";
import { getOrgane } from "@/data/getOrgane";

function getWordsPerActeur(paragraphes: Paragraphe[]) {
  const wordsPerActeur: Record<string, number> = {};
  paragraphes.forEach((paragraphe) => {
    const { codeGrammaire, acteurRefUid, texte } = paragraphe;

    if (codeGrammaire !== "PAROLE_GENERIQUE" || !acteurRefUid || !texte) {
      return;
    }

    const wordCount = texte.split(" ").length;
    if (wordsPerActeur[acteurRefUid]) {
      wordsPerActeur[acteurRefUid] += wordCount;
    } else {
      wordsPerActeur[acteurRefUid] = wordCount;
    }
  });

  return wordsPerActeur;
}

type DebateTranscriptProps = {
  paragraphes: Paragraphe[];
  wordsCounts: Record<string, number>;
  title: string;
};
export const DebateTranscript = (props: DebateTranscriptProps) => {
  const { paragraphes, wordsCounts, title } = props;

  const acteurRequested = React.useRef<Record<string, boolean>>({});
  const groupRequested = React.useRef<Record<string, boolean>>({});
  const [acteurs, setActeurs] = React.useState<Record<string, Acteur | null>>(
    {}
  );
  const [groups, setGroups] = React.useState<Record<string, Organe | null>>({});

  const wordsPerActeur = React.useMemo(
    () => getWordsPerActeur(paragraphes),
    [paragraphes]
  );

  React.useEffect(() => {
    Object.keys(wordsPerActeur).forEach((acteurUid) => {
      if (!acteurRequested.current[acteurUid]) {
        acteurRequested.current[acteurUid] = true;
        fetch(`${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/acteurs/${acteurUid}`)
          .then((rep) => rep.json())
          .then(({ data }: { data: Acteur }) => {
            setActeurs((p) => ({ ...p, [acteurUid]: data }));

            const groupeParlementaireUid = data.groupeParlementaireUid;
            if (
              groupeParlementaireUid &&
              !groupRequested.current[groupeParlementaireUid]
            ) {
              groupRequested.current[groupeParlementaireUid] = true;
              getOrgane(groupeParlementaireUid)
                .then((group) =>
                  setGroups((p) =>
                    group === null
                      ? p
                      : { ...p, [groupeParlementaireUid]: group }
                  )
                )
                .catch(() => {
                  setGroups((p) => ({ ...p, [groupeParlementaireUid]: null }));
                });
            }
          })
          .catch(() => {
            setGroups((p) => ({ ...p, [acteurUid]: null }));
          });
      }
    });
  }, [wordsPerActeur]);

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
          {/* <SpeakingTime
            wordsPerActeur={wordsPerActeur}
            acteurs={acteurs}
            groups={groups}
          /> */}
        </AccordionDetails>
      </Accordion>
      <DebateTimeline
        paragraphes={paragraphes}
        acteurs={acteurs}
        groups={groups}
      />
    </>
  );
};
