"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InfoIcon from "@/icons/InfoIcon";
import DeputeCard from "./DeputeCard";

import { Acteur, Organe } from "@prisma/client";

export default function Signataires(props: {
  limite?: number;
  signataires: (Acteur & { groupeParlementaire: null | Organe })[];
}) {
  const { signataires, limite = 3 } = props;
  const [fullSignataires, setFullSignataires] = React.useState(false);

  return (
    <Box sx={{ maxHeight: 350, overflow: "auto" }}>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Typography variant="body2" fontWeight="light">
            Co-signataires
          </Typography>
          <InfoIcon sx={{ fontSize: "14px" }} />
        </Stack>
        {signataires
          ?.slice(0, fullSignataires ? signataires.length : limite)
          ?.map((acteur) => {
            const { prenom, nom, slug, groupeParlementaire, uid } = acteur;

            return (
              <DeputeCard
                key={uid}
                prenom={prenom}
                nom={nom}
                slug={slug}
                group={
                  groupeParlementaire && {
                    fullName: "",
                    shortName: groupeParlementaire.libelleAbrev,
                    color: groupeParlementaire.couleurAssociee,
                  }
                }
              />
            );
          })}
        {!fullSignataires && signataires.length > limite && (
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disabled={signataires?.length === 0}
            onClick={() => setFullSignataires((prev) => !prev)}
          >
            Tous les signataires ({signataires.length})
          </Button>
        )}
      </Stack>
    </Box>
  );
}
