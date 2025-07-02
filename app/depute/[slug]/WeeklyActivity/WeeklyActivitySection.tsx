import * as React from "react";
import WeeklyActivitySectionClient from "./WeeklyActivitySectionClient";
import { StateHebdoType } from "@prisma/client";

const types: StateHebdoType[] = [
  "presenceDetectee",
  "presenceCommision",
  "amendementDepose",
];

const getHebdoStates = async (
  acteurUid: string,
  type: StateHebdoType,
  size: number = 100
) => {
  const rep = await fetch(
    `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/statistiqueHebdomadaire/?dataset=17&acteurUid=${acteurUid}&type=${type}&sort=semaineIndex.desc&perPage=${size}`
  );

  const { data = [] } = await rep.json();
  return data;
};

export default async function WeeklyActivitySection(props: {
  acteurUid: string;
}) {
  const [
    presenceDetectee,
    presenceCommision,
    presenceDetecteeMax,
    presenceDetecteeMediane,
    presenceCommisionMax,
    presenceCommisionMediane,
  ] = await Promise.all([
    getHebdoStates(props.acteurUid, "presenceDetectee"),
    getHebdoStates(props.acteurUid, "presenceCommision"),
    getHebdoStates("max", "presenceDetectee"),
    getHebdoStates("median", "presenceDetectee"),
    getHebdoStates("max", "presenceCommision"),
    getHebdoStates("median", "presenceCommision"),
  ]);
  return (
    <WeeklyActivitySectionClient
      presenceDetectee={presenceDetectee}
      presenceCommision={presenceCommision}
      presenceDetecteeMax={presenceDetecteeMax}
      presenceDetecteeMediane={presenceDetecteeMediane}
      presenceCommisionMax={presenceCommisionMax}
      presenceCommisionMediane={presenceCommisionMediane}
    />
  );
}
