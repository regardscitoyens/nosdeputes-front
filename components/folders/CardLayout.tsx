import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Theme, useTheme } from "@mui/material";

export interface CardLayoutProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
}

export const CardLayout = ({ title, children }: CardLayoutProps) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        pb: 0,
        mb: 0,
        borderRadius: 2,
        boxShadow:
          "0px 2px 4px 0px rgba(26, 32, 44, 0.08), 0px 1px 2px 0px rgba(26, 32, 44, 0.08)",
      }}
    >
      <CardContent>
        <Typography variant="body1" fontWeight="regular" sx={{ pb: 3 }}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};
