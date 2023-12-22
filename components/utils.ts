import { ActeLegislatif } from "@/repository/types";

export function sortActDate(act1: ActeLegislatif, act2: ActeLegislatif) {
  if (act1.dateActe && act2.dateActe) {
    if (act1.dateActe.getTime() > act2.dateActe.getTime()) return 1;
    if (act1.dateActe.getTime() < act2.dateActe.getTime()) return -1;
  }
  return 0;
}
