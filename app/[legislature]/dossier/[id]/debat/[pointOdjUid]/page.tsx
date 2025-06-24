import * as React from "react";
import { DebateSummary } from "./DebateSummary";
import { SUMMARY_CODES } from "@/components/const";
import { DebateTranscript } from "./DebateTranscript";

import { Agenda, Paragraphe, PointOdj } from "@prisma/client";

async function getParagraphesUnCached(
  uid: string
): Promise<
  (PointOdj & { interventions: Paragraphe[]; agendaRef: Agenda }) | null
> {
  try {
    const rep = await fetch(
      `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/points_odj/${uid}?include=interventions,agendaRef`
    );

    const { data } = await rep.json();

    data.interventions.sort(
      (a: Paragraphe, b: Paragraphe) =>
        (a.ordreAbsoluSeance ?? 0) - (b.ordreAbsoluSeance ?? 0)
    );

    return data;
  } catch (error) {
    console.error("Error fetching dossier:", error);
    return null;
  }
}

const getParagraphes = React.cache(getParagraphesUnCached);

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; pointOdjUid: string }>;
}) {
  const { id: dossierUid, pointOdjUid } = await params;

  const data = await getParagraphes(pointOdjUid);

  if (!data || !data.interventions || data.interventions.length === 0) {
    return <p>Aucun debat trouvé pour cette seance.</p>;
  }

  let lastId = "init";

  const wordsCounts: Record<string, number> = data.interventions.reduce(
    (acc, paragraphe) => {
      const { codeGrammaire, texte } = paragraphe;

      if (SUMMARY_CODES.includes(codeGrammaire!)) {
        lastId = paragraphe.id.toString();
        return { ...acc, [lastId]: 0 };
      }

      if (["PAROLE_GENERIQUE", "INTERRUPTION_1_10"].includes(codeGrammaire!)) {
        const texteLength = texte ? texte.split(" ").length : 0;
        return {
          ...acc,
          [lastId]: acc[lastId] + texteLength,
        };
      }
      return acc;
    },
    {
      init: 0,
    } as Record<string, number>
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 24,
          flex: 2,
        }}
      >
        <DebateSummary
          // wordsCounts={wordsCounts}
          sections={data.interventions.filter((p) =>
            SUMMARY_CODES.includes(p.codeGrammaire!)
          )}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 5 }}>
        <DebateTranscript
          title={`${
            data.agendaRef?.libelleCourtLieu ??
            data.agendaRef?.libelleLongLieu ??
            ""
          }, le ${
            data.agendaRef?.timestampDebut?.toLocaleString("fr-FR", {
              month: "long",
              day: "numeric",
              weekday: "long",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            }) ?? ""
          }`}
          paragraphes={data.interventions}
          wordsCounts={wordsCounts}
        />
      </div>
    </>
  );
}
