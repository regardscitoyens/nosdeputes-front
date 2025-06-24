import * as React from "react";
import { Organe } from "@prisma/client";

async function getOrganeUnCached(uid: string): Promise<Organe | null> {
  try {
    const rep = await fetch(`${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/organes/${uid}`);

    const { data } = await rep.json();

    return data;
  } catch (error) {
    console.error("Error fetching dossier:", error);
    return null;
  }
}

export const getOrgane = React.cache(getOrganeUnCached);
