import { ActeLegislatif } from "./types";

export type SN1_DEPOT = {
  codeActe: "SN1-DEPOT";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  texteAssocieRefUid: string;
  dossierRefUid: string;
  organeProvenanceRefUid: null | string;
};
export type AN1 = {
  codeActe: "AN1";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};
export type SN1_COM = {
  codeActe: "SN1-COM";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};
export type SN1_DEBATS = {
  codeActe: "SN1-DEBATS";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};
export type AN1_DEPOT = {
  codeActe: "AN1-DEPOT";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  organeProvenanceRefUid: null | string;
  texteAssocieRefUid: string;
  dossierRefUid: string;
};
export type AN1_COM = {
  codeActe: "AN1-COM";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};
export type SN1_COM_FOND = {
  codeActe: "SN1-COM-FOND";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};
export type SN1_DEBATS_DEC = {
  codeActe: "SN1-DEBATS-DEC";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  famCodeStatutConclusion: string;
  libelleStatutConclusion: string;
  dossierRefUid: string;
  reunionRefUid: null | string;
};
export type AN1_COM_FOND = {
  codeActe: "AN1-COM-FOND";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};
export type SN1_COM_FOND_SAISIE = {
  codeActe: "SN1-COM-FOND-SAISIE";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  dossierRefUid: string;
};
export type SN1_COM_FOND_NOMIN = {
  codeActe: "SN1-COM-FOND-NOMIN";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};
export type SN1_COM_FOND_RAPPORT = {
  codeActe: "SN1-COM-FOND-RAPPORT";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  texteAssocieRefUid: string;
  dossierRefUid: string;
  texteAdopteRefUid: null | string;
};
export type AN1_COM_FOND_SAISIE = {
  codeActe: "AN1-COM-FOND-SAISIE";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  dossierRefUid: string;
};
export type SN1 = {
  codeActe: "SN1";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};
export type AN2 = {
  codeActe: "AN2";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};
export type AN1_DEBATS = {
  codeActe: "AN1-DEBATS";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};
export type AN2_DEPOT = {
  codeActe: "AN2-DEPOT";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  organeProvenanceRefUid: string;
  texteAssocieRefUid: string;
  dossierRefUid: string;
};
export type AN2_COM = {
  codeActe: "AN2-COM";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};
export type AN1_DEBATS_SEANCE = {
  codeActe: "AN1-DEBATS-SEANCE";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  odjRefUid: string;
  reunionRefUid: string;
  dossierRefUid: string;
};
export type AN1_DEBATS_MOTION = {
  codeActe: "AN1-DEBATS-MOTION";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  famCodeTypeMotion: string;
  libelleTypeMotion: string;
  dossierRefUid: string;
  auteurMotionRefUid: null | string;
};
export type AN1_DEBATS_MOTION_VOTE = {
  codeActe: "AN1-DEBATS-MOTION-VOTE";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  famCodeStatutConclusion: string;
  libelleStatutConclusion: string;
  reunionRefUid: null | string;
  dossierRefUid: string;
};
export type SN1_DEBATS_SEANCE = {
  codeActe: "SN1-DEBATS-SEANCE";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  odjRefUid: string;
  reunionRefUid: string;
  dossierRefUid: string;
};
export type AN2_COM_FOND = {
  codeActe: "AN2-COM-FOND";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};
export type AN1_COM_FOND_NOMIN = {
  codeActe: "AN1-COM-FOND-NOMIN";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  dossierRefUid: string;
};
export type AN1_COM_FOND_REUNION = {
  codeActe: "AN1-COM-FOND-REUNION";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  odjRefUid: string;
  reunionRefUid: string;
  dossierRefUid: string;
};
export type AN1_COM_FOND_RAPPORT = {
  codeActe: "AN1-COM-FOND-RAPPORT";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  texteAssocieRefUid: string;
  dossierRefUid: string;
  texteAdopteRefUid: null | string;
};
export type AN2_COM_FOND_SAISIE = {
  codeActe: "AN2-COM-FOND-SAISIE";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  dossierRefUid: string;
};
export type AN1_DEBATS_DEC = {
  codeActe: "AN1-DEBATS-DEC";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  famCodeStatutConclusion: string;
  libelleStatutConclusion: string;
  reunionRefUid: string;
  dossierRefUid: string;
};
export type ANLUNI = {
  codeActe: "ANLUNI";
  uid: string;
  nomCanonique: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};
export type SN1_COM_AVIS = {
  codeActe: "SN1-COM-AVIS";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};
