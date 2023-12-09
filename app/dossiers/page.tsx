"use client";

import React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { FilterContainer } from "@/components/FilterContainer";

import { DossierFilterState, Filter } from "@/components/folderHomePage/Filter";
import DossierList from "@/components/folderHomePage/DossierList";

export default function Dossiers() {
  const [filterState, setFilterState] = React.useState<DossierFilterState>({
    theme: "",
  });

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
          <Filter filterState={filterState} setFilterState={setFilterState} />
        </FilterContainer>
      </Stack>
      <Stack spacing={3} flex={5} sx={{ minWidth: 0 }}>
        <DossierList
          filterState={filterState}
          setFilterState={setFilterState}
        />
      </Stack>
    </Container>
  );
}
