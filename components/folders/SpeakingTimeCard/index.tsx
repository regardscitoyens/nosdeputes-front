import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

import CardLayout from "@/components/folders/CardLayout";
import { PartisKeys, partis } from "@/components/const";

// TODO: remove when we get access to real data
const DEFAULT_SPEEAKING_TIME: SpeakingTimeCardProps["speakingTime"] = [
  { parti: "LFI", time: 150 },
  { parti: "GDR", time: 50 },
  { parti: "SOC", time: 150 },
  { parti: "ECO", time: 50 },
  { parti: "LIOT", time: 150 },
  { parti: "REN", time: 50 },
  { parti: "MODEM", time: 250 },
  { parti: "HOR", time: 50 },
  { parti: "LR", time: 150 },
  { parti: "RN", time: 50 },
  { parti: "NI", time: 150 },
];

type SpeakingTimeCardProps = {
  speakingTime: { parti: PartisKeys; time: number }[];
};

const SpeakingTimeCard = (props: SpeakingTimeCardProps) => {
  const { speakingTime = DEFAULT_SPEEAKING_TIME } = props;
  const theme = useTheme();

  const totalTime = speakingTime.reduce((acc, val) => {
    return val.time + acc;
  }, 0);

  return (
    <CardLayout title={"Temps de parole par groupe"} variant="primary">
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        {speakingTime.map(({ parti, time }) => (
          <div
            key={parti}
            style={{
              height: 8,
              backgroundColor: partis[parti].color,
              borderRadius: 4,
              flex: time / totalTime,
            }}
          />
        ))}
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        justifyContent="center"
      >
        {speakingTime.map(({ parti, time }) => {
          const { fullName, color, group } = partis[parti];
          return (
            <Typography key={parti} fontWeight="bold" variant="caption">
              {parti}
              {group ? ` - ${group}` : ""} :{" "}
              {((100 * time) / totalTime).toFixed(1).replace(".0", "")}%
            </Typography>
          );
        })}
      </Stack>
    </CardLayout>
  );
};

export default SpeakingTimeCard;
