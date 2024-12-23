import React from "react";

import { AdditionalInfoCard } from "@/app/[legislature]/dossier/[id]/AdditionalInfoCard";
import { CommissionsCard } from "./CommissionsCard";

import { LegislativeDocumentsCard } from "@/app/[legislature]/dossier/[id]/LegislativeDocumentsCard";
import { TextStructureCard } from "@/components/folders/TextStructureCard";
import { TimelineCard } from "@/components/folders/TimelineCard";

import {
  getCommissionNomination,
  getCommissionUids,
  getDossier,
} from "@/app/[legislature]/dossier/[id]/dataFunctions";

type PreviewTabProps = {
  dossier?: Awaited<ReturnType<typeof getDossier>>;
};

export const PreviewTab = ({ dossier }: PreviewTabProps) => {
  const { actesLegislatifs } = dossier!;

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

  const documentIds = Array.from(
    new Set(
      actesLegislatifs.flatMap((act) =>
        [act.texteAdopteRefUid, act.texteAssocieRefUid].filter(
          (id) => id !== null
        )
      )
    )
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
        <AdditionalInfoCard
          documentIds={documentIds}
          legislature={dossier!.legislature}
          dossierUid={dossier!.uid}
        />
        <LegislativeDocumentsCard documentIds={documentIds} />
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
        <TimelineCard
          actesLegislatifs={actesLegislatifs}
          // documents={documents}
          dossierUid={dossier!.uid}
          legislature={dossier!.legislature}
        />
        {/* <TextStructureCard /> */}
      </div>
    </div>
  );
};
