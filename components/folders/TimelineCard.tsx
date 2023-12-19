import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { CardLayout } from "@/components/folders/CardLayout";
import StatusChip from "@/components/StatusChip";
import { ActeLegislatif, Document } from "@/repository/types";
import { Link } from "@mui/material";
import { getDocumentURL } from "@/domain/dataTransform";

export const TimelineCard = ({
  acts,
  documents,
}: {
  acts: ActeLegislatif[];
  documents: Record<string, Document>;
}) => {
  return (
    <CardLayout title="Chronologie du dossier">
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        {acts
          .sort((a, b) => {
            if (!a.dateActe || !b.dateActe) {
              return 0;
            }
            return a.dateActe < b.dateActe ? -1 : 1;
          })
          .map((act) => {
            const title = act.nomCanonique || act.codeActe;

            return (
              <TimelineItem key={act.uid}>
                <TimelineOppositeContent>
                  <Typography variant="body2" fontWeight="light">
                    {act.dateActe
                      ? act.dateActe.toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "?"}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Stack direction="column" spacing={1}>
                    <Typography variant="body1" fontWeight="bold">
                      {title}
                    </Typography>

                    {act.texteAdopteRefUid && (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography
                          variant="caption"
                          fontWeight="light"
                          component={
                            getDocumentURL(documents[act.texteAdopteRefUid])
                              ? Link
                              : "p"
                          }
                          href={getDocumentURL(
                            documents[act.texteAdopteRefUid]
                          )}
                        >
                          {documents[act.texteAdopteRefUid]?.titrePrincipal}
                        </Typography>
                        <StatusChip
                          status="validated"
                          label="Adopté"
                          size="small"
                        />
                      </Stack>
                    )}
                    {act.texteAssocieRefUid && (
                      <Typography
                        variant="caption"
                        fontWeight="light"
                        component={
                          getDocumentURL(documents[act.texteAssocieRefUid])
                            ? Link
                            : "p"
                        }
                        href={getDocumentURL(documents[act.texteAssocieRefUid])}
                      >
                        {documents[act.texteAssocieRefUid]?.titrePrincipal}
                      </Typography>
                    )}
                  </Stack>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        {/* Next lines are items from the figma.
        I keep them to be able to copy past them when needed.
        But commented to be sure I don't mix real data and the figma. */}
        {/* <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" fontWeight="light">
              21 Oct 2022
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Stack direction="column" spacing={1}>
              <Typography variant="body1" fontWeight="bold">
                Avis favorable du conseil constitutionnel
              </Typography>
              <Typography variant="caption" fontWeight="bold">
                Voir séance
              </Typography>
              <Typography variant="caption" fontWeight="light">
                Première partie
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" fontWeight="light">
                  Vote sur l&apos;ensemble de la première partie
                </Typography>
                <StatusChip status="validated" label="Adopté" size="small" />
              </Stack>
            </Stack>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" fontWeight="light">
              13 Oct 2022
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Stack direction="column" spacing={1}>
              <Typography variant="body1" fontWeight="bold">
                Séance en hémicycle de 9h
              </Typography>
              <Typography variant="caption" fontWeight="bold">
                Voir séance
              </Typography>
              <Typography variant="caption" fontWeight="light">
                Travaux en commission
              </Typography>
              <Typography variant="caption" fontWeight="light">
                Première partie
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" fontWeight="light">
                  Article 1er
                </Typography>
                <StatusChip status="dropped" label="Rejeté" size="small" />
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" fontWeight="light">
                  Article 2 et annexe a
                </Typography>
                <StatusChip status="validated" label="Adopté" size="small" />
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="caption" fontWeight="light">
                  Vote sur l&apos;ensemble de la première partie
                </Typography>
                <StatusChip status="validated" label="Adopté" size="small" />
              </Stack>
            </Stack>
          </TimelineContent>
        </TimelineItem> */}
      </Timeline>
    </CardLayout>
  );
};
