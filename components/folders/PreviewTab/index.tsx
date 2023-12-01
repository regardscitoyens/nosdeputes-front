import React from "react";

import AdditionalInfoCard from "@/components/folders/AdditionalInfoCard";
import CommiteeCard from "@/components/folders/CommiteeCard";
import LegislativeDocumentsCard from "@/components/folders/LegislativeDocumentsCard";
import TextStructureCard from "@/components/folders/TextStructureCard";
import TimelineCard from "@/components/folders/TimelineCard";
import SpeakingTimeCard from "@/components/folders/SpeakingTimeCard";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

export default function PreviewTab() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        pb: 2,
        px: 2,
        display: "flex",
        flexDirection: {
          xs: "column-reverse",
          md: "row",
        },
        gap: 5,
        flexWrap: "wrap-reverse",
      }}
    >
      <Stack spacing={3} flex={2}>
        <CommiteeCard />
        <AdditionalInfoCard />
        <LegislativeDocumentsCard />
      </Stack>
      <Stack spacing={3} flex={5}>
        <SpeakingTimeCard />
        <TimelineCard />
        <TextStructureCard />
      </Stack>
    </Container>
  );
}
