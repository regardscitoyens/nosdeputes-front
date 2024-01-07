"use client";
import React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { DossierData } from "@/repository/database";
import { FilterContainer } from "@/components/FilterContainer";

import { Filter } from "./Filter";
import { useFilterState } from "./useFilter";
import AmendementList from "./AmendementList";

type AmendementTabProps = {
  dossier?: DossierData;
};

export const AmendementTab = ({ dossier }: AmendementTabProps) => {
  const { amendements = [], acteurs = {} } = dossier ?? {};

  const { numero, handleNumero } = useFilterState();

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
          <Filter numero={numero} handleNumero={handleNumero} />
        </FilterContainer>
      </Stack>
      <Box flex={8} sx={{ minWidth: 0 }}>
        <AmendementList
          amendements={amendements}
          acteurs={acteurs}
          numero={numero}
        />
      </Box>
    </Container>
  );
};
