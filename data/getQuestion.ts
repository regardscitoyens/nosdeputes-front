import * as React from "react";
import { Question, Organe } from "@prisma/client";
import { getOrgane } from "./getOrgane";

async function getQuestionUnCached(
  acteurUid: string
): Promise<ReturnedGetQuestion[]> {
  try {
    if (acteurUid === "") {
      return [];
    }

    const rep = await fetch(
      `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/questions/?acteurRefUid=${acteurUid}`
    );

    const { data } = (await rep.json()) as { data: Question[] };

    const groupes = await Promise.all(
      data.map(async (item) =>
        item.minIntRefUid === null ? null : await getOrgane(item.minIntRefUid)
      )
    );

    return data.map((item, index) => ({
      ...item,
      dateCloture: item.dateCloture ? new Date(item.dateCloture) : null,
      dateDepotSignal: item.dateDepotSignal
        ? new Date(item.dateDepotSignal)
        : null,
      dateDepot: item.dateDepot ? new Date(item.dateDepot) : null,
      dateMaj: new Date(item.dateMaj),
      ministerInteroge: groupes[index],
    }));
  } catch (error) {
    console.error("Error fetching dossier:", error);
    return [];
  }
}

export type ReturnedGetQuestion = Question & {
  ministerInteroge: Organe | null;
};

export const getQuestion = React.cache(getQuestionUnCached);
