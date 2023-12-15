import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { CardLayout } from "@/components/folders/CardLayout";
import Image from "next/image";

export const TextStructureCard = () => {
  return (
    <CardLayout
      title="Structure du texte déposé"
      action={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Image
            src="/icon-assemblee-nationale.jpg"
            alt="Icône de l'Assemblée Nationale française"
            width={12}
            height={12}
          />
          <Typography variant="caption" fontWeight="bold">
            Sur le site assemble-nationale.fr
          </Typography>
        </Stack>
      }
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      ></Stack>
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
      <Button variant="contained" color="secondary" fullWidth>
        Voir tout
      </Button>
    </CardLayout>
  );
};
