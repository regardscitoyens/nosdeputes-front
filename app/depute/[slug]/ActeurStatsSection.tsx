import * as React from "react";
import { getActeurMetriques } from "@/data/getActeurMetriques";
import { getActeurStats } from "@/data/getActeurStats";
import { ActeurStatSectionClient } from "./ActeurStatSectionClient";

export async function ActeurStatsSection({ acteurUid }: { acteurUid: string }) {
  const deputeMetriquesData = await getActeurMetriques(acteurUid);
  const deputeStatsData = await getActeurStats();
  return (
    <ActeurStatSectionClient
      deputeMetriquesData={deputeMetriquesData ?? []}
      deputeStatsData={deputeStatsData ?? []}
    />
  );
}
