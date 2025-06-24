import * as React from "react";

import Skeleton from "@mui/material/Skeleton";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import InfoIcon from "@/icons/InfoIcon";

import CommissionItem from "./CommissionItem";

import { Rapporteur } from "@prisma/client";
import ActeurCard from "@/components/folders/ActeurCard";

interface CommissionsCardProps {
  /**
   * Id des commissions saisie sur le fond
   */
  commissionFondIds: string[];
  /**
   * Id des commissions saisie pour avis
   */
  commissionAvisIds: string[];
  /**
   * List des rapporteurs lié au dossier.
   */
  rapporteurs: Rapporteur[];
}

export const CommissionsCard = async ({
  commissionFondIds,
  commissionAvisIds,
  rapporteurs,
}: CommissionsCardProps) => {
  if (
    (!commissionFondIds || commissionFondIds.length === 0) &&
    (!commissionAvisIds || commissionAvisIds.length === 0) &&
    (!rapporteurs || rapporteurs.length === 0)
  ) {
    return null;
  }

  // Utilise l'uid des actes legislatif pour différenciers:
  // - les rapporteurs de commission saisie pour le fond
  const rapporteursFond = rapporteurs.filter((rapporteur) =>
    rapporteur.acteLegislatifRefUid?.includes("COM-FOND-NOMIN")
  );

  // - les rapporteurs de commission saisie pour avis
  const rapporteursAvis = rapporteurs.filter((rapporteur) =>
    rapporteur.acteLegislatifRefUid?.includes("COM-AVIS-NOMIN")
  );

  return (
    <Accordion elevation={0} disableGutters defaultExpanded color="secondary">
      <AccordionSummary
        aria-controls="commission-content"
        id="commission-header"
      >
        <Typography>Commissions</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2}>
          {commissionFondIds && commissionFondIds.length > 0 && (
            <div>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="body2" fontWeight="light">
                  Commission saisie au fond
                </Typography>
                <InfoIcon sx={{ fontSize: "14px" }} />
              </Stack>
              {commissionFondIds.map((commissionId) => (
                <React.Suspense
                  key={commissionId}
                  fallback={
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  }
                >
                  <CommissionItem id={commissionId} />
                </React.Suspense>
              ))}
            </div>
          )}
          {rapporteursFond && rapporteursFond.length > 0 && (
            <div>
              <Typography variant="body2" fontWeight="light" pb={1}>
                Rapporteur
              </Typography>
              {rapporteursFond.map((acteur) => (
                <ActeurCard
                  key={acteur.acteurRefUid}
                  id={acteur.acteurRefUid}
                />
              ))}
            </div>
          )}
          {commissionAvisIds && commissionAvisIds.length > 0 && (
            <div>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="body2" fontWeight="light">
                  Comission saisie pour avis
                </Typography>
                <InfoIcon sx={{ fontSize: "14px" }} />
              </Stack>
              {commissionAvisIds.map((commissionId) => (
                <React.Suspense
                  key={commissionId}
                  fallback={
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  }
                >
                  <CommissionItem id={commissionId} />
                </React.Suspense>
              ))}
            </div>
          )}
          {rapporteursAvis && rapporteursAvis.length > 0 && (
            <div>
              <Typography variant="body2" fontWeight="light" pb={1}>
                Rapporteur
              </Typography>
              {rapporteursAvis.map((acteur) => (
                <ActeurCard
                  key={acteur.acteurRefUid}
                  id={acteur.acteurRefUid}
                />
              ))}
            </div>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
