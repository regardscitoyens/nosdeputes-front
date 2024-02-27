"use client";

import { ActLegislatif } from "@/repository/Acts";
import { Vote } from "@/repository/types";
import { useSearchState } from "./useVoteState";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

type VoteOption = "pour" | "contre" | "nonVotant";

type VoteProps = {
  votes: Vote[];
  acts: ActLegislatif[];
};
export default function VotesTab({ votes, acts }: VoteProps) {
  const votesPerAct: Record<
    string,
    {
      votes: Vote[];
      pour: number;
      contre: number;
      nonVotant: number;
    }
  > = {};
  votes.forEach((vote) => {
    if (!votesPerAct[vote.acteLegislatifRefUid]) {
      votesPerAct[vote.acteLegislatifRefUid] = {
        votes: [vote],
        pour: 0,
        contre: 0,
        nonVotant: 0,
        [vote.positionVote]: 1,
      };
      return;
    }
    votesPerAct[vote.acteLegislatifRefUid].votes.push(vote);
    votesPerAct[vote.acteLegislatifRefUid][
      vote.positionVote as VoteOption
    ] += 1;
  });

  const actsWithVote = acts.filter((act) => votesPerAct[act.uid] !== undefined);

  const [actIndex, setActIndex] = useSearchState<number>("actIndex", 0);
  const [voteId, setVoteId] = useSearchState("voteId", "");
  const [zoom, setZoom] = useSearchState("zoom", "");

  if (actsWithVote.length === 0) {
    return <p>Pas de vote disponible pour ce dossier pour l instant</p>;
  }

  const act = actsWithVote[actIndex];
  const voteSolenel = votesPerAct[act.uid];

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ my: 2 }}>
        <Select
          value={actIndex}
          onChange={(event) => setActIndex(event.target.value as number)}
        >
          {actsWithVote.map((act, index) => (
            <MenuItem key={act.uid} value={index}>
              {act.codeActe}
            </MenuItem>
          ))}
        </Select>
        <div>
          <Button
            onClick={() => setActIndex(actIndex - 1)}
            disabled={actIndex === 0}
          >
            prev
          </Button>
          <Button
            onClick={() => setActIndex(actIndex + 1)}
            disabled={actIndex === actsWithVote.length - 1}
          >
            next
          </Button>
        </div>
      </Stack>
      <Typography>Vote solenel</Typography>
      <Tooltip title={`pour: ${voteSolenel.pour}`}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            width: "100%",
            height: 10,
          }}
        >
          <Box sx={{ backgroundColor: "green", flexGrow: voteSolenel.pour }} />
          <Box sx={{ backgroundColor: "red", flexGrow: voteSolenel.contre }} />
          <Box
            sx={{ backgroundColor: "gray", flexGrow: voteSolenel.nonVotant }}
          />
        </Box>
      </Tooltip>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: "green",
          }}
        />
        <Typography sx={{ color: "green" }}>{voteSolenel.pour} Pour</Typography>

        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: "red",
          }}
        />
        <Typography sx={{ color: "red" }}>
          {voteSolenel.contre} Contre
        </Typography>

        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: "gray",
          }}
        />
        <Typography sx={{ color: "gray" }}>
          {voteSolenel.nonVotant} Abstension
        </Typography>
      </Box>
    </Box>
  );
}
