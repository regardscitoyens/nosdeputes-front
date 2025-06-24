"use client";
import * as React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InfoIcon from "@/icons/InfoIcon";
import { ActeurCard } from "./ActeurCard";

export default function Signataires(props: {
  limite?: number;
  signataireUids: string[];
}) {
  const { signataireUids, limite = 3 } = props;
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

        {signataireUids
          ?.slice(0, fullSignataires ? signataireUids.length : limite)
          ?.map((acteurUid) => {
            return <ActeurCard key={acteurUid} id={acteurUid} />;
          })}
        {!fullSignataires && signataireUids.length > limite && (
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            disabled={signataireUids?.length === 0}
            onClick={() => setFullSignataires((prev) => !prev)}
          >
            Tous les signataires ({signataireUids.length})
          </Button>
        )}
      </Stack>
    </Box>
  );
}
