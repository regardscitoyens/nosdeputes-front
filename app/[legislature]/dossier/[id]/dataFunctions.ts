import * as React from "react";
import { prisma } from "@/prisma";
import { ActeLegislatif } from "@prisma/client";
import { Status } from "@/components/StatusChip";

async function getDossierUnCached(uid: string) {
  try {
    return prisma.dossier.findFirst({
      where: { uid },
      include: {
        actesLegislatifs: true,
      },
    });
  } catch (error) {
    console.error("Error fetching depute:", error);
    throw error;
  }
}

export const getDossier = React.cache(getDossierUnCached);

const statusOrder = ["AN1", "SN1", "AN2", "SN2", "AN3", "SN3", "CMP", "PROM"];

export const statusInfo: Record<string, { label: string; status: Status }> = {
  AN1: { label: "1e lecture AN", status: "review" },
  SN1: { label: "1e lecture SN", status: "review" },
  AN2: { label: "2e lecture AN", status: "review" },
  SN2: { label: "2e lecture SN", status: "review" },
  AN3: { label: "3e lecture AN", status: "review" },
  SN3: { label: "3e lecture SN", status: "review" },
  CMP: { label: "Commission Mixte Paritaire", status: "review" },
  PROM: { label: "Promulguée", status: "validated" },
};

export function getCurrentStatus(acts: ActeLegislatif[]) {
  const codes = acts.map((act) => act.codeActe);

  for (let i = 0; i < statusOrder.length; i += 1) {
    const status = statusOrder[statusOrder.length - 1 - i];
    if (codes.some((code) => code.startsWith(status))) {
      return status;
    }
  }
}

export function getCommissionUids(
  acts: ActeLegislatif[],
  type: "FOND" | "AVIS"
) {
  return Array.from(
    new Set(
      acts
        .filter((act) => act.codeActe.endsWith(`COM-${type}`))
        .map((act) => act.organeRefUid)
        .filter((id) => id !== null)
    )
  );
}

export function getCommissionNomination(
  acts: ActeLegislatif[],
  type: "FOND" | "AVIS"
) {
  return Array.from(
    new Set(
      acts
        .filter((act) => act.codeActe.endsWith(`COM-${type}-NOMIN`))
        .map((act) => act.uid)
        .filter((id) => id !== null)
    )
  );
}
