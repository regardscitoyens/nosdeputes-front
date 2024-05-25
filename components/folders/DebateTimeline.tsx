"use client";

import React from "react";

import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Stack from "@mui/material/Stack";

// "ODJ_APPEL_DISCUSSION",
// "PAROLE_GENERIQUE",
// "TITRE_TEXTE_DISCUSSION",
// "SOUS_TITRE_TEXTE_DISCUSSION",
// "PRESENTATION_1_0",
// "DISC_GENERALE_1",
// "DISC_ARTICLES_1_1",
// "DISC_ARTICLES_2_4",
// "DISC_ARTICLES_1_2",
// "VOTE_ENS_PPR_S_1_10",
// "INTERRUPTION_1_10",
// "DISC_GENERALE_2_40",
// "DISC_ARTICLES_2_1",
// "DISC_ARTICLES_3_1",
// "DISC_ARTICLES_3_9_1",
// "DISC_ARTICLES_3_30",
// "VOTE_ENS_PPR_S_2_20",
// "VOTE_ENS_PPR_S_2_30",
// "VOTE_ENS_PPR_S_2_40",
// "VOTE_ENS_PPR_S_2_50",
// "REJET_ADT",
// "ADOP_ADTS",
// "ADOP_ADT",
// "SCRUT_PUB_ADT_1_6",
// "SCRUT_PUB_ADT_1_7",
// "SCRUT_PUB_ADT_1_8",
// "SCRUT_PUB_ADT_1_9",
// "DISC_ARTICLES_4_50",
// "RETRAIT_ADT",
// "SCRUT_PUB_ADT_1_2",
// "SCRUT_PUB_ADT_1_3",
// "SCRUT_PUB_ADT_1_4",
// "SCRUT_PUB_ADT_1_5",
// "SORT_ARTICLE_1_1",
// "SORT_SS_ADT_1_70",
// "SCRUT_SOUS_AMEND_1_6",
// "SCRUT_SOUS_AMEND_1_7",
// "SCRUT_SOUS_AMEND_1_8",
// "SCRUT_SOUS_AMEND_1_9",
// "SORT_SS_ADT_1_50",
export const DebateTimeline = ({ paragraphs }) => {
  console.log(new Set(paragraphs.map((x) => x.codeGrammaire)));
  return (
    <div>
      {paragraphs
        .sort((a, b) => a.ordreAbsoluSeance - b.ordreAbsoluSeance)
        .map(({ uid, texte, codeGrammaire, ...other }) => (
          <div onClick={() => console.log(other)} style={{ marginTop: 30 }}>
            {other.acteurRef && (
              <p>
                {other.prenom} {other.nom}{" "}
                <span style={{ color: other.group_color }}>
                  {other.group_libelle} ({other.group_libelle_short})
                </span>
                {other.roleDebat && (
                  <>
                    <br />
                    {other.roleDebat}
                  </>
                )}
              </p>
            )}
            {codeGrammaire === "PAROLE_GENERIQUE" ? (
              <p key={uid} dangerouslySetInnerHTML={{ __html: texte }} />
            ) : (
              <div key={uid}>
                <h5>{codeGrammaire}</h5>
                <p dangerouslySetInnerHTML={{ __html: texte }} />
              </div>
            )}
          </div>
        ))}
    </div>
    // <Timeline
    //   sx={{
    //     [`& .${timelineItemClasses.root}:before`]: {
    //       flex: 0,
    //       padding: 0,
    //     },
    //   }}
    // >
    //   <TimelineItem>
    //     <TimelineSeparator>
    //       <TimelineDot />
    //       <TimelineConnector />
    //     </TimelineSeparator>
    //     <TimelineContent>
    //       <Stack direction="column" spacing={1}>
    //         <Typography variant="body1" fontWeight="bold">
    //           Titre 1
    //         </Typography>
    //         <Typography variant="caption" fontWeight="light">
    //           Première partie
    //         </Typography>
    //       </Stack>
    //     </TimelineContent>
    //   </TimelineItem>
    //   <TimelineItem>
    //     <TimelineSeparator>
    //       <TimelineDot />
    //       <TimelineConnector />
    //     </TimelineSeparator>
    //     <TimelineContent>
    //       <Stack direction="column" spacing={1}>
    //         <Typography variant="body1" fontWeight="bold">
    //           Titre 2
    //         </Typography>
    //         <Typography variant="caption" fontWeight="bold">
    //           Voir séance
    //         </Typography>
    //         <Typography variant="caption" fontWeight="light">
    //           Travaux en commission
    //         </Typography>
    //       </Stack>
    //     </TimelineContent>
    //   </TimelineItem>
    //   <TimelineItem>
    //     <TimelineSeparator>
    //       <TimelineDot />
    //       <TimelineConnector />
    //     </TimelineSeparator>
    //     <TimelineContent>
    //       <Stack direction="column" spacing={1}>
    //         <Typography variant="body1" fontWeight="bold">
    //           Titre 3
    //         </Typography>
    //         <Typography variant="caption" fontWeight="bold">
    //           Voir séance
    //         </Typography>
    //         <Typography variant="caption" fontWeight="light">
    //           Travaux en commission
    //         </Typography>
    //       </Stack>
    //     </TimelineContent>
    //   </TimelineItem>
    //   <TimelineItem>
    //     <TimelineSeparator>
    //       <TimelineDot />
    //       <TimelineConnector />
    //     </TimelineSeparator>
    //     <TimelineContent>
    //       <Stack direction="column" spacing={1}>
    //         <Typography variant="body1" fontWeight="bold">
    //           Titre 4
    //         </Typography>
    //         <Typography variant="caption" fontWeight="bold">
    //           Voir séance
    //         </Typography>
    //         <Typography variant="caption" fontWeight="light">
    //           Travaux en commission
    //         </Typography>
    //       </Stack>
    //     </TimelineContent>
    //   </TimelineItem>
    // </Timeline>
  );
};
