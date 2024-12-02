"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  DeputeWeeklyActivity,
  StatsOnWeeklyActivity,
} from "./WeeklyActivity.type";
import WeeklyActivityChart from "./WeeklyActivityChart";
import { MenuItem, Select, Stack } from "@mui/material";

export default function WeeklyActivitySection(props: {
  deputeWeeklyActivity: DeputeWeeklyActivity[];
  statsOnWeeklyActivity: StatsOnWeeklyActivity[];
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
      <WeeklyActivityChart {...props} activityType={activityType} />;
    </div>
  );
}
