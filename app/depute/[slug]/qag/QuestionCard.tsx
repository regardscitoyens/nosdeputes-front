"use client";
import * as React from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Organe, Question } from "@prisma/client";
import StatusChip from "@/components/StatusChip";

type QuestionCardProps = {
  question: Question & { minIntRef: Organe | null };
};

export default function QuestionCard(props: QuestionCardProps) {
  const {
    question: {
      uid,
      type,
      numero,
      dateDepot,
      // dateCloture,
      titre,
      rubrique,
      texteQuestion,
      erratumQuestion,
      texteReponse,
      erratumReponse,
      minIntRef,
    },
  } = props;

  const pannelId = `${uid}-pannel`;
  const headerId = `${uid}-header`;

  return (
    <Accordion
      elevation={0}
      disableGutters
      sx={(theme) => ({
        borderBottom: `solid ${theme.palette.divider} 1px`,
        borderRadius: 0,
      })}
    >
      <AccordionSummary
        aria-controls={pannelId}
        id={headerId}
        expandIcon={<ExpandMoreIcon />}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ width: "100%", mr: 2 }}
        >
          {titre && <Typography sx={{ flexGrow: 1 }}>{titre}</Typography>}
          {rubrique && <StatusChip size="small" label={rubrique} />}
          {type && <StatusChip size="small" label={type} />}
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2}>
          <Typography variant="caption">N°{numero}</Typography>
          {texteQuestion && (
            <Typography
              fontWeight="light"
              variant="body1"
              flexGrow={1}
              flexShrink={1}
              flexBasis={0}
              component="div"
              sx={{ bgcolor: "grey.50", p: 1 }}
              dangerouslySetInnerHTML={{ __html: texteQuestion }}
            />
          )}
          {texteReponse && (
            <Typography
              fontWeight="light"
              variant="body1"
              flexGrow={1}
              flexShrink={1}
              flexBasis={0}
              component="div"
              sx={{ bgcolor: "grey.50", p: 1 }}
              dangerouslySetInnerHTML={{ __html: texteReponse }}
            />
          )}
          {erratumQuestion && (
            <Typography
              fontWeight="light"
              variant="body1"
              flexGrow={1}
              flexShrink={1}
              flexBasis={0}
              component="div"
              sx={{ bgcolor: "grey.50", p: 1 }}
            >
              {erratumQuestion}
            </Typography>
          )}
          {erratumReponse && (
            <Typography
              fontWeight="light"
              variant="body1"
              flexGrow={1}
              flexShrink={1}
              flexBasis={0}
              component="div"
              sx={{ bgcolor: "grey.50", p: 1 }}
            >
              {erratumReponse}
            </Typography>
          )}
          <Stack direction="row" justifyContent="space-between" flexBasis={0}>
            <Typography fontWeight="light" variant="body2">
              Envoyé à:&nbsp;
              <Typography component="span" variant="body2">
                {minIntRef?.libelleAbrege}
              </Typography>
            </Typography>

            <Typography fontWeight="light" variant="body2">
              Date de dépôt:&nbsp;
              <Typography component="span" variant="body2">
                {dateDepot && dateDepot.toLocaleDateString("fr-FR")}
              </Typography>
            </Typography>

            {/* <Typography fontWeight="light" variant="body2">
              Date de cloture:&nbsp;
              <Typography component="span" variant="body2">
                {dateCloture && dateCloture.toLocaleDateString("fr-FR")}
              </Typography>
            </Typography> */}
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
