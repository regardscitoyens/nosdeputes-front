import * as React from "react";
import { Stats } from "@prisma/client";

async function getActeurStatsUnCached(): Promise<Stats[] | null> {
  try {
    const stats = await fetch(
      `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/stats/?type=ACTEUR&chambre=AN&perPage=100`
    );

    const { data } = await stats.json();

    return data;
  } catch (error) {
    console.error("Error fetching dossier:", error);
    return null;
  }
}
export const getActeurStats = React.cache(getActeurStatsUnCached);
