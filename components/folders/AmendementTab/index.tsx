"use client";
import React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { DossierData } from "@/repository/database";
import { FilterContainer } from "@/components/FilterContainer";

import { Filter } from "./Filter";
import { useFilterSearch } from "./useFilter";
import AmendementList from "./AmendementList";
import { Amendement, Acteur } from "@/repository/types";
import { Typography } from "@mui/material";

export type AmendementTabProps = Pick<
  DossierData,
  "amendementCount" | "documents"
> & {
  amendements: (Amendement & Acteur)[];
  dossierRefUid: string;
};

export const AmendementTab = ({
  amendements,
  documents,
  amendementCount,
  dossierRefUid,
}: AmendementTabProps) => {
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
            documents={documents}
            amendementCount={amendementCount}
            depute={depute}
            handleDepute={handleDepute}
            status={status}
            handleStatus={handleStatus}
            amendements={amendements}
          />
        </FilterContainer>
      </Stack>
      <Stack spacing={3} useFlexGap flex={8} sx={{ minWidth: 0 }}>
        <Typography variant="h2" fontWeight="bold" fontFamily="Raleway">
          {amendements.length} Amendements
        </Typography>
        <AmendementList
          amendements={amendements}
          dossierRefUid={dossierRefUid}
          numero={numero}
          selectedDocument={document}
          depute={depute}
          status={status}
        />
      </Stack>
    </Container>
  );
};
