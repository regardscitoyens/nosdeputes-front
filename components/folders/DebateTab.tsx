import React, { Suspense } from "react";
import { getAgendas, getParagraphs, getPtsOdj } from "@/repository/database";
import { DebatePage } from "./DebatePage";


interface DebatTableProps {
  /**
   * L'id du dossier
   */
  id: string;
}

export async function DebateTab(props: DebatTableProps) {
  const { id } = props;

  const seen = new Set();
  const actesLegislatifsWithDebate = await getReunions(id);

  // const paragraphs = await getParagraphs(debats.map((x) => x.compteRenduRef));

  return <pre>{JSON.stringify(actesLegislatifsWithDebate, null, 2)}</pre>;
  return (
    <Suspense fallback={<>Loading...</>}>
      <DebatePage actesLegislatifsWithDebate={actesLegislatifsWithDebate} />
    </Suspense>
  );
}
