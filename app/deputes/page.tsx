import * as React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { groupDeputes } from "./groupDeputes";
import DeputesView from "./DeputesView";
import { getDeputes } from "./getDeputes";

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
      {/* <Stack spacing={3} useFlexGap flex={2}>
        <FilterContainer>
          //<Filter theme={searchParams.theme ?? ""} />
        </FilterContainer>
      </Stack> */}
      <Stack spacing={3} flex={5}>
        <DeputesView
          deputes={deputes}
          indexesPerNom={indexesPerNom}
          indexesPerGroup={indexesPerGroup}
          indexesPerCirco={indexesPerCirco}
          groups={groups}
        />
      </Stack>
    </Container>
  );
}
