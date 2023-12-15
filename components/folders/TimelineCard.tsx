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

export const TimelineCard = ({ acts }) => {
  // console.log(acts.map((act) => act.dateActe));
  console.log(acts);

  return (
    <CardLayout title="Chronologie du dossier">
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        {acts.map((act) => {
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
                      <Typography variant="caption" fontWeight="light">
                        text: {act.texteAdopteRefUid}
                      </Typography>
                      <StatusChip
                        status="validated"
                        label="Adopté"
                        size="small"
                      />
                    </Stack>
                  )}
                  {act.texteAssocieRefUid && (
                    <Typography variant="caption" fontWeight="light">
                      Text associé: {act.texteAssocieRefUid}
                    </Typography>
                  )}
                </Stack>
              </TimelineContent>
            </TimelineItem>
          );
        })}
        <TimelineItem>
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
        </TimelineItem>
      </Timeline>
    </CardLayout>
  );
};
