import { ActeLegislatif } from "@prisma/client";

export function parseActeLefislatif(acte: ActeLegislatif) {
  if ("dateMaj" in acte && acte.dateMaj !== null) {
    acte.dateMaj = new Date(acte.dateMaj);
  }

  if ("dateActe" in acte && acte.dateActe !== null) {
    acte.dateActe = new Date(acte.dateActe);
  }
}