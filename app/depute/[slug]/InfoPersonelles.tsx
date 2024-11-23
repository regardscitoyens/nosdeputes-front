import * as React from "react";

import { Paper, Stack, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Acteur, Mandat } from "@prisma/client";

export default function InfoPersonelles({
  mandats,
  depute,
}: {
  mandats: Mandat[];
  depute: Acteur;
}) {
  const sortedMandats = mandats
    // .filter((mandat) => mandat.legislature === "16") Partis politique est `null`
    .sort((a, b) => (a.dateDebut < b.dateDebut ? 1 : -1));

  const dernierMandatDepute = sortedMandats.filter(
    (mandat) => mandat.typeOrgane === "ASSEMBLEE"
  )[0];

  const derniergroupeParlementaire = sortedMandats.filter(
    (mandat) => mandat.typeOrgane === "GP"
  )[0];

  const dernierPartisPolitique = sortedMandats.filter(
    (mandat) => mandat.typeOrgane === "PARPOL"
  )[0];

  const { dateNais, villeNais, profession } = depute;
  const age =
    dateNais &&
    new Date(
      new Date().valueOf() - new Date(dateNais).valueOf()
    ).getFullYear() - 1970;

  return (
    <Paper sx={{ p: 2, bgcolor: "grey.50", width: 300 }} elevation={0}>
      <Stack direction="column" spacing={2}>
        <Typography variant="subtitle1">Informations personelles</Typography>

        {dernierMandatDepute === undefined ? (
          <div>
            <Typography variant="body2" fontWeight="light">
              Debut de mandat <InfoOutlinedIcon fontSize="inherit" />
            </Typography>
            <Typography variant="body2">N'est pas député·e·s</Typography>
          </div>
        ) : (
          <React.Fragment>
            <div>
              <Typography variant="body2" fontWeight="light">
                Debut de mandat <InfoOutlinedIcon fontSize="inherit" />
              </Typography>
              <Typography variant="body2">
                Le{" "}
                {new Date(dernierMandatDepute?.dateDebut).toLocaleDateString(
                  "fr-FR",
                  { day: "numeric", month: "long", year: "numeric" }
                )}
              </Typography>
            </div>

            <div>
              <Typography variant="body2" fontWeight="light">
                Fin de mandat <InfoOutlinedIcon fontSize="inherit" />
              </Typography>
              <Typography variant="body2">
                {dernierMandatDepute?.dateFin !== null
                  ? `Le ${new Date(
                      dernierMandatDepute?.dateFin
                    ).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}`
                  : "en cours"}
              </Typography>
            </div>
          </React.Fragment>
        )}

        <div>
          <Typography variant="body2" fontWeight="light">
            Group politique <InfoOutlinedIcon fontSize="inherit" />
          </Typography>
          <Typography variant="body2">
            {derniergroupeParlementaire &&
            derniergroupeParlementaire.dateFin === null
              ? derniergroupeParlementaire.libelle
              : "-"}
          </Typography>
        </div>

        <div>
          <Typography variant="body2" fontWeight="light">
            Partis politique <InfoOutlinedIcon fontSize="inherit" />
          </Typography>
          <Typography variant="body2">
            {dernierPartisPolitique && dernierPartisPolitique.dateFin === null
              ? dernierPartisPolitique.libelle
              : "-"}
          </Typography>
        </div>

        <div>
          <Typography variant="body2" fontWeight="light">
            Date de naissance <InfoOutlinedIcon fontSize="inherit" />
          </Typography>
          <Typography variant="body2">
            Le {dateNais && new Date(dateNais).toLocaleDateString("fr-FR")} (
            {age} ans) à {villeNais}
          </Typography>
        </div>

        <div>
          <Typography variant="body2" fontWeight="light">
            Profession <InfoOutlinedIcon fontSize="inherit" />
          </Typography>
          <Typography variant="body2">{profession}</Typography>
        </div>
      </Stack>
    </Paper>
  );
}
