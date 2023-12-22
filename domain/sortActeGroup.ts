import { ActsStructure } from "@/repository/Acts";
import { ActeLegislatif } from "@/repository/types";

// Chaque list est un ordre d'éléments.
// Par exemple le retrait d'une initiative arrive apres sont depot (enfin on peut avoir des surprises)
// C'est une connaissance métier
const ACTS_ORDERS = [
  // depot -> commission -> debat -> retrait
  ["AN1-DEPOT", "AN1-COM", "AN1-DEBATS", "AN1-RTRINI"],
];

export default function getSortedActGroups(
  group: ActsStructure,
  actsLookup: Record<string, ActeLegislatif>
): {
  children?: ActsStructure;
  groupDate?: Date;
  acts?: ActeLegislatif[];
}[] {
  return Object.entries(group)
    .sort(([codeAct1, { date: date1 }], [codeAct2, { date: date2 }]) => {
      if (date1 && date2) {
        if (date1.getTime() > date2.getTime()) return 1;
        if (date1.getTime() < date2.getTime()) return -1;
      }

      for (let i = 0; i < ACTS_ORDERS.length; i++) {
        const order = ACTS_ORDERS[i];
        if (order.includes(codeAct1) && order.includes(codeAct2)) {
          return (
            order.findIndex((o) => o === codeAct1) -
            order.findIndex((o) => o === codeAct2)
          );
        }
      }
      return 0;
    })
    .map(([codeAct, { date, children, ids }]) => {
      return {
        groupDate: date,
        children,
        acts: ids
          ?.map((id) => actsLookup[id])
          .sort((act1, act2) => {
            // Ici on a un problem pour les elements du dernier niveau.
            // Comme on tri le group puis on tris leurs enfants, on a le probleme suivant dans le dossier DLR5L16N46484:
            // Le Dépot de rapport devrait être entre la premiere et la second réunion.
            // Pour l'instant on refait l'ordre dans la timeline.

            // - Réunion de commission du 26 oct. 2022
            // - Réunion de commission du 16 nov. 2022
            // - Réunion de commission du 28 nov. 2022
            // - Dépôt de rapport du 15 nov. 2022
            if (act1.date && act2.date) {
              if (act1.date.getTime() > act2.date.getTime()) return 1;
              if (act1.date.getTime() < act2.date.getTime()) return -1;
            }
            return 0;
          }),
      };
    });
}
