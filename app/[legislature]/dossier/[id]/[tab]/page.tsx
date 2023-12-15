import React from "react";

import { PreviewTab } from "@/components/folders/PreviewTab";
import { DebateTab } from "@/components/folders/DebateTab";
import { getDossier } from "@/repository/database";

export const dynamicParams = true;

export async function generateStaticParams() {
  return [{ tab: "debat" }, { tab: "amendement" }, { tab: "votes" }];
}

export default async function Page({
  params,
}: {
  params: {
    legislature: string;
    id: string;
    tab: string;
  };
}) {
  const dossier = await getDossier(params.legislature, params.id);

  switch (params.tab) {
    case "debat":
      return <DebateTab />;

    case "amendement":
      return <p>Amendements</p>;

    case "votes":
      return <p>Votes</p>;

    default:
      return <PreviewTab />;
  }
}
