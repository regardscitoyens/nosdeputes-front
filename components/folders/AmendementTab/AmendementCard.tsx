"use client";
import * as React from "react";

import { Amendement } from "@/repository/types";
import { Box, Typography, Button, Collapse, Slide, Link } from "@mui/material";
import Stack from "@mui/material/Stack";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
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
    ...other
  } = props;

  // TODO: utiliser la base cosignataires amendement pour avoir le nombre et les noms
  const nbSignataires = signatairesLibelle.split("&#160;").length - 1;

  const [showMore, setShowMore] = React.useState(false);
  return (
    <Stack direction="column" spacing={2} sx={{ my: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <span>
          {acteur.prenom} {acteur.nom}
        </span>
        <span>{sortAmendement || etatLibelle}</span>
      </Stack>
      <Box
        sx={{
          display: "flex",
        }}
      >
        {true && (
          <Collapse
            // direction="right"
            orientation="horizontal"
            in={showMore}
          >
            <Stack
              component="li"
              spacing={1.25}
              sx={{ listStyle: "none", pr: 2, width: 500 }}
            >
              <Typography component="li" fontWeight="light" variant="body2">
                Date de dépôt:&nbsp;
                <Typography component="span" variant="body2">
                  {dateDepot.toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
              </Typography>
              <Typography component="li" fontWeight="light" variant="body2">
                Date d&apos;examen:&nbsp;
                <Typography component="span" variant="body2">
                  {dateSort?.toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </Typography>
              <Typography component="li" fontWeight="light" variant="body2">
                Déposé par:&nbsp;
                <Typography component="span" variant="body2">
                  {nbSignataires} député{nbSignataires > 1 ? "s" : ""}
                </Typography>
              </Typography>
              {/* TODO */}
              {/* <Typography component="li" fontWeight="light" variant="body2">
              Examiné par:{" "}
              <Typography component="span" variant="body2"></Typography>
            </Typography> */}
              <Typography component="li">
                Etat:{" "}
                <Typography component="span" variant="body2">
                  {etatLibelle}
                </Typography>
              </Typography>
            </Stack>
          </Collapse>
        )}
        <Typography
          fontWeight="light"
          variant="body2"
          flexGrow={1}
          component="div"
          dangerouslySetInnerHTML={{ __html: dispositif }}
        />
      </Box>
      <Stack direction="row">
        <Typography variant="caption">N°{numeroLong}</Typography>
      </Stack>
      <Link
        onClick={() => setShowMore((p) => !p)}
        component="button"
        variant="body2"
        sx={{
          alignSelf: "baseline",
          display: "flex",
          alignItems: "center",
          "&>span": { ml: 1 },
        }}
      >
        {showMore ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
        <span>Voir {showMore ? "moins" : "plus"}</span>
      </Link>
    </Stack>
  );
}
