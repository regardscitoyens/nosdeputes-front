"use client";
import * as React from "react";

import Link from "next/link";

import { Amendement } from "@/repository/types";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StatusChip from "@/components/StatusChip";
import DeputeCard from "../DeputeCard";

function getStatus(label: string) {
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

export default function AmendementCard(props: Amendement) {
  const {
    dateDepot,
    dateSort,
    sortAmendement,
    etatLibelle,
    dispositif,
    signatairesLibelle,
    numeroLong,
    acteur_slug,
    prenom,
    nom,
    uid,
    group_color,
    group_libelle,
    seanceRefUid,
    dossierRefUid,
    numeroOrdreDepot,
  } = props;

  // TODO: utiliser la base cosignataires amendement pour avoir le nombre et les noms
  const nbSignataires = signatairesLibelle.split("&#160;").length - 1;

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
        aria-controls={`${uid}-pannel`}
        id={`${uid}-header`}
        expandIcon={<ExpandMoreIcon />}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ width: "100%", mr: 2 }}
        >
          <DeputeCard
            slug={acteur_slug}
            prenom={prenom}
            nom={nom}
            group={{
              fullName: group_libelle,
              shortName: "",
              color: group_color,
            }}
            smallGroupColor
            sx={{ flexGrow: 1 }}
          />

          <StatusChip
            size="small"
            label={sortAmendement || etatLibelle}
            status={getStatus(sortAmendement || etatLibelle)}
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2}>
          <Typography variant="caption">N°{numeroLong}</Typography>
          <Typography
            fontWeight="light"
            variant="body2"
            flexGrow={1}
            flexShrink={1}
            flexBasis={0}
            component="div"
            sx={{ bgcolor: "grey.50", p: 1 }}
            dangerouslySetInnerHTML={{ __html: dispositif }}
          />

          {seanceRefUid && (
            // <Typography fontWeight="light" variant="body2">
            //   Examiné par:&nbsp;
            <Typography
              component={Link}
              href={`/16/dossier/${dossierRefUid}/debat?compteRenduRef=${seanceRefUid}#adt-${numeroOrdreDepot}`}
              variant="body2"
            >
              Voire le debat associé
            </Typography>
            // </Typography>
          )}
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
                {dateDepot
                  ? new Date(dateDepot).toLocaleDateString("fr-FR", {
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
                {dateSort
                  ? new Date(dateSort).toLocaleDateString("fr-FR", {
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
