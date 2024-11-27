import * as React from "react";
import { getWeekIndex, getMondayDate } from "../getWeekIndex";
import {
  DeputeWeeklyActivity,
  StatsOnWeeklyActivity,
  WeekActivity,
} from "./WeeklyActivity.type";

const POINTS_NUMBER = 50;

export function useAgregateWeeklyStats(props: {
  deputeWeeklyActivity: DeputeWeeklyActivity[];
  statsOnWeeklyActivity: StatsOnWeeklyActivity[];
}) {
  const groupedPerWeek = React.useMemo(() => {
    const value: Record<number, WeekActivity> = {};
    for (const activity of [
      ...props.deputeWeeklyActivity,
      ...props.statsOnWeeklyActivity,
    ]) {
      if (value[activity.semaineIndex] === undefined) {
        value[activity.semaineIndex] = {} as WeekActivity;
      }

      if (value[activity.semaineIndex][activity.type] === undefined) {
        value[activity.semaineIndex][activity.type] = {};
      }

      switch (activity.acteurUid) {
        case "median":
          value[activity.semaineIndex][activity.type].median = activity.valeur;
          break;
        case "max":
          value[activity.semaineIndex][activity.type].max = activity.valeur;
          break;
        default:
          value[activity.semaineIndex][activity.type].depute = activity.valeur;
          break;
      }
    }

    return value;
  }, [props.deputeWeeklyActivity, props.statsOnWeeklyActivity]);

  const currentWeekIndex = getWeekIndex(17, new Date());

  const presenceDetecteeDataset = React.useMemo(
    () =>
      [...Array(POINTS_NUMBER)]
        .map((_, index) => currentWeekIndex - POINTS_NUMBER + index)
        .map((semaineIndex) => ({
          date: getMondayDate(17, semaineIndex),
          debat: groupedPerWeek[semaineIndex]?.presenceDetectee?.depute ?? 0,
          debatMedian:
            groupedPerWeek[semaineIndex]?.presenceDetectee?.median ?? 0,
          debatMax: groupedPerWeek[semaineIndex]?.presenceDetectee?.max ?? 0,

          presenceCommission:
            groupedPerWeek[semaineIndex]?.presenceCommision?.depute ?? 0,
          presenceCommissionMedian:
            groupedPerWeek[semaineIndex]?.presenceCommision?.median ?? 0,
          presenceCommissionMax:
            groupedPerWeek[semaineIndex]?.presenceCommision?.max ?? 0,
        })),
    [currentWeekIndex, groupedPerWeek]
  );

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

  return { presenceDetecteeDataset, vacances };
}
