import * as React from "react";
import {
  AdresseElectronique,
  AdressePostale,
  Mandat,
  Organe,
} from "@prisma/client";
import { getOrgane } from "./getOrgane";

export type MandatWithOrgane = Mandat & {
  organeRef: Organe | null;
};

async function getActeurAdressesElectroniquesUnCached(
  acteurUid: string
): Promise<AdresseElectronique[]> {
  try {
    const rep = await fetch(
      `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/adressesElectroniques?acteurRefUid=${acteurUid}`
    );

    const { data } = (await rep.json()) as { data: AdresseElectronique[] };

    return data;
  } catch (error) {
    console.error("Error fetching dossier:", error);
    return [];
  }
}

export const getActeurAdressesElectroniques = React.cache(
  getActeurAdressesElectroniquesUnCached
);

async function getActeurAdressesPostalesUnCached(
  acteurUid: string
): Promise<AdressePostale[]> {
  try {
    const rep = await fetch(
      `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/adressesPostales?acteurRefUid=${acteurUid}`
    );

    const { data } = (await rep.json()) as { data: AdressePostale[] };

    return data;
  } catch (error) {
    console.error("Error fetching dossier:", error);
    return [];
  }
}

export const getActeurAdressesPostales = React.cache(
  getActeurAdressesPostalesUnCached
);
