import React from "react";
import { ActeLegislatif } from "@/repository/types";
import { getAgendas, getParagraphs, getPtsOdj } from "@/repository/database";
import { DebatePage } from "./DebatePage";

const CODE_ACTS_AVEC_DEBAT = [
  "AN1-DEBATS-SEANCE",
  "AN2-DEBATS-SEANCE",
  "AN21-DEBATS-SEANCE",
  "AN3-DEBATS-SEANCE",
  "ANLDEF-DEBATS-SEANCE",
  "ANLUNI-DEBATS-SEANCE",
  "ANNLEC-DEBATS-SEANCE",
  "CMP-DEBATS-AN-SEANCE",
  "CMP-DEBATS-SN-SEANCE",
];

interface DebatTableProps {
  actesLegislatifs: ActeLegislatif[];
}

export async function DebateTab(props: DebatTableProps) {
  const { actesLegislatifs } = props;

  const seen = new Set();
  const reunionsIds = actesLegislatifs
    .filter((act) => CODE_ACTS_AVEC_DEBAT.includes(act.codeActe))
    .map((act) => act.reunionRefUid)
    .filter((id) => !!id)
    .filter((id) => {
      // Remove duplicates
      if (seen.has(id)) {
        return false;
      }
      seen.add(id);
      return true;
    });

  const agendas = await getAgendas(reunionsIds);
  const ptOdj = await getPtsOdj(reunionsIds);
  ptOdj.sort((a, b) => (a.uid < b.uid ? -1 : 1));

  const debats = agendas
    .map((agenda) => {
      const act = actesLegislatifs.find((a) => a.reunionRefUid === agenda.uid);
      if (!act) {
        return {};
      }

      return {
        ...agenda,
        ptIndex:
          ptOdj
            .filter((pt) => pt.agendaRefUid === agenda.uid)
            .findIndex((pt) => pt.uid === act.odjRefUid) + 1,
      };
    })
    .filter((x) => x.compteRenduRef && x.ptIndex)
    .sort((a, b) => (a.timestampDebut < b.timestampDebut ? -1 : 1));

  const paragraphs = await getParagraphs(debats.map((x) => x.compteRenduRef));

  return <DebatePage debats={debats} paragraphs={paragraphs} />;
}
