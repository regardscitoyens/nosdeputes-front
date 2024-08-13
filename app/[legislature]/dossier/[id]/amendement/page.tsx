import React from "react";

import { prisma } from "@/prisma";
import { AmendementTab } from "./AmendementTab";

async function getAmendementsUnCached(uid: string) {
  try {
    return prisma.dossier.findFirst({
      where: {
        uid,
      },
      include: {
        documents: {
          include: {
            amendements: {
              include: {
                acteurRef: { include: { groupeParlementaire: true } },
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching amendements:", error);
    throw error;
  }
}

const getAmendements = React.cache(getAmendementsUnCached);

export default async function Page({
  params,
}: {
  params: { legislature: string; id: string };
}) {
  const dossierWithAmendement = await getAmendements(params.id);

  if (dossierWithAmendement === null) {
    return <p>Le dossier n&apos;a pas été trouvé</p>;
  }

  return <AmendementTab dossier={dossierWithAmendement} />;
}
