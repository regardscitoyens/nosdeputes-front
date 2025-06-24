import * as React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Divider, Stack, Typography } from "@mui/material";
import DeputeCard from "@/components/folders/DeputeCard";
import CircleDiv from "@/icons/CircleDiv";
import { VoteWithActeur } from "./votes.type";

type GroupInfo = {
  groupId: string;
  pour: number;
  contre: number;
  abstentions: number;
  nonVotants: number;
  nonVotantsVolontaires: number;
  fullName: string;
  shortName: string;
  color: string;
  votes: VoteWithActeur[];
};

export function VotesGroups({ votes }: { votes: VoteWithActeur[] }) {
  const votesPerGroup: GroupInfo[] = [];
  // const votesPerGroup: GroupInfo[] = React.useMemo(() => {
  //   const groups: Record<string, Omit<GroupInfo, "groupId">> = {};

  //   votes.forEach((vote) => {
  //     if (!groups[vote.groupeVotantRefId ?? ""]) {
  //       groups[vote.groupeVotantRefId ?? ""] = {
  //         pour: Number.parseInt(vote.groupeVotantRef?.pour ?? "0"),
  //         contre: Number.parseInt(vote.groupeVotantRef?.contre ?? "0"),
  //         abstentions: Number.parseInt(
  //           vote.groupeVotantRef?.abstentions ?? "0"
  //         ),
  //         nonVotants: Number.parseInt(vote.groupeVotantRef?.nonVotants ?? "0"),
  //         nonVotantsVolontaires: Number.parseInt(vote.groupeVotantRef?.nonVotantsVolontaires ?? "0"),
  //         fullName: vote.groupeVotantRef?.organeRef?.libelle ?? "",
  //         shortName: vote.groupeVotantRef?.organeRef?.libelleAbrev ?? "",
  //         color: vote.groupeVotantRef?.organeRef?.couleurAssociee ?? "",
  //         votes: [],
  //       };
  //     }

  //     groups[vote.groupeVotantRefId ?? ""].votes.push(vote);
  //   });

  //   return Object.entries(groups)
  //     .map(([groupId, group]) => ({ groupId, ...group }))
  //     .sort((a, b) => b.votes.length - a.votes.length);
  // }, [votes]);

  return (
    <div>
      {votesPerGroup.map(
        ({
          groupId,
          pour,
          contre,
          abstentions,
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
                    {abstentions}
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
                    ({ id, positionVote, acteurRef, groupeVotantRef }) => (
                      <DeputeCard
                        key={id}
                        slug={acteurRef?.slug ?? ""}
                        urlImage={acteurRef?.urlImage ?? ""}
                        prenom={acteurRef?.prenom ?? ""}
                        nom={acteurRef?.nom ?? ""}
                        vote={positionVote}
                        showVote
                        groupPosition={
                          groupeVotantRef?.positionMajoritaire ?? undefined
                        }
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
