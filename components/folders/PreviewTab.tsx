"use client";

import React from "react";

import { AdditionalInfoCard } from "@/components/folders/AdditionalInfoCard";
import { CommiteeCard } from "@/components/folders/CommiteeCard";
import { CardLayout } from "@/components/folders/CardLayout";
import { LegislativeDocumentsCard } from "@/components/folders/LegislativeDocumentsCard";
import { TextStructureCard } from "@/components/folders/TextStructureCard";
import { TimelineCard } from "@/components/folders/TimelineCard";
import { SpeakingTime } from "@/components/folders/SpeakingTime";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Acteur } from "@/repository/types";
import { DossierData } from "@/repository/database";

type PreviewTabProps = {
  dossier?: DossierData;
};

export const PreviewTab = ({ dossier }: PreviewTabProps) => {
  const {
    commissionFondId,
    commissionAvisId,
    organes = {},
    rapporteursFondIds,
    acteurs = {},
    acts = [],
    documents = [],
  } = dossier ?? {};

  return (
    <Container
      sx={{
        pt: 3,
        display: "flex",
        flexDirection: {
          xs: "column-reverse",
          md: "row",
        },
        gap: 5,
      }}
    >
      <Stack spacing={3} useFlexGap flex={2}>
        <CommiteeCard
          commissionFond={commissionFondId && organes[commissionFondId]}
          commissionAvis={commissionAvisId && organes[commissionAvisId]}
          rapporteursFond={rapporteursFondIds
            ?.map((id: string) => acteurs[id])
            .filter((acteur: undefined | Acteur) => !!acteur)}
        />
        <AdditionalInfoCard />
        <LegislativeDocumentsCard />
      </Stack>
      <Stack spacing={3} flex={5}>
        <CardLayout title="Temps de parole par groupe">
          <SpeakingTime />
        </CardLayout>
        <TimelineCard acts={acts} documents={documents} />
        <TextStructureCard />
      </Stack>
    </Container>
  );
};
