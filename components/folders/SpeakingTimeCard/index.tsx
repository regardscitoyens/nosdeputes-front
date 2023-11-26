import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { useTheme } from "@mui/material/styles";

const SpeakingTimeCard = () => {
  const theme = useTheme();

  return (
    <Card elevation={1}>
      <CardContent sx={{ padding: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
          Temps de parole par groupe
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <div
            style={{
              height: "8px",
              backgroundColor: theme.palette.primary.main,
              borderRadius: 4,
              flex: 2,
            }}
          />
          <div
            style={{
              height: "8px",
              backgroundColor: theme.palette.primary.main,
              borderRadius: 4,
              flex: 1,
            }}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          flexWrap="wrap"
          justifyContent="center"
        >
          <Typography fontWeight="bold" variant="caption">
            LFI - NUPES : 11%
          </Typography>
          <Typography fontWeight="bold" variant="caption">
            GDR - NUPES : 11%
          </Typography>
          <Typography fontWeight="bold" variant="caption">
            SOC - NUPES : 11%
          </Typography>
          <Typography fontWeight="bold" variant="caption">
            ECO - NUPES : 11%
          </Typography>
          <Typography fontWeight="bold" variant="caption">
            LIOT : 11%
          </Typography>
          <Typography fontWeight="bold" variant="caption">
            REN : 11%
          </Typography>
          <Typography fontWeight="bold" variant="caption">
            MODEM : 11%
          </Typography>
          <Typography fontWeight="bold" variant="caption">
            HOR : 11%
          </Typography>
          <Typography fontWeight="bold" variant="caption">
            LR : 11%
          </Typography>
          <Typography fontWeight="bold" variant="caption">
            RN : 11%
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SpeakingTimeCard;
