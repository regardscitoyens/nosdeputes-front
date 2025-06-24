import * as React from "react";
import { ActeLegislatif, Dossier, Rapporteur } from "@prisma/client";
import { Status } from "@/components/StatusChip";

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

/**
 * Extrait les commissions saisies sur le dossier.
 * @param acts
 * @param type Le type de saisie (FOND ou AVIS)
 * @returns la liste des uid des commissions
 */
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