import * as React from "react";
import { Acteur, Organe, Mandat } from "@prisma/client";
import { getOrgane } from "./getOrgane";

async function searchActeurUnCached(
  search: string
): Promise<ReturnedSearchActeur[] | null> {
  try {
    if (search === "") {
      return [];
    }

    const rep = await fetch(
      `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/acteurs/?search=${search}&chambre=AN&include=mandatPrincipal`
    );

    const { data } = (await rep.json()) as {
      data: (Acteur & { mandatPrincipal: Mandat | null })[];
    };

    const groupes = await Promise.all(
      data.map(async (item) =>
        item.groupeParlementaireUid === null
          ? null
          : await getOrgane(item.groupeParlementaireUid)
      )
    );

    return data.map((item, index) => ({
      ...item,
      groupeParlementaire: groupes[index],
    }));
  } catch (error) {
    console.error("Error fetching dossier:", error);
    return null;
  }
}

export type ReturnedSearchActeur = Acteur & {
  groupeParlementaire: Organe | null;
  mandatPrincipal: Mandat | null;
};

export const searchActeur = React.cache(searchActeurUnCached);
