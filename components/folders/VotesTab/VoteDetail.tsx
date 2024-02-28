import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Vote } from "@/repository/types";
import { Typography } from "@mui/material";

export function VotesDeputes({ votes }: { votes: Vote[] }) {
  const votesPour = React.useMemo(
    () => votes.filter((vote) => vote.positionVote === "pour"),
    [votes]
  );
  const votesContre = React.useMemo(
    () => votes.filter((vote) => vote.positionVote === "contre"),
    [votes]
  );
  const votesAbstension = React.useMemo(
    () => votes.filter((vote) => vote.positionVote === "nonVotant"),
    [votes]
  );

  return (
    <div>
      {[
        {
          color: "green",
          label: "pour",
          votes: votesPour,
        },
        {
          color: "red",
          label: "contre",
          votes: votesContre,
        },
        {
          color: "gray",
          label: "abstension",
          votes: votesAbstension,
        },
      ].map(({ color, label, votes: innerVotes }) => (
        <Accordion key={label} disableGutters>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${label}`}
            id={`panel-${label}`}
            sx={{
              "& .MuiAccordionSummary-content": {
                display: "flex",
                alignItems: "center",
                gap: 1,
              },
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: color,
              }}
            />
            <Typography sx={{ color, mr: 2, textTransform: "capitalize" }}>
              {label}
            </Typography>
            <Typography>{innerVotes.length} députés</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {innerVotes.map(({ slug, prenom, nom }) => (
              <Typography key={slug}>
                {prenom} {nom}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
