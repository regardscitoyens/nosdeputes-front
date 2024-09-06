import { prisma } from "@/prisma";
import React, { Suspense } from "react";
import { DebateFilterBar } from "./DebateFilterBar";

async function getReunionsUnCached(uid: string) {
  try {
    const dossier = await prisma.dossier.findFirst({
      where: { uid },
      include: {
        actesLegislatifs: {
          where: {
            agendaRef: { isNot: null },
          },
          include: {
            agendaRef: {
              select: {
                uid: true,
                libelleCourtLieu: true,
                libelleLongLieu: true,
                timestampDebut: true,
                timestampFin: true,
                compteRenduRef: true,
                pointsOdj: {
                  where: {
                    etat: { equals: "Confirmé" },
                  },
                  orderBy: { uid: "asc" },
                },
              },
            },
          },
        },
      },
    });

    const actesLegislatifs = dossier && dossier.actesLegislatifs;
    if (!actesLegislatifs) {
      return null;
    }
    return actesLegislatifs
      .map((act) => {
        if (act.agendaRef === null) {
          return null;
        }

        const pts = act.agendaRef.pointsOdj.filter(
          (pt) => pt.dossierLegislatifUid === actesLegislatifs[0].dossierRefUid
        );

        const pointIndex =
          1 +
          (act.agendaRef.pointsOdj.findIndex(
            (pt) => pt.uid === act.pointOdjUid
          ) ?? -1);

        const {
          uid,
          libelleCourtLieu,
          libelleLongLieu,
          timestampDebut,
          timestampFin,
          compteRenduRef,
        } = act.agendaRef;

        return {
          uid,
          libelleCourtLieu,
          libelleLongLieu,
          timestampDebut,
          timestampFin,
          compteRenduRef,
          pointIndex,
        };
      })
      .filter((agenda) => agenda !== null) // Extracted just for TS to understand
      .filter((agenda) => agenda.compteRenduRef !== null)
      .filter(
        // Otherwise we have an issue. TODO: throw an error instead of silently failing.
        (agenda) => agenda.pointIndex > 0 && agenda.timestampDebut
      )
      .sort((a, b) => (a.timestampDebut! > b.timestampDebut! ? -1 : 1));
  } catch (error) {
    console.error("Error fetching depute:", error);
    throw error;
  }
}

const getReunions = React.cache(getReunionsUnCached);

export default async function Layout({
  params,
  children,
}: {
  params: {
    legislature: string;
    id: string;
  };
  children: React.ReactNode;
}) {
  const reunions = await getReunions(params.id);

  if (!reunions) {
    return <p>Aucun débat n&apos;a été trouvé pour ce dossier legislatif.</p>;
  }
  return (
    <>
      <DebateFilterBar reunions={reunions} />

      <div className="container">{children}</div>
    </>
  );
}
