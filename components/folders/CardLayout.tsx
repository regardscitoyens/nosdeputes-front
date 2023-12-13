import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { CardHeader, CardHeaderProps, Theme, useTheme } from "@mui/material";

export interface CardLayoutProps
  extends Pick<CardHeaderProps, "title" | "action"> {
  children: React.ReactNode;
}

export const CardLayout = ({ title, action, children }: CardLayoutProps) => {
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
      <CardHeader
        title={title}
        titleTypographyProps={{
          variant: "body1",
          fontWeight: "regular",
        }}
        action={action}
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
};
