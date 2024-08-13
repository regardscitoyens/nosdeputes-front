"use client";
import React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { FilterContainer } from "@/components/FilterContainer";

import { Filter } from "./Filter";
import { useFilterSearch } from "./useFilter";
import AmendementList from "./AmendementList";
import { Typography } from "@mui/material";
import { Amendement, Dossier, Document, Acteur, Organe } from "@prisma/client";

export type AmendementTabProps = {
  dossier: Dossier & {
    documents:
      | null
      | (Document & {
          amendements:
            | null
            | (Amendement & {
                acteurRef:
                  | null
                  | (Acteur & { groupeParlementaire: Organe | null });
              })[];
        })[];
  };
};

export const AmendementTab = ({ dossier }: AmendementTabProps) => {
  const flattenAmendements = dossier.documents
    ?.flatMap((document) => document.amendements)
    .filter((amendement) => amendement !== null);

  const [numero, handleNumero] = useFilterSearch("numero");
  const [document, handleDocument] = useFilterSearch("document");
  const [depute, handleDepute] = useFilterSearch("depute");
  const [status, handleStatus] = useFilterSearch("status");

  return (
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
      <Stack spacing={3} useFlexGap flex={2}>
        <FilterContainer>
          <Filter
            numero={numero}
            handleNumero={handleNumero}
            selectedDocument={document}
            setSelectedDocument={handleDocument}
            dossier={dossier}
            depute={depute}
            handleDepute={handleDepute}
            status={status}
            handleStatus={handleStatus}
          />
        </FilterContainer>
      </Stack>
      <Stack spacing={3} useFlexGap flex={8} sx={{ minWidth: 0 }}>
        <Typography variant="h2" fontWeight="bold" fontFamily="Raleway">
          {flattenAmendements?.length ?? 0} Amendements
        </Typography>
        <AmendementList
          amendements={flattenAmendements ?? []}
          numero={numero}
          selectedDocument={document}
          depute={depute}
          status={status}
        />
      </Stack>
    </Container>
  );
};
