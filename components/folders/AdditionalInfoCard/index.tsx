import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import DeputyPreview from "../DeputyPreview";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import InfoIcon from "@/icons/InfoIcon";
import MinusIcon from "@/icons/MinusIcon";

const AdditionalInfoCard = () => {
  return (
    <Accordion elevation={0} disableGutters defaultExpanded>
      <AccordionSummary
        expandIcon={<MinusIcon sx={{ fontSize: "10px" }} />}
        aria-controls="additional-info-content"
        id="additional-info-header"
      >
        <Typography>Informations complémentaires</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2}>
          <div>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography variant="body2" fontWeight="light">
                Amendements
              </Typography>
              <InfoIcon sx={{ fontSize: "14px" }} />
            </Stack>
            <Typography variant="body2" fontWeight="bold">
              411
            </Typography>
          </div>
          <Stack direction="column" spacing={1}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography variant="body2" fontWeight="light">
                Co-signataires
              </Typography>
              <InfoIcon sx={{ fontSize: "14px" }} />
            </Stack>
            <DeputyPreview />
            <DeputyPreview />
            <DeputyPreview />
            <DeputyPreview />
            <Button fullWidth variant="contained" color="secondary">
              Tous les signataires (7)
            </Button>
          </Stack>
          <Stack direction="column" spacing={1}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography variant="body2" fontWeight="light">
                Co-signataires
              </Typography>
              <InfoIcon sx={{ fontSize: "14px" }} />
            </Stack>
            <DeputyPreview />
            <DeputyPreview />
            <DeputyPreview />
            <DeputyPreview />
            <Button fullWidth variant="contained" color="secondary">
              Tous les orateurs (7)
            </Button>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default AdditionalInfoCard;
