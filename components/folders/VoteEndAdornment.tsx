import * as React from "react";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import CompareArrowsSharpIcon from "@mui/icons-material/CompareArrowsSharp";
import CircleDiv from "@/icons/CircleDiv";

const VOTE_COLOR = {
  pour: "green",
  contre: "red",
  abstention: "gray",
};

interface VoteEndAdornmentProps {
  /**
   * The individual vote.
   */
  vote?: "pour" | "contre" | "nonVotant" | "abstention" | null;
  /**
   * The vote of the related group.
   */
  groupPosition?: "pour" | "contre" | "nonVotant" | "abstention";
}

export default function VoteEndAdornment(props: VoteEndAdornmentProps) {
  const { vote, groupPosition } = props;

  const isDissident = groupPosition !== vote && vote !== "nonVotant";

  if (!vote) {
    return null;
  }
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ minWidth: "auto" }}
    >
      {isDissident && (
        <Tooltip title="Dissident à son groupe">
          <CompareArrowsSharpIcon />
        </Tooltip>
      )}
      {vote === "nonVotant" ? (
        <span>(non votant)</span>
      ) : (
        <CircleDiv color={(vote && VOTE_COLOR[vote]) ?? "gray"} />
      )}
    </Stack>
  );
}
