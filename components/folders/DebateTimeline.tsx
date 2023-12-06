import React from "react";

import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Stack from "@mui/material/Stack";

export const DebateTimeline = () => {
  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Stack direction="column" spacing={1}>
            <Typography variant="body1" fontWeight="bold">
              Titre 1
            </Typography>
            <Typography variant="caption" fontWeight="light">
              Première partie
            </Typography>
          </Stack>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Stack direction="column" spacing={1}>
            <Typography variant="body1" fontWeight="bold">
              Titre 2
            </Typography>
            <Typography variant="caption" fontWeight="bold">
              Voir séance
            </Typography>
            <Typography variant="caption" fontWeight="light">
              Travaux en commission
            </Typography>
          </Stack>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Stack direction="column" spacing={1}>
            <Typography variant="body1" fontWeight="bold">
              Titre 3
            </Typography>
            <Typography variant="caption" fontWeight="bold">
              Voir séance
            </Typography>
            <Typography variant="caption" fontWeight="light">
              Travaux en commission
            </Typography>
          </Stack>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Stack direction="column" spacing={1}>
            <Typography variant="body1" fontWeight="bold">
              Titre 4
            </Typography>
            <Typography variant="caption" fontWeight="bold">
              Voir séance
            </Typography>
            <Typography variant="caption" fontWeight="light">
              Travaux en commission
            </Typography>
          </Stack>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};
