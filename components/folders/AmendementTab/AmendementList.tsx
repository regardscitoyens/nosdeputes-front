"use client";
import React from "react";

import Stack from "@mui/material/Stack";

import AmendementCard from "./AmendementCard";
import { AmendementTabProps } from ".";

export default function AmendementsList(
  props: Pick<AmendementTabProps, "amendements"> & {
    numero: string;
    selectedDocument: string;
    depute: string;
    status: string;
  }
) {
  const { amendements, numero, depute, status, selectedDocument } = props;

  const filteredAmendements = amendements
    .filter((amendement) => {
      if (status === "") {
        return true;
      }
      return (amendement.sortAmendement || amendement.etatLibelle) === status;
    })
    .filter((amendement) => {
      if (depute === "") {
        return true;
      }
      return amendement.acteur_uid === depute;
    })
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
        <AmendementCard {...amendement} key={amendement.uid} />
      ))}
    </Stack>
  );
}
