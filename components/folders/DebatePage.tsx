"use client";

import * as React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { DebateFilterBar } from "./DebateFilterBar";
import { DebateSummary } from "./DebateSummary";
import { DebateTranscript } from "./DebateTranscript";
import { Agenda } from "@/repository/types";

interface DebatePageProps {
  paragraphs: any[];
  debats: (Agenda & { ptIndex: number })[];
}
export function DebatePage(props: DebatePageProps) {
  const { paragraphs, debats } = props;
  const [debatIndex, setDebatIndex] = React.useState(0);

  const { compteRenduRef, ptIndex } = debats[debatIndex];
  console.log({ compteRenduRef, ptIndex });
  return (
    <>
      <DebateFilterBar
        debatIndex={debatIndex}
        setDebatIndex={setDebatIndex}
        debats={debats}
      />
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
          <DebateTranscript
            paragraphs={paragraphs.filter(
              (p) =>
                p.debatRefUid === debats[debatIndex].compteRenduRef &&
                Number.parseInt(p.valeurPtsOdj) === debats[debatIndex].ptIndex
            )}
          />
        </Stack>
      </Container>
    </>
  );
}
