import React from "react";

import { getDeputeVotes } from "@/repository/database";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

export default async function Votes(props: { deputeSlug: string }) {
  const { votes } = await getDeputeVotes(props.deputeSlug);

  return (
    <pre>
      Travaux
      <br />
      {votes?.map(({ titrePrincipalCourt, id, positionVote }) => (
        <Stack
          key={id}
          direction="row"
          justifyContent="space-between"
          flexWrap="wrap"
          sx={{ width: "100%", mb: 1 }}
        >
          <Typography fontWeight="light">{titrePrincipalCourt}</Typography>
          <Typography>{positionVote}</Typography>
        </Stack>
      ))}
      {/* {JSON.stringify(votes, null, 2)} */}
    </pre>
  );
}
