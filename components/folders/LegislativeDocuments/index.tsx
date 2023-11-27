import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const LegislativeDocuments = () => {
  return (
    <Card elevation={0} sx={{ backgroundColor: "grey.50" }}>
      <CardContent sx={{ padding: 2 }}>
        <Typography variant="body1" fontWeight="bold" pb={2}>
          Document législatifs
        </Typography>
        {Array.from(Array(10).keys()).map((link) => (
          <Typography key={link} variant="body1" fontWeight="bold">
            Lien vers {link}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default LegislativeDocuments;
