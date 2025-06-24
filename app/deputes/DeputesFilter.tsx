"use client";
import * as React from "react";

import Stack from "@mui/material/Stack";

import DeputesView from "./DeputesView";

import { FilterContainer } from "@/components/FilterContainer";
import { Filter } from "./Filter";
import { groupDeputes } from "./groupDeputes";
import { Acteur, Mandat, Organe } from "@prisma/client";

export interface DeputeFilterProps {
  deputes: Record<string, Acteur & { mandatPrincipal?: Mandat }>;
  uidPerNom: Record<string, string[]>;
  uidPerGroup: Record<string, string[]>;
  uidPerCirco: Record<string, string[]>;
  groups: Record<string, Organe>;
}

export default function DeputesFilter(props: DeputeFilterProps) {
  const { deputes, uidPerNom, uidPerGroup, uidPerCirco, groups } = props;

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
          uidPerNom={uidPerNom}
          uidPerGroup={uidPerGroup}
          uidPerCirco={uidPerCirco}
          groups={groups}
          numeroDepartement={numeroDepartement}
        />
      </Stack>
    </React.Fragment>
  );
}
