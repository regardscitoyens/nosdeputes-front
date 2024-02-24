"use client";
import * as React from "react";

import { Amendement } from "@/repository/types";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function AmendementCard(props: Amendement) {
  const {
    dateDepot,
    dateSort,
    sortAmendement,
    etatCode,
    etatLibelle,
    sousEtatCode,
    sousEtatLibelle,
    dispositif,
    exposeSommaire,
    urlDivisionTexteVise,
    signatairesLibelle,
    numeroLong,
    acteur,
    prenom,
    nom,
    uid,
    ...other
  } = props;

  // TODO: utiliser la base cosignataires amendement pour avoir le nombre et les noms
  const nbSignataires = signatairesLibelle.split("&#160;").length - 1;

  return (
    <Accordion
      elevation={0}
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
          justifyContent="space-between"
          sx={{ width: "100%", mr: 2 }}
        >
          <span>
            {prenom} {nom}
          </span>
          <span>{sortAmendement || etatLibelle}</span>
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
            sx={{ bgcolor: "#F8F9FA", p: 1 }}
            dangerouslySetInnerHTML={{ __html: dispositif }}
          />

          <Typography fontWeight="light" variant="body2">
            Examiné par:&nbsp;
            <Typography component="a" variant="body2">
              Le nom d&apos;une commission parlementaire
            </Typography>
          </Typography>
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
                {dateDepot.toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
            </Typography>

            <Typography fontWeight="light" variant="body2">
              Date d&apos;examen:&nbsp;
              <Typography component="span" variant="body2">
                {dateSort?.toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
            </Typography>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
