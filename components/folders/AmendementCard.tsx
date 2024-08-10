"use client";
import * as React from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StatusChip from "@/components/StatusChip";

import { Acteur, Amendement, Organe } from "@prisma/client";
import DeputeCard from "@/components/folders/DeputeCard";

function getStatus(label: string | null) {
  switch (label) {
    case "Adopté":
      return "validated";
    case "Rejeté":
    case "Irrecevable":
    case "Tombé":
    case "Irrecevable 40":
      return "refused";
    case "Non soutenu":
    case "Retiré":
      return "dropped";
    default:
      return "review";
  }
}
type AmendementCardProps = {
  amendement: Amendement;
  depute: null | (Acteur & { groupeParlementaire: Organe | null });
};

export default function AmendementCard(props: AmendementCardProps) {
  const { amendement, depute } = props;

  // TODO: utiliser la base cosignataires amendement pour avoir le nombre et les noms
  const nbSignataires = amendement.signatairesLibelle
    ? amendement.signatairesLibelle.split("&#160;").length - 1
    : 1;

  const etatAmendement = amendement.sortAmendement || amendement.etatLibelle;
  const pannelId = `${amendement.uid}-pannel`;
  const headerId = `${amendement.uid}-header`;
  return (
    <Accordion
      elevation={0}
      disableGutters
      sx={(theme) => ({
        borderBottom: `solid ${theme.palette.divider} 1px`,
        borderRadius: 0,
      })}
    >
      <AccordionSummary
        aria-controls={pannelId}
        id={headerId}
        expandIcon={<ExpandMoreIcon />}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ width: "100%", mr: 2 }}
        >
          <DeputeCard
            slug={depute?.slug ?? ""}
            prenom={depute?.prenom ?? ""}
            nom={depute?.nom ?? ""}
            group={
              depute?.groupeParlementaire && {
                fullName: depute.groupeParlementaire.libelle,
                shortName: "",
                color: depute.groupeParlementaire.couleurAssociee,
              }
            }
            smallGroupColor
            sx={{ flexGrow: 1 }}
          />

          <StatusChip
            size="small"
            label={etatAmendement}
            status={getStatus(etatAmendement)}
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2}>
          <Typography variant="caption">N°{amendement.numeroLong}</Typography>
          {amendement.dispositif && (
            <Typography
              fontWeight="light"
              variant="body2"
              flexGrow={1}
              flexShrink={1}
              flexBasis={0}
              component="div"
              sx={{ bgcolor: "grey.50", p: 1 }}
              dangerouslySetInnerHTML={{ __html: amendement.dispositif }}
            />
          )}

          {/* <Typography fontWeight="light" variant="body2">
            Examiné par:&nbsp;
            <Typography component="a" variant="body2">
              Le nom d&apos;une commission parlementaire
            </Typography>
          </Typography> */}
          <Stack direction="row" justifyContent="space-between" flexBasis={0}>
            <Typography fontWeight="light" variant="body2">
              Déposé par:&nbsp;
              <Typography component="span" variant="body2">
                {nbSignataires} député{nbSignataires > 1 ? "s" : ""}
              </Typography>
            </Typography>

            <Typography fontWeight="light" variant="body2">
              Date de dépôt:&nbsp;
              <Typography component="span" variant="body2">
                {amendement.dateDepot
                  ? new Date(amendement.dateDepot).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "-"}
              </Typography>
            </Typography>

            <Typography fontWeight="light" variant="body2">
              Date d&apos;examen:&nbsp;
              <Typography component="span" variant="body2">
                {amendement.dateSort
                  ? new Date(amendement.dateSort).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "-"}
              </Typography>
            </Typography>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
