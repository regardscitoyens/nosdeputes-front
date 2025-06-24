"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import WeeklyActivityChart from "./WeeklyActivityChart";
import { MenuItem, Select, Stack } from "@mui/material";
import { StatistiqueHebdomadaire } from "@prisma/client";

export default function WeeklyActivitySectionClient(props: {
  presenceDetectee: StatistiqueHebdomadaire[];
  presenceCommision: StatistiqueHebdomadaire[];
  presenceDetecteeMax: StatistiqueHebdomadaire[];
  presenceDetecteeMediane: StatistiqueHebdomadaire[];
  presenceCommisionMax: StatistiqueHebdomadaire[];
  presenceCommisionMediane: StatistiqueHebdomadaire[];
}) {
  const [activityType, setActivityType] = React.useState<
    "commission" | "hemicicle"
  >("hemicicle");

  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" component="h2">
          Présences et participations
        </Typography>
        <Select
          variant="outlined"
          value={activityType}
          onChange={(event) =>
            setActivityType(event.target.value as "commission" | "hemicicle")
          }
        >
          <MenuItem value="hemicicle">Hémicicle</MenuItem>
          <MenuItem value="commission">Commissions</MenuItem>
        </Select>
      </Stack>
      <WeeklyActivityChart {...props} activityType={activityType} />
    </div>
  );
}
