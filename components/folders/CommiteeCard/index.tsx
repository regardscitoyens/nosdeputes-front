import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeputyPreview from "../DeputyPreview";

const CommiteeCard = () => {
  return (
    <Card elevation={0} sx={{ backgroundColor: "grey.50" }}>
      <CardContent sx={{ padding: 2 }}>
        <Typography variant="body1" fontWeight="bold" pb={2}>
          Comission
        </Typography>
        <Typography variant="body2" fontWeight="light" pb={1}>
          Commission de travail parlementaire
        </Typography>
        <Typography variant="body2" fontWeight="bold" pb={2}>
          Commission du développement durable
        </Typography>
        <Typography variant="body2" fontWeight="light" pb={1}>
          Rapporteur
        </Typography>

        <DeputyPreview />
      </CardContent>
    </Card>
  );
};

export default CommiteeCard;
