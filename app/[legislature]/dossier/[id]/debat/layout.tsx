import React from "react";
import { DebateFilterBar } from "./DebateFilterBar";
import { getPointsOdj } from "@/data/getPointsOdj";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{
    legislature: string;
    id: string;
  }>;
  children: React.ReactNode;
}) {
  const { id } = await params;

  const pointsOdj = await getPointsOdj(id);

  const odjWithDebat = pointsOdj?.filter(
    (pt) => pt.agendaRef?.compteRenduDisponible === true
  );
  if (odjWithDebat == null || odjWithDebat.length === 0) {
    return <p>Aucun débat n&apos;a été trouvé pour ce dossier legislatif.</p>;
  }

  return (
    <>
      <DebateFilterBar pointsOdj={odjWithDebat} />
      <div className="container">{children}</div>
    </>
  );
}
