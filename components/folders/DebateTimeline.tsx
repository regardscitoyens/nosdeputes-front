"use client";

import React from "react";

import Timeline from "@mui/lab/Timeline";
import ParoleItem from "./DebatTab/ParoleItem";
import SectionItem from "./DebatTab/SectionItem";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import SubSectionItem from "./DebatTab/SubSectionItem";
import { Typography } from "@mui/material";
import { cleanText } from "./DebatTab/cleanText";

export const SUMMARY_CODES = [
  "PRESENTATION_1_0",
  "DISC_GENERALE_1",
  "MOTION_RP_1_1",
  "DISC_ARTICLES_2_4",
];

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

          case "TITRE_TEXTE_DISCUSSION":
            return (
              <Typography
                variant="h1"
                component="h2"
                dangerouslySetInnerHTML={{ __html: cleanText(texte, true) }}
              />
            );
          case "SOUS_TITRE_TEXTE_DISCUSSION":
            return (
              <Typography
                variant="h3"
                component="h3"
                dangerouslySetInnerHTML={{ __html: cleanText(texte, true) }}
              />
            );
          case "ODJ_APPEL_DISCUSSION":
            return (
              <Typography
                component="p"
                dangerouslySetInnerHTML={{ __html: cleanText(texte) }}
              />
            );
          default:
            return texte ? (
              <SubSectionItem
                title={texte}
                withoutConnector={codeGrammaire === "FIN_SEAN_1_0"}
              />
            ) : null;
            return (
              <div
                key={hash}
                onClick={() => {
                  console.log(other);
                }}
              >
                <h5>{codeGrammaire}</h5>
                <h6>{other.codeParole}</h6>
                <p dangerouslySetInnerHTML={{ __html: texte }} />
              </div>
            );
        }
      }
    )}
  </Timeline>
);
