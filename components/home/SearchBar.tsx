"use client";

import Image from "next/image";
import {
  Autocomplete,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";

type DeputeType = {
  prenom: string;
  nom: string;
  circo: string;
};

type DossierType = {
  titre: string;
  type: string;
};

function isDepute(option: DossierType | DeputeType): option is DeputeType {
  return (option as DeputeType).prenom !== undefined;
}
const options: (DossierType | DeputeType)[] = [
  {
    prenom: "Romain",
    nom: "Reprebié",
    circo: "1e conrconscription de l'Ain",
  },
  {
    prenom: "Romain",
    nom: "Reprebié",
    circo: "1e conrconscription de l'Ain",
  },
  {
    prenom: "Romain",
    nom: "Reprebié",
    circo: "1e conrconscription de l'Ain",
  },
  {
    titre: "Répression du mouvement social contre la réforme des retraites",
    type: "Projet de Loi",
  },
  {
    titre: "Répression du mouvement social contre la réforme des retraites",
    type: "Projet de Loi",
  },
  {
    titre: "Répression du mouvement social contre la réforme des retraites",
    type: "Projet de Loi",
  },
];

export default function SearchBar() {
  return (
    <Box sx={{ maxWidth: 709, width: "100%" }}>
      <TextField
        sx={{
          "& .MuiInputBase-root": {
            bgcolor: "#fff",
            height: 68,
            borderRadius: 34,
            pl: 4,
            pr: 1,
          },
        }}
        fullWidth
        placeholder="Entrez un code postal ou un nom de député"
        slotProps={{
          input: {
            endAdornment: (
              <Button
                variant="contained"
                size="large"
                color="primary"
                sx={{ height: 52, borderRadius: 26 }}
                onClick={() => {}}
              >
                CHERCHER
              </Button>
            ),
          },
        }}
      />

      <Typography variant="body2" sx={{ mt: 2 }} fontWeight="light">
        Ex. 01600, Bordeaux, Yaël Braun-Pivet
      </Typography>
    </Box>
  );
}
