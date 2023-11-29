import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import CardLayout from "@/components/folders/CardLayout";
import DeputyPreview from "@/components/folders/DeputyPreview";
import InfoIcon from "@/icons/InfoIcon";

const CommiteeCard = () => {
  return (
    <CardLayout title={"Commissions"} variant="secondary">
      <Stack direction="column" spacing={2}>
        <div>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2" fontWeight="light">
              Comission saisie au fond
            </Typography>
            <InfoIcon sx={{ fontSize: "14px" }} />
          </Stack>
          <Typography variant="body2" fontWeight="bold" pb={2}>
            Commission des affaires économiques
          </Typography>
        </div>
        <div>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="body2" fontWeight="light">
              Comission saisie pour avis
            </Typography>
            <InfoIcon sx={{ fontSize: "14px" }} />
          </Stack>
          <Typography variant="body2" fontWeight="bold" pb={2}>
            Commission du développement durable et de l&apos;aménagement du
            territoire
          </Typography>
        </div>
        <div>
          <Typography variant="body2" fontWeight="light" pb={1}>
            Rapporteur
          </Typography>
          <DeputyPreview />
        </div>
      </Stack>
    </CardLayout>
  );
};

export default CommiteeCard;
