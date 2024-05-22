import React from "react";

import { PreviewTab } from "@/components/folders/PreviewTab";
import { AmendementTab } from "@/components/folders/AmendementTab";
import { DebateTab } from "@/components/folders/DebateTab";
import {
  getDossier,
  getDossierAmendements,
  getDossierVotes,
} from "@/repository/database";
import VotesTab from "@/components/folders/VotesTab";

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
  const amendements = await getDossierAmendements(
    params.legislature,
    params.id
  );
  const { votes, acts } =
    (await getDossierVotes(params.legislature, params.id)) ?? {};

  if (!dossier) {
    return null;
  }

  switch (params.tab) {
    case "debat":
      return <DebateTab actesLegislatifs={dossier.acts} />;

    case "amendement":
      if (!amendements) {
        return null;
      }
      return (
        <AmendementTab
          amendements={amendements}
          documents={dossier?.documents}
          amendementCount={dossier?.amendementCount}
        />
      );

    case "votes":
      return <VotesTab votes={votes ?? []} acts={acts ?? []} />;

    default:
      return <PreviewTab dossier={dossier} />;
  }
}
