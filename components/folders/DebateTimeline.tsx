"use client";

import React from "react";

import Timeline from "@mui/lab/Timeline";
import ParoleItem from "./DebatTab/ParoleItem";
import SectionItem from "./DebatTab/SectionItem";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import SubSectionItem from "./DebatTab/SubSectionItem";

export const SUMMARY_CODES = [
  "PRESENTATION_1_0",
  "DISC_GENERALE_1",
  "MOTION_RP_1_1",
  "DISC_ARTICLES_2_4",
];

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

type DebateTimelineProps = {
  // TODO: Define type from prisma (to generate)
  paragraphs: any[];
};
export const DebateTimeline = ({ paragraphs }: DebateTimelineProps) => (
  <Timeline
    sx={{
      [`& .${timelineItemClasses.root}:before`]: {
        flex: 0,
        padding: 0,
      },
    }}
  >
    {paragraphs.map(
      ({
        hash,
        codeGrammaire,
        acteurRef,
        prenom,
        nom,
        acteur_slug,
        group_color,
        group_libelle,
        group_libelle_short,
        roleDebat,
        texte,
        ...other
      }) => {
        switch (codeGrammaire) {
          case "PAROLE_GENERIQUE":
          case "INTERRUPTION_1_10":
            // return <p>a</p>;
            return (
              <ParoleItem
                key={hash}
                acteurRef={acteurRef}
                prenom={prenom}
                nom={nom}
                acteur_slug={acteur_slug}
                group_color={group_color}
                group_libelle={group_libelle}
                group_libelle_short={group_libelle_short}
                roleDebat={roleDebat}
                texte={texte}
              />
            );

          case "PRESENTATION_1_0":
          case "DISC_GENERALE_1":
          case "MOTION_RP_1_1":
          case "DISC_ARTICLES_2_4":
            return <SectionItem id={hash} title={texte} />;

          default:
            return texte ? <SubSectionItem title={texte} /> : null;
            return (
              <div
                key={hash}
                onClick={() => {
                  console.log(other);
                }}
              >
                <h5>{codeGrammaire}</h5>
                <p dangerouslySetInnerHTML={{ __html: texte }} />
              </div>
            );
        }
      }
    )}
  </Timeline>
);
