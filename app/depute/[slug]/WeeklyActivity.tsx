"use client";
import * as React from "react";
import { StateHebdoType } from "@prisma/client";
import { getMondayDate, getWeekIndex } from "./getWeekIndex";
import {
  BarPlot,
  ChartsAxis,
  ChartsAxisHighlight,
  ChartsTooltip,
  LinePlot,
  ChartContainer,
  useDrawingArea,
  useXScale,
} from "@mui/x-charts";

const POINTS_NUMBER = 50;

export type WeeklyStatsProps = {
  deputeWeeklyActivity: {
    semaineIndex: number;
    valeur: number;
    type: StateHebdoType;
    acteurUid: string;
  }[];
  statsOnWeeklyActivity: {
    semaineIndex: number;
    valeur: number;
    type: StateHebdoType;
    acteurUid: string;
  }[];
};

type WeekActivity = {
  [key in StateHebdoType]: {
    depute?: number;
    max?: number;
    median?: number;
  };
};

export default function WeeklyStats(props: WeeklyStatsProps) {
  const groupedPerWeek: Record<number, WeekActivity> = {};

  for (const activity of [
    ...props.deputeWeeklyActivity,
    ...props.statsOnWeeklyActivity,
  ]) {
    if (groupedPerWeek[activity.semaineIndex] === undefined) {
      groupedPerWeek[activity.semaineIndex] = {} as WeekActivity;
    }

    if (groupedPerWeek[activity.semaineIndex][activity.type] === undefined) {
      groupedPerWeek[activity.semaineIndex][activity.type] = {};
    }

    switch (activity.acteurUid) {
      case "median":
        groupedPerWeek[activity.semaineIndex][activity.type].median =
          activity.valeur;
        break;
      case "max":
        groupedPerWeek[activity.semaineIndex][activity.type].max =
          activity.valeur;
        break;
      default:
        groupedPerWeek[activity.semaineIndex][activity.type].depute =
          activity.valeur;
        break;
    }
  }

  const currentWeekIndex = getWeekIndex(17, new Date());

  const displayedWeekIndex = [...Array(POINTS_NUMBER)].map(
    (_, index) => currentWeekIndex - POINTS_NUMBER + index
  );

  const presenceDetecteeDataset = displayedWeekIndex.map((semaineIndex) => ({
    date: getMondayDate(17, semaineIndex),
    debat: groupedPerWeek[semaineIndex]?.presenceDetectee?.depute ?? 0,
    debatMedian: groupedPerWeek[semaineIndex]?.presenceDetectee?.median ?? 0,
    debatMax: groupedPerWeek[semaineIndex]?.presenceDetectee?.max ?? 0,

    presenceCommission:
      groupedPerWeek[semaineIndex]?.presenceCommision?.depute ?? 0,
    presenceCommissionMedian:
      groupedPerWeek[semaineIndex]?.presenceCommision?.median ?? 0,
    presenceCommissionMax:
      groupedPerWeek[semaineIndex]?.presenceCommision?.max ?? 0,
  }));

  const vacances = presenceDetecteeDataset
    .reduce<{ start: number; end: number }[]>((acc, week, index) => {
      if (week.debatMax !== 0 || week.presenceCommissionMax !== 0) {
        return acc;
      }
      if (acc.length === 0) {
        return [{ start: index, end: index + 1 }];
      }
      if (index === acc[acc.length - 1].end) {
        return [
          ...acc.slice(0, acc.length - 1),
          { ...acc[acc.length - 1], end: index + 1 },
        ];
      }

      return [...acc, { start: index, end: index + 1 }];
    }, [])
    .map(({ start, end }) => ({
      start: presenceDetecteeDataset[start].date,
      end: presenceDetecteeDataset[end - 1].date,
    }));

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
      series={[
        {
          dataKey: "presenceCommissionMedian",
          type: "line",
          stack: "mediane",
          color: "red",
          curve: "step",
          label: "mediane réunion commissions",
        },
        {
          dataKey: "presenceCommission",
          type: "bar",
          stack: "depute",
          color: "orange",
          label: "réunion commissions",
        },

        {
          dataKey: "debat",
          type: "bar",
          stack: "depute",
          color: "blue",

          label: "présence hémicicle",
        },
        {
          dataKey: "debatMedian",
          type: "line",
          stack: "mediane",
          color: "darkblue",
          curve: "step",
          label: "mediane présence hémicicle",
        },
      ]}
    >
      <BarPlot />
      <LinePlot />
      <ChartsAxis />
      <ChartsAxisHighlight x="band" />
      <VacanceParlementaire vacances={vacances} />
      <ChartsTooltip trigger="axis" />
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
