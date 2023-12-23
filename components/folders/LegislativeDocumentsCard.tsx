import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import LinkIcon from "@/icons/LinkIcon";

import Link from "next/link";
import { DossierData } from "@/repository/database";
import { getDocumentURL } from "@/domain/dataTransform";

export const LegislativeDocumentsCard = ({
  documents,
}: Pick<DossierData, "documents">) => {
  return (
    <Accordion elevation={0} disableGutters defaultExpanded color="secondary">
      <AccordionSummary
        aria-controls="additional-info-content"
        id="additional-info-header"
      >
        <Typography>Documents législatifs</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2}>
          {Object.values(documents).map((document) => {
            const url = getDocumentURL(document);

            return (
              <Stack
                key={document.uid}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  href={url}
                  component={url ? Link : "p"}
                >
                  {document.titrePrincipalCourt}{" "}
                  {url && <LinkIcon sx={{ fontSize: "14px" }} />}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
