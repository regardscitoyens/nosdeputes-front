import React from "react";

import { PreviewTab } from "@/components/folders/PreviewTab";

import { getDossier } from "@/repository/database";

export default async function Page({
  params,
}: {
  params: { legislature: string; id: string };
}) {
  const dossier = await getDossier(params.legislature, params.id);

  if (dossier === undefined) {
    return <p>Dossier Not Found</p>;
  }
  return <PreviewTab dossier={dossier} />;
}
