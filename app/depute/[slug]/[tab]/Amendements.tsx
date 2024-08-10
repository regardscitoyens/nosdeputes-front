import React from "react";

import Stack from "@mui/material/Stack";

import AmendementCard from "@/components/folders/AmendementCard";
import { prisma } from "@/prisma";

async function getDeputeAmendementUnCached(slug: string) {
  try {
    return await prisma.acteur.findFirst({
      where: { slug },

      // Verifier que ca fonctionne quadn on aura les amendements dans la DB
      include: { amendements: true, groupeParlementaire: true },
    });
  } catch (error) {
    console.error(`Error fetching amendement from depute ${slug}:`, error);
    throw error;
  }
}

export const getDeputeAmendement = React.cache(getDeputeAmendementUnCached);

export default async function Amendements(props: { deputeSlug: string }) {
  const deputeWithAmendements = await getDeputeAmendement(props.deputeSlug);

  const { amendements, ...depute } = deputeWithAmendements!;

  return (
    <Stack>
      <p>Amendements</p>
      {amendements &&
        amendements
          .sort((a, b) =>
            Number.parseInt(a.numeroOrdreDepot || "") <
            Number.parseInt(b.numeroOrdreDepot || "")
              ? -1
              : 1
          )
          .map((amendement) => (
            <AmendementCard
              key={amendement.uid}
              amendement={amendement}
              depute={depute}
            />
          ))}
    </Stack>
  );
}
