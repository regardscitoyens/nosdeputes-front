import * as React from "react";

import { prisma } from "@/prisma";

async function getDeputesUncached(legislature: string) {
  return prisma.acteur.findMany({
    where: {
      mandats: {
        some: {
          typeOrgane: "ASSEMBLEE",
          legislature,
        },
      },
    },
    include: {
      groupeParlementaire: true,
      mandatPrincipal: true,
    },
  });
}
export const getDeputes = React.cache(getDeputesUncached);
