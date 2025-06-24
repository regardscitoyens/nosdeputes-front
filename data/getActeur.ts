import * as React from "react";
import { Acteur, Mandat, Organe } from "@prisma/client";
import { getOrgane } from "./getOrgane";

async function getActeurUnCached(uid: string): Promise<
  | (Acteur & {
      groupeParlementaire: Organe | null;
      mandatPrincipal: Mandat | null;
    })
  | null
> {
  try {
    const rep = await fetch(
      `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/acteurs/${uid}?include=mandatPrincipal`
    );

    const { data } = await rep.json();

    data.groupeParlementaire = null;
    if (data.groupeParlementaireUid) {
      data.groupeParlementaire = await getOrgane(data.groupeParlementaireUid);
    }
    return data;
  } catch (error) {
    console.error("Error fetching dossier:", error);
    return null;
  }
}

export type ReturnedActeur = Acteur & {
  groupeParlementaire: Organe | null;
  mandatPrincipal: Mandat | null;
};
export const getActeur = React.cache(getActeurUnCached);
