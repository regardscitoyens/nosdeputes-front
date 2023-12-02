import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import LinkIcon from "@/icons/LinkIcon";
import MinusIcon from "@/icons/MinusIcon";

import Link from "next/link";

const LegislativeDocumentsCard = () => {
  return (
    <Accordion elevation={0} disableGutters defaultExpanded>
      <AccordionSummary
        expandIcon={<MinusIcon sx={{ fontSize: "10px" }} />}
        aria-controls="additional-info-content"
        id="additional-info-header"
      >
        <Typography>Documents législatifs</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2}>
          {Array.from(Array(10).keys()).map((link) => (
            <Stack key={link} direction="row" spacing={1} alignItems="center">
              <LinkIcon sx={{ fontSize: "14px" }} />
              <Link href="">
                <Typography variant="body2" fontWeight="bold">
                  Lien vers {link}
                </Typography>
              </Link>
            </Stack>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default LegislativeDocumentsCard;
