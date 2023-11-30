import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

import CardLayout from "@/components/folders/CardLayout";

const SpeakingTimeCard = () => {
  const theme = useTheme();

  return (
    <CardLayout title={"Temps de parole par groupe"} variant="primary">
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
    </CardLayout>
  );
};

export default SpeakingTimeCard;
