import * as React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { groupDeputes } from "./groupDeputes";
import DeputesView from "./DeputesView";

import { FilterContainer } from "@/components/FilterContainer";
import { Filter } from "./Filter";
import DeputesFilter from "./DeputesFilter";
import { getDeputes } from "@/data/getDeputes";

export default async function DeputesList() {
  const data = await getDeputes(17);

  if (data === null) {
    return null;
  }

  const { acteurs, groups } = data;
  const { uidPerNom, uidPerGroup, uidPerCirco } = groupDeputes(acteurs);

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
        deputes={acteurs}
        uidPerNom={uidPerNom}
        uidPerGroup={uidPerGroup}
        uidPerCirco={uidPerCirco}
        groups={groups}
      />
    </Container>
  );
}
