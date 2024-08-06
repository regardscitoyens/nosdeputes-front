import { ActeLegislatifWithDate } from "@/repository/Acts";

export function sortActDate(
  act1: ActeLegislatifWithDate,
  act2: ActeLegislatifWithDate
) {
  if (act1.dateActe && act2.dateActe) {
    if (act1.dateActe.getTime() > act2.dateActe.getTime()) return 1;
    if (act1.dateActe.getTime() < act2.dateActe.getTime()) return -1;
  }
  return 0;
}
