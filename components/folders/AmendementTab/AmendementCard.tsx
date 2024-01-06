"use client";
import * as React from "react";

import { Amendement } from "@/repository/types";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";

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
    ...other
  } = props;

  const [showMore, setShowMore] = React.useState(false);
  return (
    <Stack direction="column">
      <Stack direction="row" justifyContent="space-between">
        <span>Depte</span>
        <span>{sortAmendement || etatLibelle}</span>
      </Stack>
      <Box
        sx={{
          display: "flex",

          "&>ul": {
            flex: "4 0 0",
          },
          "&>p": {
            flex: "8 0 0",
          },
        }}
      >
        <ul>
          <li>
            Date de dépôt:{" "}
            <span>
              {dateDepot.toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </li>
          <li>
            Date d'examen:{" "}
            <span>
              {dateDepot.toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </li>
          <li>
            Déposé par: <span></span>
          </li>
          <li>
            Examiné par: <span></span>
          </li>
          <li>
            Etat: <span></span>
          </li>
        </ul>
        <p dangerouslySetInnerHTML={{ __html: dispositif }} />
      </Box>
      <Stack direction="row"></Stack>
      {showMore && (
        <pre style={{ width: 1000, overflow: "scroll" }}>
          {JSON.stringify(props, null, 2)}
        </pre>
      )}
      <button onClick={() => setShowMore((p) => !p)}>
        see {showMore ? "less" : "more"}
      </button>
    </Stack>
  );
}