export type SN1_COM_AVIS_SAISIE = {
  codeActe: "SN1-COM-AVIS-SAISIE";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  dossierRefUid: string;
};
export type SN1_COM_AVIS_NOMIN = {
  codeActe: "SN1-COM-AVIS-NOMIN";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};
export type SN1_COM_AVIS_RAPPORT = {
  codeActe: "SN1-COM-AVIS-RAPPORT";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  texteAssocieRefUid: string;
  dossierRefUid: string;
};
export type ANLUNI_DEPOT = {
  codeActe: "ANLUNI-DEPOT";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  texteAssocieRefUid: string;
  dossierRefUid: string;
};
export type CMP = {
  codeActe: "CMP";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};
export type SN1_PROCACC = {
  codeActe: "SN1-PROCACC";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  dossierRefUid: string;
};
export type CMP_DEPOT = {
  codeActe: "CMP-DEPOT";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  organeProvenanceRefUid: string;
  texteAssocieRefUid: string;
  dossierRefUid: string;
};
export type CMP_SAISIE = {
  codeActe: "CMP-SAISIE";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date;
  organeRefUid: string;
  dossierRefUid: string;
};
export type CMP_COM = {
  codeActe: "CMP-COM";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};
export type ANLUNI_COM = {
  codeActe: "ANLUNI-COM";
  uid: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  organeRefUid: string;
  dossierRefUid: string;
};

export type ActLegislatif =
  | SN1_DEPOT
  | AN1
  | SN1_COM
  | SN1_DEBATS
  | AN1_DEPOT
  | AN1_COM
  | SN1_COM_FOND
  | SN1_DEBATS_DEC
  | AN1_COM_FOND
  | SN1_COM_FOND_SAISIE
  | SN1_COM_FOND_NOMIN
  | SN1_COM_FOND_RAPPORT
  | AN1_COM_FOND_SAISIE
  | SN1
  | AN2
  | AN1_DEBATS
  | AN2_DEPOT
  | AN2_COM
  | AN1_DEBATS_SEANCE
  | AN1_DEBATS_MOTION
  | AN1_DEBATS_MOTION_VOTE
  | SN1_DEBATS_SEANCE
  | AN2_COM_FOND
  | AN1_COM_FOND_NOMIN
  | AN1_COM_FOND_REUNION
  | AN1_COM_FOND_RAPPORT
  | AN2_COM_FOND_SAISIE
  | AN1_DEBATS_DEC
  | ANLUNI
  | SN1_COM_AVIS
  | SN1_COM_AVIS_SAISIE
  | SN1_COM_AVIS_NOMIN
  | SN1_COM_AVIS_RAPPORT
  | ANLUNI_DEPOT
  | CMP
  | SN1_PROCACC
  | CMP_DEPOT
  | CMP_SAISIE
  | CMP_COM
  | ANLUNI_COM;

export type ActWithDate =
  | AN1_DEPOT
  | SN1_DEPOT
  | AN2_DEPOT
  | CMP_DEPOT
  | AN1_DEBATS_DEC
  | SN1_DEBATS_DEC
  | AN1_COM_FOND_SAISIE
  | SN1_COM_FOND_SAISIE
  | AN1_COM_FOND_RAPPORT
  | SN1_COM_FOND_RAPPORT
  | AN1_DEBATS_SEANCE
  | AN1_DEBATS_MOTION
  | AN1_DEBATS_MOTION_VOTE
  | SN1_DEBATS_SEANCE
  | AN1_COM_FOND_NOMIN
  | AN1_COM_FOND_REUNION
  | AN2_COM_FOND_SAISIE
  | SN1_COM_AVIS_SAISIE
  | SN1_COM_AVIS_RAPPORT
  | ANLUNI_DEPOT
  | SN1_PROCACC
  | CMP_SAISIE;

