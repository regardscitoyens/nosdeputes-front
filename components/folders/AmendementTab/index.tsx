"use client";

import React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import { DossierData } from "@/repository/database";
import AmendementCard from "./AmendementCard";
import { Divider } from "@mui/material";

type AmendementTabProps = {
  dossier?: DossierData;
};

export const AmendementTab = ({ dossier }: AmendementTabProps) => {
  const {
    commissionFondId,
    commissionAvisId,
    organes = {},
    rapporteursFondIds,
    coSignatairesIds,
    acteurs = {},
    acts = [],
    documents = [],
    amendementCount = {},
    amendements = [],
  } = dossier ?? {};

  return (
    <Container
      sx={{
        pt: 3,
        display: "flex",
        flexDirection: {
          xs: "column-reverse",
          md: "row",
        },
        gap: 5,
      }}
    >
      <Stack>
        {amendements.slice(0, 10).map((amendement) => (
          <React.Fragment key={amendement.uid}>
            <AmendementCard {...amendement} />
            <Divider />
          </React.Fragment>
        ))}
      </Stack>
    </Container>
  );
};
