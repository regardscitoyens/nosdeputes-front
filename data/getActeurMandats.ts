import * as React from "react";
import { Mandat, Organe } from "@prisma/client";
import { getOrgane } from "./getOrgane";

export type MandatWithOrgane = Mandat & {
  organeRef: Organe | null;
};

async function getActeurMandatsUnCached(
  acteurUid: string
): Promise<MandatWithOrgane[]> {
  try {
    const rep = await fetch(
      `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/mandats?acteurRefUid=${acteurUid}&actif=true&perPage=100`
    );

    const { data } = (await rep.json()) as { data: Mandat[] };

    const organes = await Promise.all(
      data.map(async (item) =>
        item.organeRefUid === null ? null : await getOrgane(item.organeRefUid)
      )
    );

    return data.map((item, index) => ({
      ...item,
      organeRef: organes[index],
    }));
  } catch (error) {
    console.error("Error fetching dossier:", error);
    return [];
  }
}

export const getActeurMandats = React.cache(getActeurMandatsUnCached);
