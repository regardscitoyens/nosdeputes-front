import * as React from "react";
import { Metrique } from "@prisma/client";
import { getActeurBySlug } from "./getActeurBySlug";

async function getActeurMetriquesUnCached(
  uid: string
): Promise<Metrique[] | null> {
  try {
    const metriques = await fetch(
      `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/metriques/?type=ACTEUR&objectUid=${uid}&perPage=100`
    );

    const { data } = await metriques.json();

    return data;
  } catch (error) {
    console.error("Error fetching dossier:", error);
    return null;
  }
}

export const getActeurMetriques = React.cache(getActeurMetriquesUnCached);