const CONTEXT = {
  "AN-APPLI": { lvl: 0, display: true, parents: [] },
  AN1: { lvl: 0, display: true, parents: [] },
  AN2: { lvl: 0, display: true, parents: [] },
  AN20: { lvl: 0, display: true, parents: [] },
  AN21: { lvl: 0, display: true, parents: [] },
  AN3: { lvl: 0, display: true, parents: [] },
  ANLDEF: { lvl: 0, display: true, parents: [] },
  ANLUNI: { lvl: 0, display: true, parents: [] },
  ANNLEC: { lvl: 0, display: true, parents: [] },
  CC: { lvl: 0, display: true, parents: [] },
  CMP: { lvl: 0, display: true, parents: [] },
  EU: { lvl: 0, display: true, parents: [] },
  PROM: { lvl: 0, display: true, parents: [] },
  SN1: { lvl: 0, display: true, parents: [] },
  SN2: { lvl: 0, display: true, parents: [] },
  SN3: { lvl: 0, display: true, parents: [] },
  SNNLEC: { lvl: 0, display: true, parents: [] },
  "AN-APPLI-RAPPORT": { lvl: 1, display: "?", parents: ["AN-APPLI"] },
  "AN1-ACIN": { lvl: 1, display: true, parents: ["AN1"] },
  "AN1-AVCE": { lvl: 1, display: true, parents: ["AN1"] },
  "AN1-COM": { lvl: 1, display: true, parents: ["AN1"] },
  "AN1-DEBATS": { lvl: 1, display: true, parents: ["AN1"] },
  "AN1-DEPOT": { lvl: 1, display: true, parents: ["AN1"] },
  "AN1-DGVT": { lvl: 1, display: true, parents: ["AN1"] },
  "AN1-DPTLETTRECT": { lvl: 1, display: true, parents: ["AN1"] },
  "AN1-ETI": { lvl: 1, display: true, parents: ["AN1"] },
  "AN1-MOTION": { lvl: 1, display: true, parents: ["AN1"] },
  "AN1-PROCACC": { lvl: 1, display: true, parents: ["AN1"] },
  "AN1-RECBUREAU": { lvl: 1, display: true, parents: ["AN1"] },
  "AN1-RTRINI": { lvl: 1, display: true, parents: ["AN1"] },
  "AN2-COM": { lvl: 1, display: true, parents: ["AN2"] },
  "AN2-DEBATS": { lvl: 1, display: true, parents: ["AN2"] },
  "AN2-DEPOT": { lvl: 1, display: true, parents: ["AN2"] },
  "AN20-COMENQ": { lvl: 1, display: true, parents: ["AN20"] },
  "AN20-MISINF": { lvl: 1, display: true, parents: ["AN20"] },
  "AN20-RAPPORT": { lvl: 1, display: true, parents: ["AN20"] },
  "AN21-APAN": { lvl: 1, display: true, parents: ["AN21"] },
  "AN21-DEBATS": { lvl: 1, display: true, parents: ["AN21"] },
  "AN21-DGVT": { lvl: 1, display: true, parents: ["AN21"] },
  "AN21-MOTION": { lvl: 1, display: true, parents: ["AN21"] },
  "AN21-MPR": { lvl: 1, display: true, parents: ["AN21"] },
  "AN3-COM": { lvl: 1, display: true, parents: ["AN3"] },
  "AN3-DEBATS": { lvl: 1, display: true, parents: ["AN3"] },
  "AN3-DEPOT": { lvl: 1, display: true, parents: ["AN3"] },
  "ANLDEF-COM": { lvl: 1, display: true, parents: ["ANLDEF"] },
  "ANLDEF-DEBATS": { lvl: 1, display: true, parents: ["ANLDEF"] },
  "ANLDEF-DEPOT": { lvl: 1, display: true, parents: ["ANLDEF"] },
  "ANLDEF-DGVT": { lvl: 1, display: true, parents: ["ANLDEF"] },
  "ANLDEF-MOTION": { lvl: 1, display: true, parents: ["ANLDEF"] },
  "ANLUNI-COM": { lvl: 1, display: true, parents: ["ANLUNI"] },
  "ANLUNI-DEBATS": { lvl: 1, display: true, parents: ["ANLUNI"] },
  "ANLUNI-DEPOT": { lvl: 1, display: true, parents: ["ANLUNI"] },
  "ANLUNI-RTRINI": { lvl: 1, display: true, parents: ["ANLUNI"] },
  "ANNLEC-COM": { lvl: 1, display: true, parents: ["ANNLEC"] },
  "ANNLEC-DEBATS": { lvl: 1, display: true, parents: ["ANNLEC"] },
  "ANNLEC-DEPOT": { lvl: 1, display: true, parents: ["ANNLEC"] },
  "ANNLEC-DGVT": { lvl: 1, display: true, parents: ["ANNLEC"] },
  "ANNLEC-MOTION": { lvl: 1, display: true, parents: ["ANNLEC"] },
  "CC-CONCLUSION": { lvl: 1, display: true, parents: ["CC"] },
  "CC-SAISIE-AN": { lvl: 1, display: true, parents: ["CC"] },
  "CC-SAISIE-DROIT": { lvl: 1, display: true, parents: ["CC"] },
  "CC-SAISIE-PAN": { lvl: 1, display: true, parents: ["CC"] },
  "CC-SAISIE-PM": { lvl: 1, display: true, parents: ["CC"] },
  "CC-SAISIE-PR": { lvl: 1, display: true, parents: ["CC"] },
  "CC-SAISIE-PSN": { lvl: 1, display: true, parents: ["CC"] },
  "CC-SAISIE-SN": { lvl: 1, display: true, parents: ["CC"] },
  "CMP-COM": { lvl: 1, display: true, parents: ["CMP"] },
  "CMP-DEBATS-AN": { lvl: 1, display: true, parents: ["CMP"] },
  "CMP-DEBATS-SN": { lvl: 1, display: true, parents: ["CMP"] },
  "CMP-DEC": { lvl: 1, display: true, parents: ["CMP"] },
  "CMP-DEPOT": { lvl: 1, display: true, parents: ["CMP"] },
  "CMP-DGVT": { lvl: 1, display: true, parents: ["CMP"] },
  "CMP-MOTION": { lvl: 1, display: true, parents: ["CMP"] },
  "CMP-SAISIE": { lvl: 1, display: true, parents: ["CMP"] },
  "EU-DEC": { lvl: 1, display: true, parents: ["EU"] },
  "PROM-PUB": { lvl: 1, display: true, parents: ["PROM"] },
  "SN1-AVCE": { lvl: 1, display: true, parents: ["SN1"] },
  "SN1-COM": { lvl: 1, display: true, parents: ["SN1"] },
  "SN1-DEBATS": { lvl: 1, display: true, parents: ["SN1"] },
  "SN1-DEPOT": { lvl: 1, display: true, parents: ["SN1"] },
  "SN1-DPTLETTRECT": { lvl: 1, display: true, parents: ["SN1"] },
  "SN1-ETI": { lvl: 1, display: true, parents: ["SN1"] },
  "SN1-PROCACC": { lvl: 1, display: true, parents: ["SN1"] },
  "SN1-RTRINI": { lvl: 1, display: true, parents: ["SN1"] },
  "SN2-COM": { lvl: 1, display: true, parents: ["SN2"] },
  "SN2-DEBATS": { lvl: 1, display: true, parents: ["SN2"] },
  "SN2-DEPOT": { lvl: 1, display: true, parents: ["SN2"] },
  "SN3-COM": { lvl: 1, display: true, parents: ["SN3"] },
  "SN3-DEBATS": { lvl: 1, display: true, parents: ["SN3"] },
  "SN3-DEPOT": { lvl: 1, display: true, parents: ["SN3"] },
  "SNNLEC-COM": { lvl: 1, display: true, parents: ["SNNLEC"] },
  "SNNLEC-DEBATS": { lvl: 1, display: true, parents: ["SNNLEC"] },
  "SNNLEC-DEPOT": { lvl: 1, display: true, parents: ["SNNLEC"] },
  "AN1-COM-AVIS": { lvl: 2, display: true, parents: ["AN1", "AN1-COM"] },
  "AN1-COM-FOND": { lvl: 2, display: true, parents: ["AN1", "AN1-COM"] },
  "AN1-DEBATS-DEC": { lvl: 2, display: true, parents: ["AN1", "AN1-DEBATS"] },
  "AN1-DEBATS-MOTION": {
    lvl: 2,
    display: true,
    parents: ["AN1", "AN1-DEBATS"],
  },
  "AN1-DEBATS-MOTION-VOTE": {
    lvl: 2,
    display: true,
    parents: ["AN1", "AN1-DEBATS", "AN1-DEBATS-MOTION"],
  },
  "AN1-DEBATS-SEANCE": {
    lvl: 2,
    display: true,
    parents: ["AN1", "AN1-DEBATS"],
  },
  "AN2-COM-AVIS": { lvl: 2, display: true, parents: ["AN2", "AN2-COM"] },
  "AN2-COM-FOND": { lvl: 2, display: true, parents: ["AN2", "AN2-COM"] },
  "AN2-DEBATS-DEC": { lvl: 2, display: true, parents: ["AN2", "AN2-DEBATS"] },
  "AN2-DEBATS-SEANCE": {
    lvl: 2,
    display: true,
    parents: ["AN2", "AN2-DEBATS"],
  },
  "AN21-DEBATS-MOTION-VOTE": {
    lvl: 2,
    display: true,
    parents: ["AN21", "AN21-DEBATS"],
  },
  "AN21-DEBATS-SEANCE": {
    lvl: 2,
    display: true,
    parents: ["AN21", "AN21-DEBATS"],
  },
  "AN3-COM-FOND": { lvl: 2, display: true, parents: ["AN3", "AN3-COM"] },
  "AN3-DEBATS-DEC": { lvl: 2, display: true, parents: ["AN3", "AN3-DEBATS"] },
  "AN3-DEBATS-SEANCE": {
    lvl: 2,
    display: true,
    parents: ["AN3", "AN3-DEBATS"],
  },
  "ANLDEF-COM-FOND": {
    lvl: 2,
    display: true,
    parents: ["ANLDEF", "ANLDEF-COM"],
  },
  "ANLDEF-DEBATS-DEC": {
    lvl: 2,
    display: true,
    parents: ["ANLDEF", "ANLDEF-DEBATS"],
  },
  "ANLDEF-DEBATS-MOTION-VOTE": {
    lvl: 2,
    display: true,
    parents: ["ANLDEF", "ANLDEF-DEBATS"],
  },
  "ANLDEF-DEBATS-SEANCE": {
    lvl: 2,
    display: true,
    parents: ["ANLDEF", "ANLDEF-DEBATS"],
  },
  "ANLUNI-COM-CAE": {
    lvl: 2,
    display: true,
    parents: ["ANLUNI", "ANLUNI-COM"],
  },
  "ANLUNI-COM-FOND": {
    lvl: 2,
    display: true,
    parents: ["ANLUNI", "ANLUNI-COM"],
  },
  "ANLUNI-DEBATS-DEC": {
    lvl: 2,
    display: true,
    parents: ["ANLUNI", "ANLUNI-DEBATS"],
  },
  "ANLUNI-DEBATS-SEANCE": {
    lvl: 2,
    display: true,
    parents: ["ANLUNI", "ANLUNI-DEBATS"],
  },
  "ANNLEC-COM-AVIS": {
    lvl: 2,
    display: true,
    parents: ["ANNLEC", "ANNLEC-COM"],
  },
  "ANNLEC-COM-FOND": {
    lvl: 2,
    display: true,
    parents: ["ANNLEC", "ANNLEC-COM"],
  },
  "ANNLEC-DEBATS-DEC": {
    lvl: 2,
    display: true,
    parents: ["ANNLEC", "ANNLEC-DEBATS"],
  },
  "ANNLEC-DEBATS-MOTION-VOTE": {
    lvl: 2,
    display: true,
    parents: ["ANNLEC", "ANNLEC-DEBATS"],
  },
  "ANNLEC-DEBATS-SEANCE": {
    lvl: 2,
    display: true,
    parents: ["ANNLEC", "ANNLEC-DEBATS"],
  },
  "CMP-COM-NOMIN": { lvl: 2, display: true, parents: ["CMP", "CMP-COM"] },
  "CMP-COM-RAPPORT-AN": { lvl: 2, display: true, parents: ["CMP", "CMP-COM"] },
  "CMP-COM-RAPPORT-SN": { lvl: 2, display: true, parents: ["CMP", "CMP-COM"] },
  "CMP-DEBATS-AN-DEC": {
    lvl: 2,
    display: true,
    parents: ["CMP", "CMP-DEBATS-AN"],
  },
  "CMP-DEBATS-AN-SEANCE": {
    lvl: 2,
    display: true,
    parents: ["CMP", "CMP-DEBATS-AN"],
  },
  "CMP-DEBATS-SN-DEC": {
    lvl: 2,
    display: true,
    parents: ["CMP", "CMP-DEBATS-SN"],
  },
  "CMP-DEBATS-SN-SEANCE": {
    lvl: 2,
    display: true,
    parents: ["CMP", "CMP-DEBATS-SN"],
  },
  "SN1-COM-AVIS": { lvl: 2, display: true, parents: ["SN1", "SN1-COM"] },
  "SN1-COM-FOND": { lvl: 2, display: true, parents: ["SN1", "SN1-COM"] },
  "SN1-DEBATS-DEC": { lvl: 2, display: true, parents: ["SN1", "SN1-DEBATS"] },
  "SN1-DEBATS-MOTION": {
    lvl: 2,
    display: true,
    parents: ["SN1", "SN1-DEBATS"],
  },
  "SN1-DEBATS-MOTION-VOTE": {
    lvl: 2,
    display: true,
    parents: ["SN1", "SN1-DEBATS", "SN1-DEBATS-MOTION"],
  },
  "SN1-DEBATS-SEANCE": {
    lvl: 2,
    display: true,
    parents: ["SN1", "SN1-DEBATS"],
  },
  "SN2-COM-AVIS": { lvl: 2, display: true, parents: ["SN2", "SN2-COM"] },
  "SN2-COM-FOND": { lvl: 2, display: true, parents: ["SN2", "SN2-COM"] },
  "SN2-DEBATS-DEC": { lvl: 2, display: true, parents: ["SN2", "SN2-DEBATS"] },
  "SN2-DEBATS-SEANCE": {
    lvl: 2,
    display: true,
    parents: ["SN2", "SN2-DEBATS"],
  },
  "SN3-COM-FOND": { lvl: 2, display: true, parents: ["SN3", "SN3-COM"] },
  "SN3-DEBATS-DEC": { lvl: 2, display: true, parents: ["SN3", "SN3-DEBATS"] },
  "SN3-DEBATS-SEANCE": {
    lvl: 2,
    display: true,
    parents: ["SN3", "SN3-DEBATS"],
  },
  "SNNLEC-COM-FOND": {
    lvl: 2,
    display: true,
    parents: ["SNNLEC", "SNNLEC-COM"],
  },
  "SNNLEC-DEBATS-DEC": {
    lvl: 2,
    display: true,
    parents: ["SNNLEC", "SNNLEC-DEBATS"],
  },
  "SNNLEC-DEBATS-SEANCE": {
    lvl: 2,
    display: true,
    parents: ["SNNLEC", "SNNLEC-DEBATS"],
  },
  "AN1-COM-AVIS-NOMIN": {
    lvl: 3,
    display: false,
    parents: ["AN1", "AN1-COM", "AN1-COM-AVIS"],
  },
  "AN1-COM-AVIS-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["AN1", "AN1-COM", "AN1-COM-AVIS"],
  },
  "AN1-COM-AVIS-REUNION": {
    lvl: 3,
    display: false,
    parents: ["AN1", "AN1-COM", "AN1-COM-AVIS"],
  },
  "AN1-COM-AVIS-SAISIE": {
    lvl: 3,
    display: false,
    parents: ["AN1", "AN1-COM", "AN1-COM-AVIS"],
  },
  "AN1-COM-FOND-NOMIN": {
    lvl: 3,
    display: false,
    parents: ["AN1", "AN1-COM", "AN1-COM-FOND"],
  },
  "AN1-COM-FOND-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["AN1", "AN1-COM", "AN1-COM-FOND"],
  },
  "AN1-COM-FOND-REUNION": {
    lvl: 3,
    display: false,
    parents: ["AN1", "AN1-COM", "AN1-COM-FOND"],
  },
  "AN1-COM-FOND-SAISIE": {
    lvl: 3,
    display: false,
    parents: ["AN1", "AN1-COM", "AN1-COM-FOND"],
  },
  "AN2-COM-AVIS-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["AN2", "AN2-COM", "AN2-COM-AVIS"],
  },
  "AN2-COM-AVIS-REUNION": {
    lvl: 3,
    display: false,
    parents: ["AN2", "AN2-COM", "AN2-COM-AVIS"],
  },
  "AN2-COM-AVIS-SAISIE": {
    lvl: 3,
    display: false,
    parents: ["AN2", "AN2-COM", "AN2-COM-AVIS"],
  },
  "AN2-COM-FOND-NOMIN": {
    lvl: 3,
    display: false,
    parents: ["AN2", "AN2-COM", "AN2-COM-FOND"],
  },
  "AN2-COM-FOND-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["AN2", "AN2-COM", "AN2-COM-FOND"],
  },
  "AN2-COM-FOND-REUNION": {
    lvl: 3,
    display: false,
    parents: ["AN2", "AN2-COM", "AN2-COM-FOND"],
  },
  "AN2-COM-FOND-SAISIE": {
    lvl: 3,
    display: false,
    parents: ["AN2", "AN2-COM", "AN2-COM-FOND"],
  },
  "AN20-COMENQ-CREA": {
    lvl: 3,
    display: false,
    parents: ["AN20", "AN20-COMENQ"],
  },
  "AN20-COMENQ-NOMIN": {
    lvl: 3,
    display: false,
    parents: ["AN20", "AN20-COMENQ"],
  },
  "AN20-COMENQ-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["AN20", "AN20-COMENQ"],
  },
  "AN20-MISINF-CREA": {
    lvl: 3,
    display: false,
    parents: ["AN20", "AN20-MISINF"],
  },
  "AN20-MISINF-NOMIN": {
    lvl: 3,
    display: false,
    parents: ["AN20", "AN20-MISINF"],
  },
  "AN20-MISINF-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["AN20", "AN20-MISINF"],
  },
  "AN3-COM-FOND-NOMIN": {
    lvl: 3,
    display: false,
    parents: ["AN3", "AN3-COM", "AN3-COM-FOND"],
  },
  "AN3-COM-FOND-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["AN3", "AN3-COM", "AN3-COM-FOND"],
  },
  "AN3-COM-FOND-REUNION": {
    lvl: 3,
    display: false,
    parents: ["AN3", "AN3-COM", "AN3-COM-FOND"],
  },
  "AN3-COM-FOND-SAISIE": {
    lvl: 3,
    display: false,
    parents: ["AN3", "AN3-COM", "AN3-COM-FOND"],
  },
  "ANLDEF-COM-FOND-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["ANLDEF", "ANLDEF-COM", "ANLDEF-COM-FOND"],
  },
  "ANLDEF-COM-FOND-REUNION": {
    lvl: 3,
    display: false,
    parents: ["ANLDEF", "ANLDEF-COM", "ANLDEF-COM-FOND"],
  },
  "ANLDEF-COM-FOND-SAISIE": {
    lvl: 3,
    display: false,
    parents: ["ANLDEF", "ANLDEF-COM", "ANLDEF-COM-FOND"],
  },
  "ANLUNI-COM-CAE-DEC": {
    lvl: 3,
    display: false,
    parents: ["ANLUNI", "ANLUNI-COM", "ANLUNI-COM-CAE"],
  },
  "ANLUNI-COM-CAE-NOMIN": {
    lvl: 3,
    display: false,
    parents: ["ANLUNI", "ANLUNI-COM", "ANLUNI-COM-CAE"],
  },
  "ANLUNI-COM-CAE-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["ANLUNI", "ANLUNI-COM", "ANLUNI-COM-CAE"],
  },
  "ANLUNI-COM-CAE-REUNION": {
    lvl: 3,
    display: false,
    parents: ["ANLUNI", "ANLUNI-COM", "ANLUNI-COM-CAE"],
  },
  "ANLUNI-COM-CAE-SAISIE": {
    lvl: 3,
    display: false,
    parents: ["ANLUNI", "ANLUNI-COM", "ANLUNI-COM-CAE"],
  },
  "ANLUNI-COM-FOND-NOMIN": {
    lvl: 3,
    display: false,
    parents: ["ANLUNI", "ANLUNI-COM", "ANLUNI-COM-FOND"],
  },
  "ANLUNI-COM-FOND-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["ANLUNI", "ANLUNI-COM", "ANLUNI-COM-FOND"],
  },
  "ANLUNI-COM-FOND-REUNION": {
    lvl: 3,
    display: false,
    parents: ["ANLUNI", "ANLUNI-COM", "ANLUNI-COM-FOND"],
  },
  "ANLUNI-COM-FOND-SAISIE": {
    lvl: 3,
    display: false,
    parents: ["ANLUNI", "ANLUNI-COM", "ANLUNI-COM-FOND"],
  },
  "ANNLEC-COM-AVIS-NOMIN": {
    lvl: 3,
    display: false,
    parents: ["ANNLEC", "ANNLEC-COM", "ANNLEC-COM-AVIS"],
  },
  "ANNLEC-COM-AVIS-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["ANNLEC", "ANNLEC-COM", "ANNLEC-COM-AVIS"],
  },
  "ANNLEC-COM-AVIS-REUNION": {
    lvl: 3,
    display: false,
    parents: ["ANNLEC", "ANNLEC-COM", "ANNLEC-COM-AVIS"],
  },
  "ANNLEC-COM-AVIS-SAISIE": {
    lvl: 3,
    display: false,
    parents: ["ANNLEC", "ANNLEC-COM", "ANNLEC-COM-AVIS"],
  },
  "ANNLEC-COM-FOND-NOMIN": {
    lvl: 3,
    display: false,
    parents: ["ANNLEC", "ANNLEC-COM", "ANNLEC-COM-FOND"],
  },
  "ANNLEC-COM-FOND-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["ANNLEC", "ANNLEC-COM", "ANNLEC-COM-FOND"],
  },
  "ANNLEC-COM-FOND-REUNION": {
    lvl: 3,
    display: false,
    parents: ["ANNLEC", "ANNLEC-COM", "ANNLEC-COM-FOND"],
  },
  "ANNLEC-COM-FOND-SAISIE": {
    lvl: 3,
    display: false,
    parents: ["ANNLEC", "ANNLEC-COM", "ANNLEC-COM-FOND"],
  },
  "SN1-COM-AVIS-NOMIN": {
    lvl: 3,
    display: false,
    parents: ["SN1", "SN1-COM", "SN1-COM-AVIS"],
  },
  "SN1-COM-AVIS-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["SN1", "SN1-COM", "SN1-COM-AVIS"],
  },
  "SN1-COM-AVIS-SAISIE": {
    lvl: 3,
    display: false,
    parents: ["SN1", "SN1-COM", "SN1-COM-AVIS"],
  },
  "SN1-COM-FOND-NOMIN": {
    lvl: 3,
    display: false,
    parents: ["SN1", "SN1-COM", "SN1-COM-FOND"],
  },
  "SN1-COM-FOND-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["SN1", "SN1-COM", "SN1-COM-FOND"],
  },
  "SN1-COM-FOND-SAISIE": {
    lvl: 3,
    display: false,
    parents: ["SN1", "SN1-COM", "SN1-COM-FOND"],
  },
  "SN2-COM-AVIS-NOMIN": {
    lvl: 3,
    display: false,
    parents: ["SN2", "SN2-COM", "SN2-COM-AVIS"],
  },
  "SN2-COM-AVIS-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["SN2", "SN2-COM", "SN2-COM-AVIS"],
  },
  "SN2-COM-AVIS-SAISIE": {
    lvl: 3,
    display: false,
    parents: ["SN2", "SN2-COM", "SN2-COM-AVIS"],
  },
  "SN2-COM-FOND-NOMIN": {
    lvl: 3,
    display: false,
    parents: ["SN2", "SN2-COM", "SN2-COM-FOND"],
  },
  "SN2-COM-FOND-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["SN2", "SN2-COM", "SN2-COM-FOND"],
  },
  "SN2-COM-FOND-SAISIE": {
    lvl: 3,
    display: false,
    parents: ["SN2", "SN2-COM", "SN2-COM-FOND"],
  },
  "SN3-COM-FOND-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["SN3", "SN3-COM", "SN3-COM-FOND"],
  },
  "SN3-COM-FOND-SAISIE": {
    lvl: 3,
    display: false,
    parents: ["SN3", "SN3-COM", "SN3-COM-FOND"],
  },
  "SNNLEC-COM-FOND-NOMIN": {
    lvl: 3,
    display: false,
    parents: ["SNNLEC", "SNNLEC-COM", "SNNLEC-COM-FOND"],
  },
  "SNNLEC-COM-FOND-RAPPORT": {
    lvl: 3,
    display: true,
    parents: ["SNNLEC", "SNNLEC-COM", "SNNLEC-COM-FOND"],
  },
  "SNNLEC-COM-FOND-SAISIE": {
    lvl: 3,
    display: false,
    parents: ["SNNLEC", "SNNLEC-COM", "SNNLEC-COM-FOND"],
  },
} as const;

