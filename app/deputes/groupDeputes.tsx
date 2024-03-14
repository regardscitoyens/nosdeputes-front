export type DeputeData = {
  nom: string;
  prenom: string;
  slug: string;
  numDepartement: string;
  dateDebut: string;
  dateFin: null | string;
} & (
  | {
      organe_uid: null;
      group_color: null;
      group_libelle: null;
      group_libelle_short: null;
    }
  | {
      organe_uid: string;
      group_color: string;
      group_libelle: string;
      group_libelle_short: string;
    }
);

export function groupDeputes(deputes: DeputeData[]) {
  const indexesPerNom: Record<string, number[]> = {};
  const indexesPerGroup: Record<string, number[]> = {};
  const indexesPerCirco: Record<string, number[]> = {};
  const groups: Record<
    string,
    {
      color: string;
      libelle: string;
      libelle_short: string;
    }
  > = {};

  deputes.forEach((depute, deputeIndex) => {
    const {
      nom,
      numDepartement,
      organe_uid,
      group_color,
      group_libelle,
      group_libelle_short,
    } = depute;

    // Prend la premiere majuscule du nom pour eviter de trier par particule ("de Courson" renvoit "C" et pas "d")
    const initial = nom[nom.match(/[A-Z]/)!.index ?? 0];

    if (!indexesPerNom[initial]) {
      indexesPerNom[initial] = [];
    }
    if (!indexesPerCirco[numDepartement]) {
      indexesPerCirco[numDepartement] = [];
    }

    indexesPerNom[initial].push(deputeIndex);
    indexesPerCirco[numDepartement].push(deputeIndex);

    if (organe_uid && group_color) {
      if (!groups[organe_uid]) {
        groups[organe_uid] = {
          color: group_color,
          libelle: group_libelle,
          libelle_short: group_libelle_short,
        };
      }
      if (!indexesPerGroup[organe_uid]) {
        indexesPerGroup[organe_uid] = [];
      }
      indexesPerGroup[organe_uid].push(deputeIndex);
    }
  });

  return {
    indexesPerNom,
    indexesPerGroup,
    indexesPerCirco,
    groups,
  };
}
