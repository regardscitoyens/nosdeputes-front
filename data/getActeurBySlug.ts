import * as React from "react";
import { Acteur, Mandat, Organe } from "@prisma/client";
import { getOrgane } from "./getOrgane";

async function getActeurBySlugUnCached(slug: string): Promise<
  | (Acteur & {
      groupeParlementaire: Organe | null;
      mandatPrincipal: Mandat | null;
    })
  | null
> {
  try {
    const rep = await fetch(
      `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/acteurs/?slug=${slug}&include=mandatPrincipal`
    );

    const { data } = await rep.json();

    if (data.lenght === 0) {
      // Pas d'acteur trouvé
      return null;
    }

    const acteur = data[0];
    acteur.groupeParlementaire = null;
    if (acteur.groupeParlementaireUid) {
      acteur.groupeParlementaire = await getOrgane(
        acteur.groupeParlementaireUid
      );
    }
    return acteur;
  } catch (error) {
    console.error("Error fetching dossier:", error);
    return null;
  }
}

export type ReturnedActeur = Acteur & {
  groupeParlementaire: Organe | null;
  mandatPrincipal: Mandat | null;
};
export const getActeurBySlug = React.cache(getActeurBySlugUnCached);
