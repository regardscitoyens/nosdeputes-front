import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import DeputyPreview from "../DeputyPreview";

const CommiteeCard = () => {
  const theme = useTheme();
  return (
    <Card elevation={0} sx={{ backgroundColor: theme.palette.grey[50] }}>
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
