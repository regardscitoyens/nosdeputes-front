"use client";

import Image from 'next/image';
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
      <Autocomplete
        fullWidth
        freeSolo
        sx={{
          "& .MuiInputBase-root": {
            bgcolor: "#fff",
            height: 68,
            borderRadius: 34,
            pl: 4,
            pr: 1,
          },
        }}
        disableClearable
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Entrez un code postal, une ville, un nom de député, un dossier législatif, un thème..."
            InputProps={{
              ...params.InputProps,
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
            }}
          />
        )}
        options={options}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (isDepute(option)) {
            return `${option.prenom} ${option.nom} ${option.circo}`;
          }
          return option.titre;
        }}
        renderOption={(props, option) => {
          if (isDepute(option)) {
            return (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <Image loading="lazy" height="20" width="20" src="/picture.png" alt="" />
                <Typography variant="body2">
                  {option.prenom} {option.nom}
                </Typography>
                <Typography variant="caption">{option.circo}</Typography>
              </Box>
            );
          }
          return (
            <Box component="li" {...props}>
              <Typography variant="body2">{option.titre}</Typography>
              <Typography variant="caption">{option.type}</Typography>
            </Box>
          );
        }}
      />
      <Typography variant="body2" sx={{ mt: 2 }} fontWeight="light">
        Ex. 01600, Bordeaux, Yaël Braun-Pivet, Projet de Loi Finance 2023,
        Nucléaire...
      </Typography>
    </Box>
  );
}
