import React from "react";

import { AdditionalInfoCard } from "@/components/folders/AdditionalInfoCard";
import { CommissionsCard } from "./CommissionsCard";
import { CardLayout } from "@/components/folders/CardLayout";
import { LegislativeDocumentsCard } from "@/components/folders/LegislativeDocumentsCard";
import { TextStructureCard } from "@/components/folders/TextStructureCard";
import { TimelineCard } from "@/components/folders/TimelineCard";
import { SpeakingTime } from "@/components/folders/SpeakingTime";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Acteur } from "@/repository/types";
import { DossierData } from "@/repository/database";
import {
  getCommissionNomination,
  getCommissionUids,
  getDossier,
} from "@/app/[legislature]/dossier/[id]/dataFunctions";

type PreviewTabProps = {
  dossier?: Awaited<ReturnType<typeof getDossier>>;
};

export const PreviewTab = ({ dossier }: PreviewTabProps) => {
  const {
    // commissionFondId,
    // commissionAvisId,
    // organes = {},
    // rapporteursFondIds,
    // coSignatairesIds,
    // acteurs = {},
    // acts = [],
    // documents = [],
    // amendementCount = {},
    actesLegislatifs,
  } = dossier!;

  const commissionFondIds = getCommissionUids(actesLegislatifs, "FOND");
  const commissionAvisIds = getCommissionUids(actesLegislatifs, "AVIS");
  const commissionFondNomination = getCommissionNomination(
    actesLegislatifs,
    "FOND"
  );
  const commissionAvisNomination = getCommissionNomination(
    actesLegislatifs,
    "AVIS"
  );
  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          flex: 2,
        }}
      >
        <CommissionsCard
          fondIds={commissionFondIds}
          avisIds={commissionAvisIds}
          fondNomination={commissionFondNomination}
          avisNomination={commissionAvisNomination}
        />
        {/* <AdditionalInfoCard
          amendementCount={amendementCount}
          documents={documents}
          coSignatairesIds={coSignatairesIds}
          acteurs={acteurs}
          organes={organes}
        />
        <LegislativeDocumentsCard documents={documents} /> */}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          flex: 5,
        }}
      >
        {/* <CardLayout title="Temps de parole par groupe">
          <SpeakingTime />
          </CardLayout> */}
        {/* <TimelineCard
          acts={acts}
          documents={documents}
          dossierUid={dossier?.dossier.uid}
          legislature={dossier?.dossier.legislature}
          /> */}
        <TextStructureCard />
      </div>
    </div>
  );
};
