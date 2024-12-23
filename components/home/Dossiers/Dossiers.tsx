import * as React from "react";
import Box from "@mui/material/Box";
import DossierCard from "./DossierCard";

import { prisma } from "@/prisma";

async function getLastDossiersUnCached() {
  try {
    const data = await prisma.dossier.findMany({
      where: { legislature: "17" },
      orderBy: [{ dateDernierActe: "desc" }, { numero: "desc" }],
      take: 6,
      include: {
        _count: {
          select: { paragraphes: true, amendements: true },
        },
      },
    });

    return data;
  } catch (error) {
    return [];
  }
}

const getLastDossiers = React.cache(getLastDossiersUnCached);

export default async function Dossiers() {
  const dossiers = await getLastDossiers();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(352px, 1fr))",
        gridGap: 16,
      }}
    >
      {dossiers.map(({ uid, statut, _count, titre }) => (
        <DossierCard
          key={uid}
          titre={titre}
          href={`/${17}/dossier/${uid}`}
          status={statut}
          amendements={_count?.amendements}
          interventions={_count?.paragraphes}
          thematique=""
        />
      ))}
    </Box>
  );
}
