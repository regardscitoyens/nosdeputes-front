import React from "react";

import { PreviewTab } from "@/components/folders/PreviewTab";
import { AmendementTab } from "@/components/folders/AmendementTab";
import { DebateTab } from "@/components/folders/DebateTab";
import { getDossier } from "@/repository/database";
import { AmendementsFilterState } from "@/components/folders/AmendementTab/useFilter";

export const dynamicParams = true;

export async function generateStaticParams() {
  return [{ tab: "debat" }, { tab: "amendement" }, { tab: "votes" }];
}

export default async function Page({
  params,
}: // searchParams,
{
  params: {
    legislature: string;
    id: string;
    tab: string;
  };
  // searchParams: Partial<AmendementsFilterState>;
}) {
  const dossier = await getDossier(params.legislature, params.id);

  switch (params.tab) {
    case "debat":
      return <DebateTab />;

    case "amendement":
      return <AmendementTab dossier={dossier} />;

    case "votes":
      return <p>Votes</p>;

    default:
      return <PreviewTab dossier={dossier} />;
  }
}
