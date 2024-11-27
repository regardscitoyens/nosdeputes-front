import { StateHebdoType } from "@prisma/client";

export type DeputeWeeklyActivity = {
  semaineIndex: number;
  valeur: number;
  type: StateHebdoType;
  acteurUid: string;
};

export type StatsOnWeeklyActivity = {
  semaineIndex: number;
  valeur: number;
  type: StateHebdoType;
  acteurUid: string;
};

export type WeekActivity = {
  [key in StateHebdoType]: {
    depute?: number;
    max?: number;
    median?: number;
  };
};
