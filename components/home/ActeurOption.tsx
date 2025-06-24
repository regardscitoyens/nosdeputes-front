import * as React from "react";
import { Acteur, Mandat } from "@prisma/client";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export function ActeurOption(
  props: Acteur & { mandatPrincipal: Mandat | null }
) {
  const circonscription = props.mandatPrincipal;
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ "& img": { width: 42, height: 42, borderRadius: "100%" } }}
    >
      <img src={props.urlImage ?? ""} />
      <div>
        <Typography variant="body1">
          {props.nom} {props.prenom}
        </Typography>
        {circonscription && (
          <Typography variant="body1" fontWeight="light">
            {circonscription.numCirco} circonscription{" "}
            {circonscription.departement}
          </Typography>
        )}
      </div>
    </Stack>
  );
}
