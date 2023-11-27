import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DeputyPreview from "../DeputyPreview";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const AdditionalInfoCard = () => {
  return (
    <Card elevation={0} sx={{ backgroundColor: "grey.50" }}>
      <CardContent sx={{ padding: 2 }}>
        <Typography variant="body1" fontWeight="bold" pb={2}>
          Informations complémentaires
        </Typography>
        <Typography variant="body2" fontWeight="light" pb={1}>
          Amendements
        </Typography>
        <Typography variant="body2" fontWeight="bold" pb={2}>
          411
        </Typography>
        <Stack direction="column" spacing={2}>
          <Stack direction="column" spacing={1}>
            <Typography variant="body2" fontWeight="light">
              Co-signataires
            </Typography>
            <DeputyPreview />
            <DeputyPreview />
            <DeputyPreview />
            <DeputyPreview />
            <Button fullWidth variant="contained">
              Tous les signataires (7)
            </Button>
          </Stack>
          <Stack direction="column" spacing={1}>
            <Typography variant="body2" fontWeight="light">
              Orateurs
            </Typography>
            <DeputyPreview />
            <DeputyPreview />
            <DeputyPreview />
            <DeputyPreview />
            <Button fullWidth variant="contained">
              Tous les orateurs (34)
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AdditionalInfoCard;
