"use client";
import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { DeputyPreview } from "./DeputyPreview";
import InfoIcon from "@/icons/InfoIcon";
import { DossierData } from "@/repository/database";

export const AdditionalInfoCard = ({
  amendementCount,
  documents,
  coSignatairesIds,
  acteurs,
}: Pick<
  DossierData,
  "amendementCount" | "documents" | "coSignatairesIds" | "acteurs"
>) => {
  const [fullCosignataires, setFullCosignataires] = React.useState(false);

  const amendements = Object.values(documents)
    .filter((doc) => !!amendementCount[doc.uid])
    .map((doc) => ({
      uid: doc.uid,
      titre: doc.titrePrincipalCourt as string,
      count: amendementCount[doc.uid],
    }));

  return (
    <Accordion elevation={0} disableGutters defaultExpanded color="secondary">
      <AccordionSummary
        aria-controls="additional-info-content"
        id="additional-info-header"
      >
        <Typography>Informations complémentaires</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2}>
          {amendements.length > 0 && (
            <React.Fragment>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="body2" fontWeight="light">
                  Amendements
                </Typography>
                <InfoIcon sx={{ fontSize: "14px" }} />
              </Stack>
              <Stack direction="column" spacing={1}>
                {amendements.map(({ uid, titre, count }) => (
                  <div key={uid}>
                    <Typography variant="body2" fontWeight="bold">
                      {count} amendements
                    </Typography>
                    <Typography variant="body2" fontWeight="light">
                      {titre}
                    </Typography>
                  </div>
                ))}
              </Stack>
            </React.Fragment>
          )}

          <Box sx={{ maxHeight: 350, overflow: "auto" }}>
            <Stack direction="column" spacing={1}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="body2" fontWeight="light">
                  Co-signataires
                </Typography>
                <InfoIcon sx={{ fontSize: "14px" }} />
              </Stack>
              {coSignatairesIds
                ?.slice(0, fullCosignataires ? coSignatairesIds.length : 3)
                ?.map((id) => (
                  <DeputyPreview key={id} acteur={acteurs[id]} />
                ))}
              {!fullCosignataires && (
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={coSignatairesIds?.length === 0}
                  onClick={() => setFullCosignataires((prev) => !prev)}
                >
                  Tous les signataires ({coSignatairesIds?.length ?? 0})
                </Button>
              )}
            </Stack>
          </Box>

          <Stack direction="column" spacing={1}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography variant="body2" fontWeight="light">
                Orateur (TODO)
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
