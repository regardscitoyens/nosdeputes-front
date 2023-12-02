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
  titre: string;
  status: string; //TODO: use an enum when the type of status will be clear
  thematique: string; // TODO: use an enum latter
  interventions: number;
  amendements: number;
};
const DossierCard = (props: DossierCardProps) => {
  const { titre, status, thematique, interventions, amendements } = props;

  return (
    <Card variant="outlined" sx={{ borderRadius: 1.25 }}>
      <CardActionArea
        component={Link}
        href="/dossiers/dossier"
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

        <Box
          sx={{
            display: "flew",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            mb: 2,
          }}
        >
          <Typography variant="body2">
            <b>{interventions}</b> interventions
          </Typography>
          <Typography variant="body2">
            <b>{amendements}</b> amendements
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <StatusChip size="small" status="review" label={status} />
          <LabelChip size="small" label={thematique} />
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default DossierCard;
