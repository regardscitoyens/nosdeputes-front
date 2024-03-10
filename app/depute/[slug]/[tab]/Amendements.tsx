import React from "react";

import Stack from "@mui/material/Stack";

import { getDeputeAmendement } from "@/repository/database";
import AmendementCard from "@/components/folders/AmendementTab/AmendementCard";

export default async function Amendements(props: { deputeSlug: string }) {
  const { amendements = [], depute = {} } = await getDeputeAmendement(
    props.deputeSlug
  );
  return (
    <Stack>
      <p>Amendements</p>
      {amendements
        .sort((a, b) =>
          Number.parseInt(a.numeroOrdreDepot) <
          Number.parseInt(b.numeroOrdreDepot)
            ? -1
            : 1
        )
        .map((amendement) => (
          <AmendementCard
            key={amendement.uid}
            {...amendement}
            prenom={depute.prenom}
            nom={depute.nom}
          />
        ))}
    </Stack>
  );
}
