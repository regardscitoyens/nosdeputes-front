import React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { FilterContainer } from "@/components/FilterContainer";

import { Filter } from "@/components/folderHomePage/Filter";
import DossierList from "@/components/folderHomePage/DossierList";

export default async function Dossiers(props: {
  searchParams: Promise<{ theme?: string; search?: string }>;
}) {
  const { theme, search } = await props.searchParams;

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
          <Filter theme={theme ?? ""} search={search ?? ""} />
        </FilterContainer>
      </Stack>
      <Stack spacing={3} flex={5} sx={{ minWidth: 0 }}>
        <DossierList theme={theme ?? ""} search={search ?? ""} />
      </Stack>
    </Container>
  );
}
