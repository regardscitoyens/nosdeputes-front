import React from "react";

// import { prisma } from "@/prisma";

// import { VotesPage } from "./VotesPage";

// async function getDossierVotesUnCached(uid: string) {
//   try {
//     return await prisma.dossier.findFirst({
//       where: { uid },

//       select: {
//         uid: true,
//         actesLegislatifs: {
//           where: { NOT: [{ voteRefs: { none: {} } }] },
//           select: {
//             uid: true,
//             codeActe: true,
//             voteRefs: {
//               include: {
//                 voteRef: {
//                   include: {
//                     votes: {
//                       include: {
//                         acteurRef: true,
//                         groupeVotantRef: {
//                           include: {
//                             organeRef: true,
//                           },
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     });
//   } catch (error) {
//     console.error(`Error fetching amendement from dossier ${uid}:`, error);
//     throw error;
//   }
// }

// const getDossierVotes = React.cache(getDossierVotesUnCached);

// export type DossierType = Awaited<ReturnType<typeof getDossierVotesUnCached>>;

export default async function Votes({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <p>Page en construction</p>;
  // const { id } = await params;
  // const dossierWithVote = await getDossierVotes(id);

  // return <VotesPage dossier={dossierWithVote} />;
}
