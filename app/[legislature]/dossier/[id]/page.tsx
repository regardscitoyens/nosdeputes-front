import React from "react";

import { PreviewTab } from "@/app/[legislature]/dossier/[id]/PreviewTab";
import { getDossier } from "@/data/getDossier";

export default async function Page({
  params,
}: {
  params: Promise<{ legislature: string; id: string }>;
}) {
  const { id } = await params;

  const dossier = await getDossier(id);

  if (dossier === null) {
    return <p>Dossier Not Found</p>;
  }
  return <PreviewTab dossier={dossier} />;
}
