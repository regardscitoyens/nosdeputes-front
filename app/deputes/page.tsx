import * as React from "react";

import Box from "@mui/material/Box";
import Link from "next/link";

import DeputeCard from "@/components/folders/DeputeCard";
import { getDeputes } from "@/repository/database";
import { DeputeData, groupDeputes } from "./groupDeputes";

export default async function DeputesList() {
  const deputes: DeputeData[] = (await getDeputes("16")) ?? [];

  const { indexesPerNom, indexesPerGroup, indexesPerCirco, groups } =
    groupDeputes(deputes);

  return (
    <Box
      sx={{
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        rowGap: 1.5,
        columnGap: 4,
      }}
    >
      {deputes
        .sort((a, b) =>
          `${a.prenom} ${a.nom}`.localeCompare(`${b.prenom} ${b.nom}`)
        )
        .map(
          ({
            nom,
            prenom,
            slug,
            dateFin,
            group_color,
            group_libelle,
            group_libelle_short,
          }) => (
            <DeputeCard
              key={slug}
              prenom={prenom}
              nom={nom}
              group={
                dateFin !== null
                  ? {
                      color: "black",
                      fullName: "mandat terminé",
                      shortName: "",
                    }
                  : group_color !== null
                  ? {
                      color: group_color,
                      fullName: group_libelle,
                      shortName: group_libelle_short,
                    }
                  : undefined
              }
              component={Link}
              href={`/depute/${slug}`}
              sx={{
                "&:hover": { bgcolor: "grey.50" },
              }}
            />
          )
        )}
    </Box>
  );
}
