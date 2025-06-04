import { ActeLegislatif } from "@prisma/client";

// Chaque list est un ordre d'éléments.
// Par exemple le retrait d'une initiative arrive apres sont depot (enfin on peut avoir des surprises)
// C'est une connaissance métier
const ACTS_ORDERS = [
  // depot -> commission -> debat -> retrait
  ["AN1-DEPOT", "AN1-COM", "AN1-DEBATS", "AN1-RTRINI"],
];

export default function getSortedActs(
  actes: {
    id: string;
    date?: Date;
    codeActe: ActeLegislatif["codeActe"];
  }[]
): string[] {
  return actes
    .sort(
      (
        { date: date1, codeActe: codeActe1 },
        { date: date2, codeActe: codeActe2 }
      ) => {
        if (date1 && date2) {
          // Si les deux actes on une date, on s'en l'utilise
          if (date1.getTime() > date2.getTime()) return 1;
          if (date1.getTime() < date2.getTime()) return -1;
        }

        // Cas particulier d'acte sans date

        for (let i = 0; i < ACTS_ORDERS.length; i++) {
          const order = ACTS_ORDERS[i];
          if (order.includes(codeActe1) && order.includes(codeActe2)) {
            // Certains actes ont lieu avant d'autre. Par exemple u, depot de projet avant la saisie des commissions.
            return (
              order.findIndex((o) => o === codeActe1) -
              order.findIndex((o) => o === codeActe2)
            );
          }
        }
        return 0;
      }
    )
    .map(({ id }) => id);
}
