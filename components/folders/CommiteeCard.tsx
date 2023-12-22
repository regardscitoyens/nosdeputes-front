import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { DeputyPreview } from "@/components/folders/DeputyPreview";
import InfoIcon from "@/icons/InfoIcon";
import { Acteur, Organe } from "@/repository/types";

export const CommiteeCard = ({
  commissionFond,
  commissionAvis,
  rapporteursFond,
}: {
  commissionFond?: Organe;
  commissionAvis?: Organe;
  rapporteursFond?: Acteur[];
}) => {
  if (!commissionAvis && !commissionFond) {
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
              {rapporteursFond.map((acteur) => (
                <DeputyPreview acteur={acteur} key={acteur.uid} />
              ))}
            </div>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
