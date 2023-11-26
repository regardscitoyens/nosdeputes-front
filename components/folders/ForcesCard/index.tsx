import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { useTheme } from "@mui/material/styles";

const ForcesCard = () => {
  const theme = useTheme();

  return (
    <Card elevation={1}>
      <CardContent sx={{ padding: 3 }}>
        <Stack direction="row" spacing={4}>
          <Stack direction="column" spacing={1}>
            <Typography variant="body1" fontWeight="bold" mb={2}>
              Forces résistantes
            </Typography>
            <Typography fontWeight="bold" variant="caption">
              La France Insoumise (LFI) - NUPES
            </Typography>
            <Typography fontWeight="bold" variant="caption">
              Gauche Démocrate et Républicaine (GDR) - NUPES
            </Typography>
            <Typography fontWeight="bold" variant="caption">
              Socialistes et apparentés (SOC) - NUPES
            </Typography>
          </Stack>
          <Stack direction="column" spacing={1}>
            <Typography variant="body1" fontWeight="bold" mb={2}>
              Forces résistantes
            </Typography>
            <Typography fontWeight="bold" variant="caption">
              La France Insoumise (LFI) - NUPES
            </Typography>
            <Typography fontWeight="bold" variant="caption">
              Gauche Démocrate et Républicaine (GDR) - NUPES ad a zd
            </Typography>
            <Typography fontWeight="bold" variant="caption">
              Socialistes et apparentés (SOC) - NUPES
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ForcesCard;
