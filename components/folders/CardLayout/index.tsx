import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DeputyPreview from "../DeputyPreview";

interface CardLayoutProps {
  title: string;
  children: React.ReactNode;
}

const CardLayout = ({ title, children }: CardLayoutProps) => {
  return (
    <Card elevation={0} sx={{ backgroundColor: "grey.50" }}>
      <CardContent sx={{ padding: 2 }}>
        <Typography variant="body1" fontWeight="bold" pb={3}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default CardLayout;
