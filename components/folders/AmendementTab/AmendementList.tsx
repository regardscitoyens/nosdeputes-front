"use client";
import React from "react";

import Stack from "@mui/material/Stack";
import { Divider } from "@mui/material";

import AmendementCard from "./AmendementCard";
import { AmendementTabProps } from ".";

export default function AmendementsList(
  props: Pick<AmendementTabProps, "amendements"> & {
    numero: string;
    selectedDocument: string;
  }
) {
  const { amendements, numero, selectedDocument } = props;

  const filteredAmendements = amendements
    .filter((amendement) => {
      if (numero === "") {
        return true;
      }
      return amendement.numeroLong
        .toLowerCase()
        .startsWith(numero.toLowerCase());
    })
    .filter(
      ({ texteLegislatifRefUid }) =>
        !selectedDocument || texteLegislatifRefUid === selectedDocument
    )
    .sort((a, b) =>
      Number.parseInt(a.numeroOrdreDepot) < Number.parseInt(b.numeroOrdreDepot)
        ? -1
        : 1
    );

  return (
    <Stack>
      {filteredAmendements.slice(0, 10).map((amendement) => (
        <React.Fragment key={amendement.uid}>
          <AmendementCard {...amendement} />
          <Divider />
        </React.Fragment>
      ))}
    </Stack>
  );
}
