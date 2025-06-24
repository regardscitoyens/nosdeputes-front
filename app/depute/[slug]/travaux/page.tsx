import React from "react";

// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// import Link from "next/link";

// import { prisma } from "@/prisma";

// async function getDeputeActiviteUnCached(slug: string) {
//   try {
//     return await prisma.acteur.findFirst({
//       where: { slug },

//       select: {
//         // To investigate. Je ne sais pas pourquoi ce champ contient un sous ensemble de `documents`
//         // auteurs: {
//         //   include: {
//         //     documentRef: {
//         //       select: {
//         //         auteurPrincipal: true,
//         //         titrePrincipalCourt: true,
//         //         coSignataires: true,
//         //       },
//         //     },
//         //   },
//         // },
//         documents: true,
//         // initiateurActeLegislatif: true,
//         dossiers: true,
//         // rapporteurs: true,
//       },
//     });
//   } catch (error) {
//     console.error(`Error fetching amendement from depute ${slug}:`, error);
//     throw error;
//   }
// }

// const getDeputeActivite = React.cache(getDeputeActiviteUnCached);

export default async function Amendements({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <p>Page en construction</p>
  // const { slug } = await params;
  // const deputeWithAmendements = await getDeputeActivite(slug);

  // const {
  //   // auteurs,
  //   documents,
  //   // initiateurActeLegislatif,
  //   dossiers,
  //   // rapporteurs,
  //   // ...depute
  // } = deputeWithAmendements!;

  // const propositionDeLoi = documents.filter(
  //   (doc) => doc.classeCode === "PIONLOI"
  // );
  // const rapports = documents.filter(
  //   (doc) => doc.classeCode === "RAPPORT" || doc.classeCode === "RAPINF"
  // );

  // const resolutions = documents.filter((doc) => doc.classeCode === "RES");

  // return (
  //   <Stack>
  //     <Typography variant="h2">Travaux legislatifs</Typography>
  //     <Typography variant="h3" sx={{ mb: 1, mt: 2 }}>
  //       Propositions de loi
  //     </Typography>
  //     {(!propositionDeLoi || propositionDeLoi.length === 0) && (
  //       <Typography variant="body2">
  //         Aucune proposition de loi trouvée
  //       </Typography>
  //     )}
  //     <ul>
  //       {propositionDeLoi.map((docs) => (
  //         <li
  //           key={docs.uid}
  //           style={{
  //             display: "flex",
  //             width: "100%",
  //             justifyContent: "space-between",
  //             marginBottom: 4,
  //           }}
  //         >
  //           <Typography variant="body2">{docs.titrePrincipalCourt}</Typography>
  //           <Typography variant="body2" key={docs.uid} fontWeight="light">
  //             {docs.dateCreation?.toLocaleDateString()}
  //           </Typography>
  //         </li>
  //       ))}
  //     </ul>
  //     <Typography variant="h3" sx={{ mb: 1, mt: 2 }}>
  //       Rapports
  //     </Typography>
  //     {(!rapports || rapports.length === 0) && (
  //       <Typography variant="body2">Aucun rapport trouvé</Typography>
  //     )}
  //     <ul>
  //       {rapports.map((docs) => (
  //         <li
  //           key={docs.uid}
  //           style={{
  //             display: "flex",
  //             width: "100%",
  //             justifyContent: "space-between",
  //             marginBottom: 4,
  //           }}
  //         >
  //           <Typography variant="body2">{docs.titrePrincipalCourt}</Typography>
  //           <Typography variant="body2" key={docs.uid} fontWeight="light">
  //             {docs.dateCreation?.toLocaleDateString()}
  //           </Typography>
  //         </li>
  //       ))}
  //     </ul>
  //     <Typography variant="h3" sx={{ mb: 1, mt: 2 }}>
  //       Resolutions
  //     </Typography>
  //     {(!resolutions || resolutions.length === 0) && (
  //       <Typography variant="body2">Aucune resolution trouvée</Typography>
  //     )}
  //     <ul>
  //       {resolutions.map((docs) => (
  //         <li
  //           key={docs.uid}
  //           style={{
  //             display: "flex",
  //             width: "100%",
  //             justifyContent: "space-between",
  //             marginBottom: 4,
  //           }}
  //         >
  //           <Typography variant="body2">{docs.titrePrincipalCourt}</Typography>
  //           <Typography variant="body2" key={docs.uid} fontWeight="light">
  //             {docs.dateCreation?.toLocaleDateString()}
  //           </Typography>
  //         </li>
  //       ))}
  //     </ul>

  //     <Typography variant="h3" sx={{ mb: 1, mt: 2 }}>
  //       Dossier legislatifs initié
  //     </Typography>
  //     {(!dossiers || dossiers.length === 0) && (
  //       <Typography variant="body2">Aucune resolution trouvée</Typography>
  //     )}
  //     <ul>
  //       {dossiers.map((dossier) => (
  //         <li
  //           key={dossier.uid}
  //           style={{
  //             display: "flex",
  //             width: "100%",
  //             justifyContent: "space-between",
  //             marginBottom: 4,
  //           }}
  //         >
  //           <Typography
  //             variant="body2"
  //             component={Link}
  //             href={`/${dossier.legislature}/dossier/${dossier.uid}/`}
  //           >
  //             {dossier.titre}
  //           </Typography>
  //           {/* TODO: Ajouter le status du dossier legislatif ou la date de derniere modification */}
  //         </li>
  //       ))}
  //     </ul>
  //   </Stack>
  // );
}
