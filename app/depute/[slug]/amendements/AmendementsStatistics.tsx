// import React from "react";
// import { prisma } from "@/prisma";
// import Box from "@mui/material/Box";

// async function getDeputeAmendementStatsUnCached(uid: string) {
//   try {
//     const etatAmendementsCosignes = await prisma.amendement.groupBy({
//       by: ["sortAmendement", "etatLibelle"],
//       where: {
//         coSignataires: {
//           some: {
//             acteurRefUid: uid,
//           },
//         },
//       },
//       _count: { uid: true },
//     });

//     const etatAmendementsProposes = await prisma.amendement.groupBy({
//       by: ["sortAmendement", "etatLibelle"],
//       where: {
//         acteurRefUid: uid,
//       },
//       _count: { uid: true },
//     });

//     return { etatAmendementsCosignes, etatAmendementsProposes };
//   } catch (error) {
//     console.error(`Error fetching amendement from depute ${uid}:`, error);
//     throw error;
//   }
// }

// const getDeputeStatsAmendement = React.cache(getDeputeAmendementStatsUnCached);

// const sorts = ["Adopté", "Non soutenu", "Rejeté", "Retiré", "Tombé"];
// const etats = ["A discuter", "En traitement", "Irrecevable", "Irrecevable 40"];

// export async function AmendementsStatistics({
//   deputeUid,
// }: {
//   deputeUid: string;
// }) {
//   const { etatAmendementsCosignes, etatAmendementsProposes } =
//     await getDeputeStatsAmendement(deputeUid);

//   const nbCoSigne = etatAmendementsCosignes.reduce<{ [key: string]: number }>(
//     (acc, item) => {
//       if (item.etatLibelle && etats.includes(item.etatLibelle)) {
//         const nb = item._count.uid;
//         return { ...acc, [item.etatLibelle]: nb, total: (acc.total ?? 0) + nb };
//       }
//       if (item.sortAmendement && sorts.includes(item.sortAmendement)) {
//         const nb = item._count.uid;
//         return {
//           ...acc,
//           [item.sortAmendement]: nb,
//           total: (acc.total ?? 0) + nb,
//         };
//       }
//       return acc;
//     },
//     {}
//   );

//   const nbPropose = etatAmendementsProposes.reduce<{ [key: string]: number }>(
//     (acc, item) => {
//       if (item.etatLibelle && etats.includes(item.etatLibelle)) {
//         const nb = item._count.uid;
//         return { ...acc, [item.etatLibelle]: nb, total: (acc.total ?? 0) + nb };
//       }
//       if (item.sortAmendement && sorts.includes(item.sortAmendement)) {
//         const nb = item._count.uid;
//         return {
//           ...acc,
//           [item.sortAmendement]: nb,
//           total: (acc.total ?? 0) + nb,
//         };
//       }
//       return acc;
//     },
//     {}
//   );
//   return (
//     <Box
//       component="table"
//       sx={{
//         "td:nth-of-type(1)": { textAlign: "right" },
//         "td:nth-of-type(2)": { textAlign: "center" },
//         "td:nth-of-type(3)": { textAlign: "left" },
//       }}
//     >
//       <thead>
//         <tr>
//           <td>proposés</td>
//           <td />
//           <td>signés</td>
//         </tr>
//       </thead>
//       <tbody>
//         {[...sorts, ...etats].map((state) => (
//           <tr key={state}>
//             <td>{nbPropose[state] ?? 0}</td>
//             <td>{state}</td>
//             <td>{nbCoSigne[state] ?? 0}</td>
//           </tr>
//         ))}
//       </tbody>
//     </Box>
//   );
// }
