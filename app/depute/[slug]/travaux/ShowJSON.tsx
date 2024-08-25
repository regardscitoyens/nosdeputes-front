import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import React from "react";
export function ShowJSON({ item, titre }: { item: any; titre: string }) {
  return (
    <Accordion elevation={0} disableGutters color="secondary">
      <AccordionSummary>
        <Typography>{titre}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </AccordionDetails>
    </Accordion>
  );
}
