import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DossierCard from "./DossierCard";

const dissiers = [
  {
    titre: "Restitution des biens culturels spoilés entnre 1933 et 1945",
    status: "1e lecture AN",
    thematique: "transport",
    interventions: 5477,
    amendements: 346,
  },
  {
    titre: `Mobilité internationale des alternants pour un "erasmus de l'apprentissage"`,
    status: "1e lecture AN",
    thematique: "transport",
    interventions: 5477,
    amendements: 346,
  },
  {
    titre: `Gestion différenciée des compétences eau et assainissement`,
    status: "1e lecture AN",
    thematique: "transport",
    interventions: 5477,
    amendements: 346,
  },
  {
    titre: `Régularisation du plui de la communauté de communes du bas-chablais`,
    status: "1e lecture AN",
    thematique: "transport",
    interventions: 5477,
    amendements: 346,
  },
  {
    titre: `Accompagnement des élus locaux dans la lutte contre l'artificialisation des sols`,
    status: "1e lecture AN",
    thematique: "transport",
    interventions: 5477,
    amendements: 346,
  },
  {
    titre: `Lutte contre le dumping social sur le transmanche`,
    status: "1e lecture AN",
    thematique: "transport",
    interventions: 5477,
    amendements: 346,
  },
];
export default function Section() {
  return (
    <Box
      sx={{
        maxWidth: 1088,
        margin: {
          xs: 1,
          md: 4,
          lg: "auto",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h2">Les derniers dossiers</Typography>
        <Button
          variant="text"
          component={Link}
          href="/dossiers/"
          endIcon={<ArrowForwardIcon />}
        >
          Tous les dossiers
        </Button>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(352px, 1fr))",
          gridGap: 16,
        }}
      >
        {dissiers.map((card) => (
          <DossierCard key={card.titre} {...card} />
        ))}
      </Box>
    </Box>
  );
}
