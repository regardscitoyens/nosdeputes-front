import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Vote } from "@/repository/types";
import { Divider, Typography } from "@mui/material";
import DeputeCard from "./DeputeCard";
import CircleDiv from "@/icons/CircleDiv";

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
    () => votes.filter((vote) => vote.positionVote === "abstension"),
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
        <React.Fragment key={label}>
          <Divider />
          <Accordion disableGutters elevation={0}>
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
              <CircleDiv color={color} />
              <Typography sx={{ color, mr: 2, textTransform: "capitalize" }}>
                {label}
              </Typography>
              <Typography>{innerVotes.length} députés</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "grid",
                  alignItems: "center",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  rowGap: 1.5,
                  columnGap: 4,
                }}
              >
                {innerVotes.map(
                  ({
                    slug,
                    prenom,
                    nom,
                    group_libelle,
                    group_libelle_short,
                    group_color,
                    positionVote,
                    group_position,
                  }) => (
                    <DeputeCard
                      key={slug}
                      prenom={prenom}
                      nom={nom}
                      group={{
                        fullName: group_libelle,
                        shortName: group_libelle_short,
                        color: group_color,
                      }}
                      vote={positionVote}
                      groupPosition={group_position}
                    />
                  )
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        </React.Fragment>
      ))}
    </div>
  );
}
