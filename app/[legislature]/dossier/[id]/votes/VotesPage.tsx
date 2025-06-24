// "use client";
// import * as React from "react";
// import Box from "@mui/material/Box";
// import { ActeSelector } from "./ActeSelector";
// import type { DossierType } from "./page";
// import { useSearchState } from "./useVoteState";
// import { MainResult } from "./MainResult";
// import { VotesDeputes } from "./VotesDeputes";

// export function VotesPage(props: { dossier: DossierType }) {
//   const { dossier } = props;

//   const actsWithVote = dossier
//     ? dossier.actesLegislatifs?.map(({ uid, codeActe }) => ({
//         uid,
//         codeActe,
//       }))
//     : [];

//   const [acteUid, setActeUid] = useSearchState(
//     "acteUid",
//     actsWithVote[0]?.uid ?? ""
//   );
//   const [voteId, setVoteId] = useSearchState("voteId", "");
//   const [zoom, setZoom] = useSearchState<"depute" | "group" | "">("zoom", "");

//   if (!dossier) {
//     return <p>Pas de votes trouvé pour ce dossier</p>;
//   }

//   const acte = dossier.actesLegislatifs.find(({ uid }) => uid === acteUid);
//   const scrutins = acte?.voteRefs
//     .map((voteRefs) => voteRefs.voteRef)
//     .filter((scrutin) => scrutin !== null);

//   return (
//     <Box sx={{ p: 2 }}>
//       <ActeSelector
//         acteUid={acteUid}
//         actes={actsWithVote}
//         setActeUid={setActeUid}
//       />
//       <React.Suspense fallback={<div />}>
//         {scrutins?.map((scrutin) => (
//           <MainResult
//             key={scrutin.uid}
//             scrutin={scrutin}
//             setZoom={setZoom}
//             zoom={zoom}
//             vote={
//               <React.Suspense fallback={<div>loading</div>}>
//                 <VotesDeputes votes={scrutin.votes} />
//               </React.Suspense>
//             }
//           />
//         ))}
//       </React.Suspense>
//     </Box>
//   );
// }
