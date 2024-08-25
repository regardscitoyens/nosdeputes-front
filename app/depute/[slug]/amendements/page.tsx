import React from "react";

import Stack from "@mui/material/Stack";

import AmendementCard from "@/components/folders/AmendementCard";
import { prisma } from "@/prisma";

async function getDeputeAmendementUnCached(slug: string) {
  try {
    return await prisma.acteur.findFirst({
      where: { slug },
      select: {
        amendements: {
          include: { texteLegislatifRef: { select: { numNotice: true } } },
        },
      },
    });
  } catch (error) {
    console.error(`Error fetching amendement from depute ${slug}:`, error);
    throw error;
  }
}

const getDeputeAmendement = React.cache(getDeputeAmendementUnCached);

export default async function Amendements({
  params,
}: {
  params: { slug: string };
}) {
  const deputeWithAmendements = await getDeputeAmendement(params.slug);

  const { amendements } = deputeWithAmendements!;

  return (
    <Stack>
      <p>Amendements</p>
      {amendements &&
        amendements
          .sort((a, b) =>
            Number.parseInt(a.numeroOrdreDepot || "") <
            Number.parseInt(b.numeroOrdreDepot || "")
              ? -1
              : 1
          )
          .map((amendement) => {
            const numeroNotice = amendement.texteLegislatifRef?.numNotice;
            const section = amendement.divisionArticleDesignationCourte;
            // const subSection = amendement.alineaDesignation;

            const article = [
              section,
              // subSection
            ]
              .filter((item) => item !== null)
              .join(" ");

            const titre = `Amendement N°${amendement.numeroOrdreDepot}${
              numeroNotice == null
                ? ""
                : ` au text N°${numeroNotice}${article ? ` - ${article}` : ""}`
            }`;
            return (
              <AmendementCard
                key={amendement.uid}
                amendement={amendement}
                depute={null}
                titre={titre}
              />
            );
          })}
    </Stack>
  );
}
