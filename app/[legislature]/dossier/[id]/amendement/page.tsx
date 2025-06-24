import React from "react";

import { AmendementTab } from "./AmendementTab";
import { getDocumentsUid, getDossier } from "@/data/getDossier";
import { getDocument } from "@/data/getDocument";

export default async function Page({
  params,
}: {
  params: Promise<{ legislature: string; id: string }>;
}) {
  return <p>Page en construction 🚧</p>;
  // const { id } = await params;
  // const dossier = await getDossier(id);

  // const documents = await Promise.all(
  //   getDocumentsUid(dossier).map((documentUid) => getDocument(documentUid))
  // );

  // if (dossier === null) {
  //   return <p>Le dossier n&apos;a pas été trouvé</p>;
  // }

  // return <AmendementTab dossier={dossier} documents={documents} />;
}
