import React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material";

import { DebateFilterBar } from "./DebateFilterBar";
import { DebateSummary } from "./DebateSummary";
import { DebateTranscript } from "./DebateTranscript";

export const DebateTab = () => {
  const theme = useTheme();

  return (
    <>
      <DebateFilterBar />
      <Container
        sx={{
          pt: 3,
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 5,
        }}
      >
        <Stack flex={2}>
          <DebateSummary />
        </Stack>
        <Stack spacing={3} flex={5} alignItems="flex-start">
          <DebateTranscript />
        </Stack>
      </Container>
    </>
  );
};
