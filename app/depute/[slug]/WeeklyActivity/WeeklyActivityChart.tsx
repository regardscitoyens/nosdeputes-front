"use client";
import * as React from "react";
import {
  BarPlot,
  ChartsAxis,
  ChartsAxisHighlight,
  LinePlot,
  ChartContainer,
  useDrawingArea,
  useXScale,
  LineSeriesType,
  BarSeriesType,
  useAxisTooltip,
  ChartsTooltipContainer,
} from "@mui/x-charts";
import { useAgregateWeeklyStats } from "./useAgregateWeeklyStats";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { StatistiqueHebdomadaire } from "@prisma/client";

const seriesConfig: Record<
  "commission" | "hemicicle",
  (BarSeriesType | LineSeriesType)[]
> = {
  commission: [
    {
      id: "commission-stats",
      dataKey: "presenceCommissionMedian",
      type: "line",
      stack: "mediane",
      color: "red",
      curve: "step",
      label: "mediane réunion commissions",
    },
    {
      id: "commission-depute",
      dataKey: "presenceCommission",
      type: "bar",
      stack: "depute",
      color: "orange",
      label: "réunion commissions",
    },
  ],
  hemicicle: [
    {
      id: "hemicicle-depute",
      dataKey: "debat",
      type: "bar",
      stack: "depute",
      color: "blue",
      label: "présence hémicicle",
    },
    {
      id: "hemicicle-stats",
      dataKey: "debatMedian",
      type: "line",
      stack: "mediane",
      color: "darkblue",
      curve: "step",
      label: "mediane présence hémicicle",
    },
  ],
};

export default function WeeklyActivityChart(props: {
  presenceDetectee: StatistiqueHebdomadaire[];
  presenceCommision: StatistiqueHebdomadaire[];
  presenceDetecteeMax: StatistiqueHebdomadaire[];
  presenceDetecteeMediane: StatistiqueHebdomadaire[];
  presenceCommisionMax: StatistiqueHebdomadaire[];
  presenceCommisionMediane: StatistiqueHebdomadaire[];
  activityType: "commission" | "hemicicle";
}) {
  const { presenceDetecteeDataset, vacances } = useAgregateWeeklyStats(props);
  return (
    <ChartContainer
      height={300}
      dataset={presenceDetecteeDataset}
      xAxis={[
        {
          scaleType: "band",
          dataKey: "date",
          valueFormatter: (date, ctx) => {
            if (ctx.location === "tick") {
              return date.toLocaleDateString("fr-FR", {
                month: "long",
                year: "2-digit",
              });
            }
            return `Semaine du ${(date as Date).toLocaleDateString("fr-FR", {
              month: "short",
              day: "2-digit",
            })}`;
          },
          tickInterval: (_, index) => index % 10 === 5,
          // @ts-ignore
          categoryGapRatio: 0,
        },
      ]}
      series={seriesConfig[props.activityType]}
    >
      <BarPlot />
      <LinePlot />
      <ChartsAxis />
      <ChartsAxisHighlight x="band" />
      <VacanceParlementaire vacances={vacances} />
      <ChartsTooltipContainer trigger="axis">
        <TooltipContent dataset={presenceDetecteeDataset} />
      </ChartsTooltipContainer>
    </ChartContainer>
  );
}

type VacanceParlementaireProps = {
  vacances: { start: Date; end: Date }[];
};

function VacanceParlementaire({ vacances }: VacanceParlementaireProps) {
  const scale = useXScale<"band">();
  const drawingArea = useDrawingArea();

  return vacances.map(({ start, end }) => (
    <rect
      key={start.getTime()}
      x={scale(start)! - (scale.step() - scale.bandwidth()) / 2}
      y={drawingArea.top}
      height={drawingArea.height}
      width={scale(end)! - scale(start)! + scale.step()}
      stroke="none"
      fillOpacity={0.1}
    />
  ));
}

function TooltipContent({ dataset }: any) {
  const tooltipData = useAxisTooltip();

  if (tooltipData === null) {
    return null;
  }

  const vacance =
    !dataset[tooltipData.dataIndex]?.debatMax &&
    !dataset[tooltipData.dataIndex]?.presenceCommissionMax;

  return (
    <Paper sx={{ py: 1, px: 2 }}>
      <Typography variant="body2">{tooltipData.axisFormattedValue}</Typography>
      {vacance ? (
        <Typography>Vacance parlementaire</Typography>
      ) : (
        <Box sx={{ mt: 1 }}>
          {tooltipData.seriesItems.map((item) => {
            const isMedian = (item.seriesId as string).includes("stat");
            return (
              <Stack
                key={item.seriesId}
                direction="row"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: isMedian ? 2 : 10,
                    bgcolor: item.color,
                    mr: 1,
                  }}
                />
                <Typography>
                  {item.formattedLabel}: {item.formattedValue}
                </Typography>
              </Stack>
            );
          })}
        </Box>
      )}
    </Paper>
  );

  return <p>kjdfshks</p>;
}
