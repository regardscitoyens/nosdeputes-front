import * as React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { groupDeputes } from "./groupDeputes";
import DeputesView from "./DeputesView";
import { getDeputes } from "./getDeputes";
import { FilterContainer } from "@/components/FilterContainer";
import { Filter } from "./Filter";
import DeputesFilter from "./DeputesFilter";

export default async function DeputesList() {
  const deputes = await getDeputes("17");

  const { indexesPerNom, indexesPerGroup, indexesPerCirco, groups } =
    groupDeputes(deputes);

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
      <DeputesFilter
        deputes={deputes}
        indexesPerNom={indexesPerNom}
        indexesPerGroup={indexesPerGroup}
        indexesPerCirco={indexesPerCirco}
        groups={groups}
      />
    </Container>
  );
}
