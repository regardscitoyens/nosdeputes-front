"use client";

import { ActLegislatif } from "@/repository/Acts";
import { Vote } from "@/repository/types";
import { useSearchState } from "./useVoteState";
import { VotesDeputes } from "./VotesDeputes";
import { VotesGroups } from "./VotesGroups";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";

type VoteOption = "pour" | "contre" | "nonVotant" | "abstension";

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
      abstension: number;
    }
  > = {};
  votes.forEach((vote) => {
    if (!votesPerAct[vote.acteLegislatifRefUid]) {
      votesPerAct[vote.acteLegislatifRefUid] = {
        votes: [vote],
        pour: 0,
        contre: 0,
        nonVotant: 0,
        abstension: 0,
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
  const [zoom, setZoom] = useSearchState<"depute" | "group" | "">("zoom", "");

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
      <Tooltip title="Détail du vote solenel">
        <Box
          onClick={() => {
            setZoom("depute");
          }}
          sx={{
            ":hover": {
              cursor: "pointer",
            },
          }}
        >
          <Typography>Vote solenel</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              width: "100%",
              height: 10,
            }}
          >
            <Box
              sx={{ backgroundColor: "green", flexGrow: voteSolenel.pour }}
            />
            <Box
              sx={{ backgroundColor: "red", flexGrow: voteSolenel.contre }}
            />
            <Box
              sx={{ backgroundColor: "gray", flexGrow: voteSolenel.abstension }}
            />
          </Box>
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
          {voteSolenel.abstension} Abstension
        </Typography>
      </Box>
      <Dialog
        onClose={() => setZoom("")}
        open={zoom !== ""}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          <Tabs
            value={zoom}
            onChange={(event, newVal) => {
              setZoom(newVal);
            }}
            centered
            aria-label="basic tabs example"
          >
            <Tab
              value="depute"
              label="Deputés"
              id="tabpanel-depute"
              aria-controls="tabpanel-depute"
            />
            <Tab
              value="group"
              label="Groups"
              id="tabpanel-groups"
              aria-controls="tabpanel-groups"
            />
          </Tabs>
          <div
            role="tabpanel"
            hidden={zoom !== "depute"}
            id={`tabpanel-depute`}
            aria-labelledby={`tabpanel-depute`}
          >
            {zoom === "depute" && <VotesDeputes votes={voteSolenel.votes} />}
          </div>
          <div
            role="tabpanel"
            hidden={zoom !== "group"}
            id={`tabpanel-groups`}
            aria-labelledby={`tabpanel-groups`}
          >
            {zoom === "group" && <VotesGroups votes={voteSolenel.votes} />}
          </div>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
