import React from "react";

import Timeline from "@mui/lab/Timeline";
import ParoleItem from "@/components/folders/DebatTab/ParoleItem";
import SectionItem from "@/components/folders/DebatTab/SectionItem";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import SubSectionItem from "@/components/folders/DebatTab/SubSectionItem";
import { Typography } from "@mui/material";
import { cleanText } from "@/components/folders/DebatTab/cleanText";
import { Acteur, Organe, Paragraphe } from "@prisma/client";

type DebateTimelineProps = {
  paragraphes: Paragraphe[];
  acteurs: Record<string, Acteur | null>;
  groups: Record<string, Organe | null>;
};
export const DebateTimeline = ({
  paragraphes,
  acteurs,
  groups,
}: DebateTimelineProps) => (
  <Timeline
    sx={{
      [`& .${timelineItemClasses.root}:before`]: {
        flex: 0,
        padding: 0,
      },
    }}
  >
    {paragraphes.map(
      ({ id, codeGrammaire, acteurRefUid, roleDebat, texte }) => {
        const acteur = acteurRefUid != null ? acteurs[acteurRefUid] : null;
        const groupeParlementaire =
          acteur != null && acteur.groupeParlementaireUid !== null
            ? groups[acteur.groupeParlementaireUid]
            : null;

        switch (codeGrammaire) {
          case "PAROLE_GENERIQUE":
          case "INTERRUPTION_1_10":
            return (
              <ParoleItem
                key={id}
                acteur={acteur}
                groupeParlementaire={groupeParlementaire}
                roleDebat={roleDebat}
                texte={texte}
              />
            );

          case "PRESENTATION_1_0":
          case "DISC_GENERALE_1":
          case "MOTION_RP_1_1":
          case "DISC_ARTICLES_2_4":
            return <SectionItem key={id} id={id.toString()} title={texte} />;

          case "TITRE_TEXTE_DISCUSSION":
            return (
              <Typography
                key={id}
                variant="h1"
                component="h2"
                dangerouslySetInnerHTML={{
                  __html: cleanText(texte ?? "", true),
                }}
              />
            );
          case "SOUS_TITRE_TEXTE_DISCUSSION":
            return (
              <Typography
                key={id}
                variant="h3"
                component="h3"
                dangerouslySetInnerHTML={{
                  __html: cleanText(texte ?? "", true),
                }}
              />
            );
          case "ODJ_APPEL_DISCUSSION":
            return (
              <Typography
                key={id}
                component="p"
                dangerouslySetInnerHTML={{ __html: cleanText(texte ?? "") }}
              />
            );
          default:
            return texte ? (
              <SubSectionItem
                key={id}
                title={texte}
                withoutConnector={codeGrammaire === "FIN_SEAN_1_0"}
              />
            ) : null;
          // return (
          //   <div
          //     key={id}
          //     onClick={() => {
          //       console.log(other);
          //     }}
          //   >
          //     <h5>{codeGrammaire}</h5>
          //     <h6>{other.codeParole}</h6>
          //     <p dangerouslySetInnerHTML={{ __html: texte }} />
          //   </div>
          // );
        }
      }
    )}
  </Timeline>
);
