import * as React from "react";
import { AuteurDocument, CoSignataireDocument, Document } from "@prisma/client";

export type ReturnedDocument = Document & {
  coSignataires?: CoSignataireDocument[];
  // auteurs?: AuteurDocument[];
  _count: {
    amendements: number;
  };
};
async function getDocumentUnCached(
  uid: string
): Promise<ReturnedDocument | null> {
  try {
    const rep = await fetch(
      `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/documents/${uid}?include=coSignataires,_count.amendements`
    );

    const { data } = await rep.json();

    return data;
  } catch (error) {
    console.error("Error fetching dossier:", error);
    return null;
  }
}

export const getDocument = React.cache(getDocumentUnCached);
