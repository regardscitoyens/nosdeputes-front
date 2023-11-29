import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface CardLayoutProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  variant: "primary" | "secondary";
}

const CardLayout = ({ title, children, variant }: CardLayoutProps) => {
  const cardBackgroundColor = variant === "primary" ? "white" : "grey.50";
  const cardBoxShadow =
    variant === "primary"
      ? "0px 2px 4px 0px rgba(26, 32, 44, 0.08), 0px 1px 2px 0px rgba(26, 32, 44, 0.08)"
      : "none";
  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: cardBackgroundColor,
        boxShadow: cardBoxShadow,
      }}
    >
      <CardContent sx={{ padding: 2 }}>
        <Typography variant="body1" fontWeight="regular" pb={3}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default CardLayout;
