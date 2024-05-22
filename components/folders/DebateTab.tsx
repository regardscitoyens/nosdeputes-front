import React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { DebateFilterBar } from "./DebateFilterBar";
import { DebateSummary } from "./DebateSummary";
import { DebateTranscript } from "./DebateTranscript";
import { ActeLegislatif } from "@/repository/types";
import { getDebat } from "@/repository/database";

const CODE_ACTS_AVEC_DEBAT = [
  "AN1-DEBATS-SEANCE",
  "AN2-DEBATS-SEANCE",
  "AN21-DEBATS-SEANCE",
  "AN3-DEBATS-SEANCE",
  "ANLDEF-DEBATS-SEANCE",
  "ANLUNI-DEBATS-SEANCE",
  "ANNLEC-DEBATS-SEANCE",
  "CMP-DEBATS-AN-SEANCE",
  "CMP-DEBATS-SN-SEANCE",
];

interface DebatTableProps {
  actesLegislatifs: ActeLegislatif[];
}
export async function DebateTab(props: DebatTableProps) {
  const { actesLegislatifs } = props;

  const seen = new Set();
  const reunionsIds = actesLegislatifs
    // .filter((act) => CODE_ACTS_AVEC_DEBAT.includes(act.codeActe))
    .map((act) => act.reunionRefUid)
    .filter((id) => !!id)
    .filter((id) => {
      // Remove duplicates
      if (seen.has(id)) {
        return false;
      }
      seen.add(id);
      return true;
    });
  console.log(reunionsIds);

  const agendas = await getDebat(reunionsIds.slice(0, 1));

  return (
    <>
      <pre>
        {JSON.stringify(
          agendas
            .sort((a, b) => a.ordreAbsoluSeance - b.ordreAbsoluSeance)
            .map((a) => a.texte),
          null,
          2
        )}
      </pre>
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
}
