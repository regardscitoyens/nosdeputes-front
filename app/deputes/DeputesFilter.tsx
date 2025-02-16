"use client";
import * as React from "react";

import Stack from "@mui/material/Stack";

import DeputesView from "./DeputesView";

import { FilterContainer } from "@/components/FilterContainer";
import { Filter } from "./Filter";
import { groupDeputes } from "./groupDeputes";
import { getDeputes } from "./getDeputes";

interface DeputeFilterProps extends ReturnType<typeof groupDeputes> {
  deputes: Awaited<ReturnType<typeof getDeputes>>;
}

export default function DeputesFilter(props: DeputeFilterProps) {
  const { deputes, indexesPerNom, indexesPerGroup, indexesPerCirco, groups } =
    props;

  const [numeroDepartement, setNumeroDepartement] = React.useState<
    string | null
  >(null);

  return (
    <React.Fragment>
      <Stack spacing={3} useFlexGap flex={2}>
        <FilterContainer>
          <Filter
            numeroDepartement={numeroDepartement}
            handleNumeroDepartement={setNumeroDepartement}
          />
        </FilterContainer>
      </Stack>
      <Stack spacing={3} flex={5}>
        <DeputesView
          deputes={deputes}
          indexesPerNom={indexesPerNom}
          indexesPerGroup={indexesPerGroup}
          indexesPerCirco={indexesPerCirco}
          groups={groups}
          numeroDepartement={numeroDepartement}
        />
      </Stack>
    </React.Fragment>
  );
}
