"use client";
import React from "react";

import Stack from "@mui/material/Stack";

import AmendementCard from "@/components/folders/AmendementCard";
import { Acteur, Amendement, Organe } from "@prisma/client";
import { Typography } from "@mui/material";

export default function AmendementsList(props: {
  amendements: (Amendement & {
    acteurRef: null | (Acteur & { groupeParlementaire: Organe | null });
  })[];
  numero: string;
  selectedDocument: string;
  depute: string;
  status: string;
}) {
  const { amendements, numero, depute, status, selectedDocument } = props;

  const searchActivated =
    numero !== "" || selectedDocument !== "" || depute !== "" || status !== "";

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
      return amendement.acteurRefUid === depute;
    })
    .filter((amendement) => {
      if (numero === "") {
        return true;
      }
      if (amendement.numeroLong == null) {
        return false;
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
      Number.parseInt(a.numeroOrdreDepot ?? "0") <
      Number.parseInt(b.numeroOrdreDepot ?? "0")
        ? -1
        : 1
    );

  return (
    <Stack>
      {searchActivated && (
        <Typography>
          {filteredAmendements.length} correspondent à votre recherche
        </Typography>
      )}
      {filteredAmendements.map((amendement) => (
        <AmendementCard
          amendement={amendement}
          depute={amendement.acteurRef}
          key={amendement.uid}
        />
      ))}
    </Stack>
  );
}
