import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import LinkIcon from "@/icons/LinkIcon";

import Link from "next/link";

import { getDocument } from "@/data/getDocument";

interface LegislativeDocumentsCardProps {
  documentIds: string[];
}
export const LegislativeDocumentsCard = async (
  props: LegislativeDocumentsCardProps
) => {
  const documents = await Promise.all(
    props.documentIds.map((documentUid) => getDocument(documentUid))
  );
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
            if (!document) {
              return null;
            }

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
                  href={document.pdfUrl ?? undefined}
                  component={document.pdfUrl ? Link : "p"}
                >
                  {document.titrePrincipalCourt}{" "}
                  {document.pdfUrl && <LinkIcon sx={{ fontSize: "14px" }} />}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
