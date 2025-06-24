import * as React from "react";
import { ActeLegislatif, Dossier, Rapporteur } from "@prisma/client";
import { parseActeLefislatif } from "./parsers/parseActeLegislatif";
import { parseDossier } from "./parsers/parseDossier";

export type ReturnedDossier = Dossier & {
  actesLegislatifs: ActeLegislatif[];
  rapporteurs: Rapporteur[];
};
async function getDossierUnCached(uid: string): Promise<
  | (Dossier & {
      actesLegislatifs: ActeLegislatif[];
      rapporteurs: Rapporteur[];
    })
  | null
> {
  try {
    const rep = await fetch(
      `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/dossiers/${uid}?include=actesLegislatifs,rapporteurs`
    );

    const { data } = await rep.json();

    // Transforms all the "yyy-mm-dd" string into Date objects.
    parseDossier(data);
    data?.actesLegislatifs?.forEach((_: any, i: number) =>
      parseActeLefislatif(data.actesLegislatifs[i])
    );

    return data;
  } catch (error) {
    console.error("Error fetching dossier:", error);
    return null;
  }
}

export const getDossier = React.cache(getDossierUnCached);

export function getDocumentsUid(dossier: ReturnedDossier | null) {
  if (dossier === null) {
    return [];
  }
  return Array.from(
    new Set(
      dossier.actesLegislatifs.flatMap((act) =>
        [act.texteAdopteRefUid, act.texteAssocieRefUid].filter(
          (id) => id !== null
        )
      )
    )
  );
}
