import React from "react";

import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

import { prisma } from "@/prisma";

async function getDeputeVotesUnCached(slug: string) {
  try {
    return await prisma.acteur.findFirst({
      where: { slug },

      // Verifier que ca fonctionne quadn on aura les amendements dans la DB
      include: {
        votes: {
          include: {
            scrutinRef: true,
            voteActe: true,
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

//   try {
//     const depute = await db
//       .select("uid", "prenom", "nom")
//       .from("Acteur")
//       .where("slug", "=", slug);
//     if (!depute) {
//       return {};
//     }

//     const votes = await db
//       .select("*")
//       .from("Vote")
//       .where("acteurRefUid", "=", depute[0].uid)
//       .rightJoin(
//         // I don't know why this has to be a right join to work
//         function () {
//           this.select(["voteRefUid", "acteLegislatifRefUid"])
//             .from("VoteActeLegislatif")
//             .as("voteActe");
//         },
//         "voteActe.voteRefUid",
//         "Vote.scrutinRefUid"
//       )
//       .leftJoin(
//         function () {
//           this.select([
//             "uid as acte_uid",
//             "codeActe",
//             "nomCanonique",
//             "libelleCourtActe",
//           ])
//             .from("ActeLegislatif")
//             .as("acte");
//         },
//         "voteActe.acteLegislatifRefUid",
//         "acte.acte_uid"
//       )
//       .rightJoin(
//         // I don't know why this has to be a right join to work
//         function () {
//           this.select(["texteAssocieRefUid", "acteLegislatifRefUid"])
//             .from("TexteAssocie")
//             .as("texteAssocie");
//         },
//         "texteAssocie.acteLegislatifRefUid",
//         "acte.acte_uid"
//       )
//       .leftJoin(
//         // I don't know why this has to be a right join to work
//         function () {
//           this.select(["uid as docu_uid", "titrePrincipalCourt"])
//             .from("Document")
//             .as("docu");
//         },
//         "texteAssocie.texteAssocieRefUid",
//         "docu.docu_uid"
//       )
//       .options({ nestTables: true });

//     return {
//       depute: depute[0],
//       votes,
//     };
//   } catch (error) {
//     console.error(`Error fetching amendement from depute ${slug}:`, error);
//     throw error;
//   }
// }

export default async function Votes(props: { deputeSlug: string }) {
  const deputeWithVote = await getDeputeVotes(props.deputeSlug);

  if (!deputeWithVote) {
    return <p>Deputé inconnu</p>;
  }
  const { votes = [] } = deputeWithVote;

  return (
    <pre>
      Travaux
      <br />
      {/* {votes?.map((vote) => {
        const { id, positionVote, scrutinRef } = vote;

        const titrePrincipalCourt =
          scrutinRef?.acteLegislatifsRef?.textesAssocies[0].return(
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
          );
      })} */}
      {JSON.stringify(votes, null, 2)}
    </pre>
  );
}
