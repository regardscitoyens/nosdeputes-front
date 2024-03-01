import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Vote } from "@/repository/types";
import { Divider, Stack, Typography } from "@mui/material";
import DeputeCard from "./DeputeCard";
import CircleDiv from "@/icons/CircleDiv";

type GroupInfo = {
  groupId: string;
  pour: number;
  contre: number;
  abstension: number;
  nonVotant: number;
  fullName: string;
  shortName: string;
  color: string;
  votes: Vote[];
};

export function VotesGroups({ votes }: { votes: Vote[] }) {
  const votesPerGroup: GroupInfo[] = React.useMemo(() => {
    const groups: Record<string, Omit<GroupInfo, "groupId">> = {};

    votes.forEach((vote) => {
      if (!groups[vote.organe_uid]) {
        groups[vote.organe_uid] = {
          pour: 0,
          contre: 0,
          abstension: 0,
          nonVotant: 0,
          fullName: vote.group_libelle,
          shortName: vote.group_libelle_short,
          color: vote.group_color,
          votes: [],
        };
      }

      groups[vote.organe_uid][
        vote.positionVote as "contre" | "pour" | "nonVotant" | "abstension"
      ] += 1;
      groups[vote.organe_uid].votes.push(vote);
    });

    return Object.entries(groups)
      .map(([groupId, group]) => ({ groupId, ...group }))
      .sort((a, b) => b.votes.length - a.votes.length);
  }, [votes]);

  return (
    <div>
      {votesPerGroup.map(
        ({
          groupId,
          pour,
          contre,
          abstension,
          fullName,
          shortName,
          color,
          votes,
        }) => (
          <React.Fragment key={groupId}>
            <Divider />
            <Accordion disableGutters elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-group-${groupId}`}
                id={`panel-group-${groupId}`}
                sx={{
                  "& .MuiAccordionSummary-content": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CircleDiv color={color} />
                  <Typography sx={{ color, mr: 2 }}>
                    {fullName} ({shortName})
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CircleDiv color="green" />
                  <Typography sx={{ color: "green", minWidth: 30 }}>
                    {pour}
                  </Typography>
                  <CircleDiv color="red" />
                  <Typography sx={{ color: "red", minWidth: 30 }}>
                    {contre}
                  </Typography>
                  <CircleDiv color="gray" />
                  <Typography sx={{ color: "gray", minWidth: 30 }}>
                    {abstension}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    display: "grid",
                    alignItems: "center",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    rowGap: 1.5,
                    columnGap: 1.5,
                    "& *": { minWidth: 0 },
                  }}
                >
                  {votes.map(
                    ({ slug, prenom, nom, positionVote, group_position }) => (
                      <DeputeCard
                        key={slug}
                        prenom={prenom}
                        nom={nom}
                        vote={positionVote}
                        groupPosition={group_position}
                      />
                    )
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          </React.Fragment>
        )
      )}
    </div>
  );
}
