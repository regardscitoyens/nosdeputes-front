// import React from "react";

// import Stack from "@mui/material/Stack";

// import AmendementCard from "@/components/folders/AmendementCard";
// import { prisma } from "@/prisma";
// import { AmendementsStatistics } from "./AmendementsStatistics";

// async function getDeputeAmendementUnCached(slug: string) {
//   try {
//     return await prisma.acteur.findFirst({
//       where: { slug },
//       select: {
//         uid: true,
//         amendements: {
//           include: { texteLegislatifRef: { select: { numNotice: true } } },
//         },
//       },
//     });
//   } catch (error) {
//     console.error(`Error fetching amendement from depute ${slug}:`, error);
//     throw error;
//   }
// }

// const getDeputeAmendement = React.cache(getDeputeAmendementUnCached);

export default async function Amendements({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <p>Page en construction</p>;
  // const { slug } = await params;
  // const deputeWithAmendements = await getDeputeAmendement(slug);

  // const { amendements, uid } = deputeWithAmendements!;

  // return (
  //   <Stack>
  //     <h2>Amendements</h2>

  //     <AmendementsStatistics deputeUid={uid} />

  //     {amendements &&
  //       amendements
  //         .sort((a, b) =>
  //           (a.numeroOrdreDepot ?? Number.POSITIVE_INFINITY) <
  //           (b.numeroOrdreDepot ?? Number.POSITIVE_INFINITY)
  //             ? -1
  //             : 1
  //         )
  //         .map((amendement) => {
  //           const numeroNotice = amendement.texteLegislatifRef?.numNotice;
  //           const section = amendement.divisionArticleDesignationCourte;
  //           // const subSection = amendement.alineaDesignation;

  //           const article = [
  //             section,
  //             // subSection
  //           ]
  //             .filter((item) => item !== null)
  //             .join(" ");

  //           const titre = `Amendement N°${amendement.numeroOrdreDepot}${
  //             numeroNotice == null
  //               ? ""
  //               : ` au text N°${numeroNotice}${article ? ` - ${article}` : ""}`
  //           }`;
  //           return (
  //             <AmendementCard
  //               key={amendement.uid}
  //               amendement={amendement}
  //               depute={null}
  //               titre={titre}
  //             />
  //           );
  //         })}
  // </Stack>
  // );
}
