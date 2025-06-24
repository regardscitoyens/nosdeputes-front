import * as React from "react";
import { Acteur, Mandat, Organe } from "@prisma/client";
import { unique } from "@/utils/unique";
import { getOrgane } from "./getOrgane";

/**
 *
 * @param legislature Revois la liste des deputes pour une legislature donnée
 * @returns
 */
async function getDeputesUnCached(legislature: number): Promise<{
  acteurs: Record<string, Acteur & { mandatPrincipal: Mandat }>;
  groups: Record<string, Organe>;
} | null> {
  try {
    const rep = await fetch(
      `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/acteurs/?chambre=AN&dataset=${legislature}&perPage=1000&include=mandatPrincipal`
    );

    const { data } = (await rep.json()) as {
      data: (Acteur & { mandatPrincipal: Mandat })[];
    };

    const groupsUid = unique(data.map((item) => item.groupeParlementaireUid));

    const groupsArray = await Promise.all(
      groupsUid.map(async (uid) => (uid === null ? null : await getOrgane(uid)))
    );

    const acteurs = Object.fromEntries(data.map((item) => [item.uid, item]));
    const groups = Object.fromEntries(
      groupsArray
        .filter((item) => item !== null)
        .map((item) => [item.uid, item])
    );

    return { acteurs, groups };
  } catch (error) {
    console.error("Error fetching dossier:", error);
    return null;
  }
}

export const getDeputes = React.cache(getDeputesUnCached);
