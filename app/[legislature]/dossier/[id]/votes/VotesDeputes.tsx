import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Vote } from "@prisma/client";
import { Divider, Typography } from "@mui/material";
import DeputeCard from "../../../../../components/folders/DeputeCard";
import CircleDiv from "@/icons/CircleDiv";
import { VoteWithActeur } from "./votes.type";

export function VotesDeputes({ votes }: { votes: VoteWithActeur[] }) {
  const votesPour = React.useMemo(
    () => votes.filter((vote) => vote.positionVote === "pour"),
    [votes]
  );
  const votesContre = React.useMemo(
    () => votes.filter((vote) => vote.positionVote === "contre"),
    [votes]
  );
  const votesabstention = React.useMemo(
    () => votes.filter((vote) => vote.positionVote === "abstention"),
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
          label: "abstention",
          votes: votesabstention,
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
                {innerVotes.map((vote) => {
                  const { acteurRef, id, positionVote, groupeVotantRef } = vote;
                  return (
                    <DeputeCard
                      key={id}
                      slug={acteurRef?.slug ?? ""}
                      prenom={acteurRef?.prenom ?? ""}
                      nom={acteurRef?.nom ?? ""}
                      group={
                        groupeVotantRef?.organeRef && {
                          color: groupeVotantRef?.organeRef.couleurAssociee,
                          fullName: groupeVotantRef?.organeRef.libelle,
                          shortName: groupeVotantRef?.organeRef.libelleAbrev,
                        }
                      }
                      vote={positionVote}
                      // Not available in Vote model for now
                      groupPosition={
                        groupeVotantRef?.positionMajoritaire ?? undefined
                      }
                    />
                  );
                })}
              </Box>
            </AccordionDetails>
          </Accordion>
        </React.Fragment>
      ))}
    </div>
  );
}
