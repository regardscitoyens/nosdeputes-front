import * as React from "react";
import { Agenda, PointOdj } from "@prisma/client";

async function getPointsOdjUnCached(
  dossierUid: string
): Promise<ReturnedPointsOdj[] | null> {
  try {
    const rep = await fetch(
      `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/points_odj/?dossierLegislatifUid=${dossierUid}&include=agendaRef&perPage=100`
    );

    const { data } = (await rep.json()) as { data: ReturnedPointsOdj[] };

    data.forEach((item) => {
      if (item.agendaRef && item.agendaRef.timestampDebut) {
        item.agendaRef.timestampDebut = new Date(item.agendaRef.timestampDebut);
      }
    });

    return data;
  } catch (error) {
    console.error("Error fetching dossier:", error);
    return null;
  }
}

export type ReturnedPointsOdj = PointOdj & { agendaRef?: Agenda };

export const getPointsOdj = React.cache(getPointsOdjUnCached);
