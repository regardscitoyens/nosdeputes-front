import React from "react";

import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

import { prisma } from "@/prisma";

function colors(positionVote: string) {
  switch (positionVote) {
    case "pour":
      return "green";
    case "contre":
      return "red";
    case "abstention":
      return "orange";
    default:
      "black";
  }
}
async function getDeputeVotesUnCached(slug: string) {
  try {
    return await prisma.acteur.findFirst({
      where: { slug },

      // Verifier que ca fonctionne quadn on aura les amendements dans la DB
      include: {
        votes: {
          include: {
            scrutinRef: true,
            // voteActe: {
            //   include: {
            //     acteLegislatifRef: true,
            //   },
            // },
          },
        },
      },
    });
  } catch (error) {
    console.error(`Error fetching amendement from depute ${slug}:`, error);
    throw error;
  }
}

const getDeputeVotes = React.cache(getDeputeVotesUnCached);

export default async function Votes(props: { deputeSlug: string }) {
  const deputeWithVote = await getDeputeVotes(props.deputeSlug);

  if (!deputeWithVote) {
    return <p>Deputé inconnu</p>;
  }
  const { votes = [] } = deputeWithVote;

  return (
    <div>
      {votes?.map((vote) => {
        const { id, positionVote, parDelegation, scrutinRef } = vote;

        const titrePrincipal = scrutinRef?.titre;

        return (
          <Stack
            key={id}
            direction="row"
            justifyContent="space-between"
            flexWrap="wrap"
            sx={{ width: "100%", mb: 1 }}
          >
            <Typography fontWeight="light">{titrePrincipal}</Typography>
            {positionVote && (
              <Typography sx={{ color: colors(positionVote) }}>
                {positionVote}{" "}
                {parDelegation && (
                  <Typography fontWeight="light" component="span">
                    par délégation
                  </Typography>
                )}
              </Typography>
            )}
          </Stack>
        );
      })}
    </div>
  );
}
