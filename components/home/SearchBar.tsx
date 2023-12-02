"use client";

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
    <Autocomplete
      fullWidth
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Button variant="contained" size="large">
                Search
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
              <img loading="lazy" width="20" src="/picture.png" alt="" />
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
  );
}
