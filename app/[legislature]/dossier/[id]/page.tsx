import React from "react";

import { PreviewTab } from "@/app/[legislature]/dossier/[id]/PreviewTab";
import { getDossier } from "./dataFunctions";

export default async function Page({
  params,
}: {
  params: { legislature: string; id: string };
}) {
  const dossier = await getDossier(params.id);

  if (dossier === null) {
    return <p>Dossier Not Found</p>;
  }
  return <PreviewTab dossier={dossier} />;
}
