import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { DeputyPreview } from "@/components/folders/DeputyPreview";
import InfoIcon from "@/icons/InfoIcon";

export const CommiteeCard = () => {
  return (
    <Accordion elevation={0} disableGutters defaultExpanded color="secondary">
      <AccordionSummary
        aria-controls="commission-content"
        id="commission-header"
      >
        <Typography>Commissions 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2}>
          <div>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography variant="body2" fontWeight="light">
                Commission saisie au fond
              </Typography>
              <InfoIcon sx={{ fontSize: "14px" }} />
            </Stack>
            <Typography variant="body2" fontWeight="bold" pb={2}>
              Commission des affaires économiques
            </Typography>
          </div>
          <div>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography variant="body2" fontWeight="light">
                Comission saisie pour avis
              </Typography>
              <InfoIcon sx={{ fontSize: "14px" }} />
            </Stack>
            <Typography variant="body2" fontWeight="bold" pb={2}>
              Commission du développement durable et de l&apos;aménagement du
              territoire
            </Typography>
          </div>
          <div>
            <Typography variant="body2" fontWeight="light" pb={1}>
              Rapporteur
            </Typography>
            <DeputyPreview />
          </div>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
