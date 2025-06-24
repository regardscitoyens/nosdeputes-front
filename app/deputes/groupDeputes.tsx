import { Acteur, Mandat, Organe } from "@prisma/client";

export function groupDeputes(
  deputes: Record<string, Acteur & { mandatPrincipal?: Mandat }>
) {
  const uidPerNom: Record<string, string[]> = {};
  const uidPerGroup: Record<string, string[]> = {};
  const uidPerCirco: Record<string, string[]> = {};

  Object.entries(deputes).forEach(([deputeUid, depute]) => {
    const { nom, mandatPrincipal, groupeParlementaireUid } = depute;

    const numDepartement = mandatPrincipal?.numDepartement ?? "";

    // Prend la premiere majuscule du nom pour eviter de trier par particule ("de Courson" renvoit "C" et pas "d")
    const initial = nom[nom.match(/[A-Z]/)!.index ?? 0];

    if (!uidPerNom[initial]) {
      uidPerNom[initial] = [];
    }
    if (!uidPerCirco[numDepartement]) {
      uidPerCirco[numDepartement] = [];
    }
    if (!uidPerGroup[groupeParlementaireUid ?? ""]) {
      uidPerGroup[groupeParlementaireUid ?? ""] = [];
    }

    uidPerNom[initial].push(deputeUid);
    uidPerCirco[numDepartement].push(deputeUid);
    uidPerGroup[groupeParlementaireUid ?? ""].push(deputeUid);
  });

  return {
    uidPerNom,
    uidPerGroup,
    uidPerCirco,
  };
}
