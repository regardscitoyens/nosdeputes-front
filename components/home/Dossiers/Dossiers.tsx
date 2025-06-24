import * as React from "react";
import Box from "@mui/material/Box";
import DossierCard from "./DossierCard";

import { Dossier } from "@prisma/client";

async function getLastDossiersUnCached(): Promise<Dossier[]> {
  try {
    const rep = await fetch(
      `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/dossiers/?sort=dateDernierActe.asc`
    );

    const { data } = await rep.json();

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
      {dossiers.map(
        ({
          uid,
          // etape,
          // _count,
          titre,
          // documents
        }) => (
          <DossierCard
            key={uid}
            titre={titre}
            href={`/${17}/dossier/${uid}`}
            etape={null}
            // amendements={documents
            //   .map((document) => document._count.amendements)
            //   .reduce((acc, v) => acc + v, 0)}
            // interventions={_count?.paragraphes}
            thematique=""
          />
        )
      )}
    </Box>
  );
}
