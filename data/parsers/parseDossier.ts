import { Dossier } from "@prisma/client";

export function parseDossier(dossier: Dossier) {
  if ("dateMaj" in dossier && dossier.dateMaj !== null) {
    dossier.dateMaj = new Date(dossier.dateMaj);
  }

  if ("dateDepot" in dossier && dossier.dateDepot !== null) {
    dossier.dateDepot = new Date(dossier.dateDepot);
  }
  if ("dateDernierActe" in dossier && dossier.dateDernierActe !== null) {
    dossier.dateDernierActe = new Date(dossier.dateDernierActe);
  }
}