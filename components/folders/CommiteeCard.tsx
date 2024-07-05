import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { DeputyPreview } from "@/components/folders/DeputyPreview";
import InfoIcon from "@/icons/InfoIcon";
import { Acteur, Organe } from "@/repository/types";
import { DossierData } from "@/repository/database";
import DeputeCard from "./DeputeCard";

export const CommiteeCard = ({
  commissionFondId,
  commissionAvisId,
  organes,
  rapporteursFondIds,
  acteurs,
}: Pick<
  DossierData,
  | "commissionFondId"
  | "commissionAvisId"
  | "organes"
  | "rapporteursFondIds"
  | "acteurs"
>) => {
  const commissionFond = commissionFondId && organes[commissionFondId];
  const commissionAvis = commissionAvisId && organes[commissionAvisId];
  const rapporteursFond = rapporteursFondIds
    ?.map((id: string) => acteurs[id])
    .filter((acteur: undefined | Acteur) => !!acteur);

  if (!commissionFond && !rapporteursFond) {
    return null;
  }
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
          {commissionFond && (
            <div>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="body2" fontWeight="light">
                  Commission saisie au fond
                </Typography>
                <InfoIcon sx={{ fontSize: "14px" }} />
              </Stack>
              <Typography variant="body2" fontWeight="bold" pb={2}>
                {commissionFond.libelleAbrege || commissionFond.libelle}
              </Typography>
            </div>
          )}
          {commissionAvis && (
            <div>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="body2" fontWeight="light">
                  Comission saisie pour avis
                </Typography>
                <InfoIcon sx={{ fontSize: "14px" }} />
              </Stack>
              <Typography variant="body2" fontWeight="bold" pb={2}>
                {commissionAvis.libelleAbrege || commissionAvis.libelle}
              </Typography>
            </div>
          )}
          {rapporteursFond && rapporteursFond.length > 0 && (
            <div>
              <Typography variant="body2" fontWeight="light" pb={1}>
                Rapporteur
              </Typography>
              {rapporteursFond.map((acteur) => {
                const { prenom, nom, slug, groupeParlementaireUid } =
                  acteur;
                const group = organes[groupeParlementaireUid];
                return (
                  <DeputeCard
                    key={acteur.uid}
                    prenom={prenom}
                    nom={nom}
                    slug={slug}
                    group={
                      group && {
                        fullName: "",
                        shortName: group.libelleAbrev,
                        color: group.couleurAssociee,
                      }
                    }
                  />
                );
              })}
            </div>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
