import DeputeCard from "@/components/folders/DeputeCard";
import { getDeputes } from "@/repository/database";
import Box from "@mui/material/Box";
import Link from "next/link";

export default async function DeputesList() {
  const deputes = (await getDeputes("16")) ?? [];
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
                  : {
                      color: group_color,
                      fullName: group_libelle,
                      shortName: group_libelle_short,
                    }
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
