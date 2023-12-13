import React from "react";

import { PreviewTab } from "@/components/folders/PreviewTab";

import { getDossier } from "@/repository/database";

export default async function Page({
  params,
}: {
  params: { legislature: string; id: string };
}) {
  const dossier = await getDossier(params.legislature, params.id);
  console.log({ params, dossier });
  return <PreviewTab />;
}
