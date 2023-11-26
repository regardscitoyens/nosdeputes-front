import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const TextStructureCard = () => {
  return (
    <Card elevation={1}>
      <CardContent sx={{ padding: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1" fontWeight="bold" mb={2}>
            Structure du texte déposé
          </Typography>
          <Typography variant="caption" fontWeight="bold" mb={2}>
            Sur le site assemble-nationale.fr
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2} pb={2}>
          <Typography variant="body2" fontWeight="bold">
            x
          </Typography>

          <div>
            <Typography variant="body2" fontWeight="bold">
              Article 1
            </Typography>
            <Typography variant="body2" fontWeight="light">
              Mise en place d’un nouveau type de bouclier tarifaire pour les PME
              faisant face à des augmentations de charge ponctuelles en
              éléctricité.
            </Typography>
          </div>
        </Stack>
        <Button variant="contained" fullWidth>
          Voir tout
        </Button>
      </CardContent>
    </Card>
  );
};

export default TextStructureCard;
