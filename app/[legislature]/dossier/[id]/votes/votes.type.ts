import { Acteur, GroupeVotant, Organe, Vote } from "@prisma/client";

export type VoteWithActeur = Vote & {
  acteurRef: null | Acteur;
  groupeVotantRef:
    | null
    | (GroupeVotant & {
        organeRef: null | Organe;
      });
};
