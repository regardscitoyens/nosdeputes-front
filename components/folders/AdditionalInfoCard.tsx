"use client";
import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import { DeputyPreview } from "./DeputyPreview";
import InfoIcon from "@/icons/InfoIcon";
import { DossierData } from "@/repository/database";
import Link from "next/link";
import { useParams } from "next/navigation";
import DeputeCard from "./DeputeCard";

export const AdditionalInfoCard = ({
  amendementCount,
  documents,
  coSignatairesIds,
  acteurs,
  organes,
}: Pick<
  DossierData,
  "amendementCount" | "documents" | "coSignatairesIds" | "acteurs" | "organes"
>) => {
  const params = useParams<{ legislature: string; id: string }>();
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
                    <MuiLink
                      variant="body2"
                      fontWeight="light"
                      component={Link}
                      href={`/${params.legislature}/dossier/${params.id}/amendement?document=${uid}`}
                    >
                      {titre}
                    </MuiLink>
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
                ?.map((id) => {
                  if (!acteurs[id]) {
                    return null;
                  }
                  const { prenom, nom, slug, groupeParlementaireUid } =
                    acteurs[id];

                  const group = organes[groupeParlementaireUid];
                  return (
                    <DeputeCard
                      key={id}
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
