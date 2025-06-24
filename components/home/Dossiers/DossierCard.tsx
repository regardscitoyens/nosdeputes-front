import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import LabelChip from "@/components/LabelChip";
import Link from "next/link";
import StatusChip from "@/components/StatusChip";

type DossierCardProps = {
  href: string;
  titre: null | string;
  etape: null | string; //TODO: use an enum when the type of etape will be clear
  thematique: string; // TODO: use an enum latter
  interventions?: number;
  amendements?: number;
};
const DossierCard = (props: DossierCardProps) => {
  const { titre, etape, href, thematique, interventions, amendements } = props;

  const withStats = interventions !== undefined && amendements !== undefined;
  return (
    <Card variant="outlined" sx={{ borderRadius: 1.25 }}>
      <CardActionArea
        component={Link}
        href={href}
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          height: "100%",
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ mb: 2, lineHeight: "20px" }}
        >
          {titre}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {withStats && (
          <Box
            sx={{
              display: "flew",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              mb: 2,
            }}
          >
            {interventions !== undefined && (
              <Typography variant="body2">
                <b>{interventions}</b> interventions
              </Typography>
            )}
            {amendements !== undefined && (
              <Typography variant="body2">
                <b>{amendements}</b> amendements
              </Typography>
            )}
          </Box>
        )}

        <Stack direction="row" spacing={2}>
          {etape && <StatusChip size="small" status="review" label={etape} />}
          {thematique && <LabelChip size="small" label={thematique} />}
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default DossierCard;