export type ActsStructure = Record<
  string,
  {
    ids?: string[];
    date?: Date;
    children?: ActsStructure;
  }
>;

function addDatesHelper(
  item: {
    ids?: string[];
    date?: Date;
    children?: ActsStructure;
  },
  lookup: Record<string, ActeLegislatif>
) {
  const rep = {};

  const idsDates =
    item.ids?.map((id) => lookup[id].dateActe).filter((date) => date != null) ??
    ([] as Date[]);

  const idsMinDate =
    idsDates?.length === 0
      ? undefined
      : new Date(Math.min(...idsDates.map((d) => d.getTime())));

  if (item.children === undefined) {
    item.date = idsMinDate;
    return idsMinDate;
  }

  let childrenMinDate: Date | undefined = undefined;
  Object.keys(item.children).forEach((key) => {
    const date = addDatesHelper(item.children![key], lookup);

    childrenMinDate =
      childrenMinDate === undefined ||
      (date !== undefined && childrenMinDate.getTime() > date.getTime())
        ? date
        : childrenMinDate;
  });

  item.date = idsMinDate || childrenMinDate;
  return item.date;
}

function addDates(
  structure: ActsStructure,
  lookup: Record<string, ActLegislatif>
) {
  Object.keys(structure).forEach((key) => {
    addDatesHelper(structure[key], lookup);
  });
}

export function groupActs(acts: ActeLegislatif[]) {
  const actsStructure: ActsStructure = {};
  const actsLookup: Record<string, ActeLegislatif> = {};

  acts.forEach((act) => {
    const { codeActe, uid } = act;
    let parentPointer: ActsStructure = actsStructure;

    CONTEXT[codeActe as keyof typeof CONTEXT].parents.forEach((code) => {
      if (parentPointer[code] === undefined) {
        parentPointer[code] = { children: {} } as ActsStructure;
      }
      if (parentPointer[code].children === undefined) {
        parentPointer[code].children = {} as ActsStructure;
      }
      parentPointer = parentPointer[code].children as ActsStructure;
    });

    if (parentPointer[codeActe] === undefined) {
      parentPointer[codeActe] = { ids: [] };
    }
    parentPointer[codeActe].ids?.push(uid);
    actsLookup[uid] = act;
  });

  addDates(actsStructure, actsLookup);

  return {
    actsStructure,
    actsLookup,
  };
}
