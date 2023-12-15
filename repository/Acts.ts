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

export type ActeLegislatif =
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
  "AN-APPLI": { lvl: 0, display: true },
  AN1: { lvl: 0, display: true },
  AN2: { lvl: 0, display: true },
  AN20: { lvl: 0, display: true },
  AN21: { lvl: 0, display: true },
  AN3: { lvl: 0, display: true },
  ANLDEF: { lvl: 0, display: true },
  ANLUNI: { lvl: 0, display: true },
  ANNLEC: { lvl: 0, display: true },
  CC: { lvl: 0, display: true },
  CMP: { lvl: 0, display: true },
  EU: { lvl: 0, display: true },
  PROM: { lvl: 0, display: true },
  SN1: { lvl: 0, display: true },
  SN2: { lvl: 0, display: true },
  SN3: { lvl: 0, display: true },
  SNNLEC: { lvl: 0, display: true },
  "AN-APPLI-RAPPORT": { lvl: 1, display: "?" },
  "AN1-ACIN": { lvl: 1, display: true },
  "AN1-AVCE": { lvl: 1, display: true },
  "AN1-COM": { lvl: 1, display: true },
  "AN1-DEBATS": { lvl: 1, display: true },
  "AN1-DEPOT": { lvl: 1, display: true },
  "AN1-DGVT": { lvl: 1, display: true },
  "AN1-DPTLETTRECT": { lvl: 1, display: true },
  "AN1-ETI": { lvl: 1, display: true },
  "AN1-MOTION": { lvl: 1, display: true },
  "AN1-PROCACC": { lvl: 1, display: true },
  "AN1-RECBUREAU": { lvl: 1, display: true },
  "AN1-RTRINI": { lvl: 1, display: true },
  "AN2-COM": { lvl: 1, display: true },
  "AN2-DEBATS": { lvl: 1, display: true },
  "AN2-DEPOT": { lvl: 1, display: true },
  "AN20-COMENQ": { lvl: 1, display: true },
  "AN20-MISINF": { lvl: 1, display: true },
  "AN20-RAPPORT": { lvl: 1, display: true },
  "AN21-APAN": { lvl: 1, display: true },
  "AN21-DEBATS": { lvl: 1, display: true },
  "AN21-DGVT": { lvl: 1, display: true },
  "AN21-MOTION": { lvl: 1, display: true },
  "AN21-MPR": { lvl: 1, display: true },
  "AN3-COM": { lvl: 1, display: true },
  "AN3-DEBATS": { lvl: 1, display: true },
  "AN3-DEPOT": { lvl: 1, display: true },
  "ANLDEF-COM": { lvl: 1, display: true },
  "ANLDEF-DEBATS": { lvl: 1, display: true },
  "ANLDEF-DEPOT": { lvl: 1, display: true },
  "ANLDEF-DGVT": { lvl: 1, display: true },
  "ANLDEF-MOTION": { lvl: 1, display: true },
  "ANLUNI-COM": { lvl: 1, display: true },
  "ANLUNI-DEBATS": { lvl: 1, display: true },
  "ANLUNI-DEPOT": { lvl: 1, display: true },
  "ANLUNI-RTRINI": { lvl: 1, display: true },
  "ANNLEC-COM": { lvl: 1, display: true },
  "ANNLEC-DEBATS": { lvl: 1, display: true },
  "ANNLEC-DEPOT": { lvl: 1, display: true },
  "ANNLEC-DGVT": { lvl: 1, display: true },
  "ANNLEC-MOTION": { lvl: 1, display: true },
  "CC-CONCLUSION": { lvl: 1, display: true },
  "CC-SAISIE-AN": { lvl: 1, display: true },
  "CC-SAISIE-DROIT": { lvl: 1, display: true },
  "CC-SAISIE-PAN": { lvl: 1, display: true },
  "CC-SAISIE-PM": { lvl: 1, display: true },
  "CC-SAISIE-PR": { lvl: 1, display: true },
  "CC-SAISIE-PSN": { lvl: 1, display: true },
  "CC-SAISIE-SN": { lvl: 1, display: true },
  "CMP-COM": { lvl: 1, display: true },
  "CMP-DEBATS-AN": { lvl: 1, display: true },
  "CMP-DEBATS-SN": { lvl: 1, display: true },
  "CMP-DEC": { lvl: 1, display: true },
  "CMP-DEPOT": { lvl: 1, display: true },
  "CMP-DGVT": { lvl: 1, display: true },
  "CMP-MOTION": { lvl: 1, display: true },
  "CMP-SAISIE": { lvl: 1, display: true },
  "EU-DEC": { lvl: 1, display: true },
  "PROM-PUB": { lvl: 1, display: true },
  "SN1-AVCE": { lvl: 1, display: true },
  "SN1-COM": { lvl: 1, display: true },
  "SN1-DEBATS": { lvl: 1, display: true },
  "SN1-DEPOT": { lvl: 1, display: true },
  "SN1-DPTLETTRECT": { lvl: 1, display: true },
  "SN1-ETI": { lvl: 1, display: true },
  "SN1-PROCACC": { lvl: 1, display: true },
  "SN1-RTRINI": { lvl: 1, display: true },
  "SN2-COM": { lvl: 1, display: true },
  "SN2-DEBATS": { lvl: 1, display: true },
  "SN2-DEPOT": { lvl: 1, display: true },
  "SN3-COM": { lvl: 1, display: true },
  "SN3-DEBATS": { lvl: 1, display: true },
  "SN3-DEPOT": { lvl: 1, display: true },
  "SNNLEC-COM": { lvl: 1, display: true },
  "SNNLEC-DEBATS": { lvl: 1, display: true },
  "SNNLEC-DEPOT": { lvl: 1, display: true },
  "AN1-COM-AVIS": { lvl: 2, display: true },
  "AN1-COM-FOND": { lvl: 2, display: true },
  "AN1-DEBATS-DEC": { lvl: 2, display: true },
  "AN1-DEBATS-MOTION": { lvl: 2, display: true },
  "AN1-DEBATS-MOTION-VOTE": { lvl: 2, display: true },
  "AN1-DEBATS-SEANCE": { lvl: 2, display: true },
  "AN2-COM-AVIS": { lvl: 2, display: true },
  "AN2-COM-FOND": { lvl: 2, display: true },
  "AN2-DEBATS-DEC": { lvl: 2, display: true },
  "AN2-DEBATS-SEANCE": { lvl: 2, display: true },
  "AN21-DEBATS-MOTION-VOTE": { lvl: 2, display: true },
  "AN21-DEBATS-SEANCE": { lvl: 2, display: true },
  "AN3-COM-FOND": { lvl: 2, display: true },
  "AN3-DEBATS-DEC": { lvl: 2, display: true },
  "AN3-DEBATS-SEANCE": { lvl: 2, display: true },
  "ANLDEF-COM-FOND": { lvl: 2, display: true },
  "ANLDEF-DEBATS-DEC": { lvl: 2, display: true },
  "ANLDEF-DEBATS-MOTION-VOTE": { lvl: 2, display: true },
  "ANLDEF-DEBATS-SEANCE": { lvl: 2, display: true },
  "ANLUNI-COM-CAE": { lvl: 2, display: true },
  "ANLUNI-COM-FOND": { lvl: 2, display: true },
  "ANLUNI-DEBATS-DEC": { lvl: 2, display: true },
  "ANLUNI-DEBATS-SEANCE": { lvl: 2, display: true },
  "ANNLEC-COM-AVIS": { lvl: 2, display: true },
  "ANNLEC-COM-FOND": { lvl: 2, display: true },
  "ANNLEC-DEBATS-DEC": { lvl: 2, display: true },
  "ANNLEC-DEBATS-MOTION-VOTE": { lvl: 2, display: true },
  "ANNLEC-DEBATS-SEANCE": { lvl: 2, display: true },
  "CMP-COM-NOMIN": { lvl: 2, display: true },
  "CMP-COM-RAPPORT-AN": { lvl: 2, display: true },
  "CMP-COM-RAPPORT-SN": { lvl: 2, display: true },
  "CMP-DEBATS-AN-DEC": { lvl: 2, display: true },
  "CMP-DEBATS-AN-SEANCE": { lvl: 2, display: true },
  "CMP-DEBATS-SN-DEC": { lvl: 2, display: true },
  "CMP-DEBATS-SN-SEANCE": { lvl: 2, display: true },
  "SN1-COM-AVIS": { lvl: 2, display: true },
  "SN1-COM-FOND": { lvl: 2, display: true },
  "SN1-DEBATS-DEC": { lvl: 2, display: true },
  "SN1-DEBATS-MOTION": { lvl: 2, display: true },
  "SN1-DEBATS-MOTION-VOTE": { lvl: 2, display: true },
  "SN1-DEBATS-SEANCE": { lvl: 2, display: true },
  "SN2-COM-AVIS": { lvl: 2, display: true },
  "SN2-COM-FOND": { lvl: 2, display: true },
  "SN2-DEBATS-DEC": { lvl: 2, display: true },
  "SN2-DEBATS-SEANCE": { lvl: 2, display: true },
  "SN3-COM-FOND": { lvl: 2, display: true },
  "SN3-DEBATS-DEC": { lvl: 2, display: true },
  "SN3-DEBATS-SEANCE": { lvl: 2, display: true },
  "SNNLEC-COM-FOND": { lvl: 2, display: true },
  "SNNLEC-DEBATS-DEC": { lvl: 2, display: true },
  "SNNLEC-DEBATS-SEANCE": { lvl: 2, display: true },
  "AN1-COM-AVIS-NOMIN": { lvl: 3, display: false },
  "AN1-COM-AVIS-RAPPORT": { lvl: 3, display: true },
  "AN1-COM-AVIS-REUNION": { lvl: 3, display: false },
  "AN1-COM-AVIS-SAISIE": { lvl: 3, display: false },
  "AN1-COM-FOND-NOMIN": { lvl: 3, display: false },
  "AN1-COM-FOND-RAPPORT": { lvl: 3, display: true },
  "AN1-COM-FOND-REUNION": { lvl: 3, display: false },
  "AN1-COM-FOND-SAISIE": { lvl: 3, display: false },
  "AN2-COM-AVIS-RAPPORT": { lvl: 3, display: true },
  "AN2-COM-AVIS-REUNION": { lvl: 3, display: false },
  "AN2-COM-AVIS-SAISIE": { lvl: 3, display: false },
  "AN2-COM-FOND-NOMIN": { lvl: 3, display: false },
  "AN2-COM-FOND-RAPPORT": { lvl: 3, display: true },
  "AN2-COM-FOND-REUNION": { lvl: 3, display: false },
  "AN2-COM-FOND-SAISIE": { lvl: 3, display: false },
  "AN20-COMENQ-CREA": { lvl: 3, display: false },
  "AN20-COMENQ-NOMIN": { lvl: 3, display: false },
  "AN20-COMENQ-RAPPORT": { lvl: 3, display: true },
  "AN20-MISINF-CREA": { lvl: 3, display: false },
  "AN20-MISINF-NOMIN": { lvl: 3, display: false },
  "AN20-MISINF-RAPPORT": { lvl: 3, display: true },
  "AN3-COM-FOND-NOMIN": { lvl: 3, display: false },
  "AN3-COM-FOND-RAPPORT": { lvl: 3, display: true },
  "AN3-COM-FOND-REUNION": { lvl: 3, display: false },
  "AN3-COM-FOND-SAISIE": { lvl: 3, display: false },
  "ANLDEF-COM-FOND-RAPPORT": { lvl: 3, display: true },
  "ANLDEF-COM-FOND-REUNION": { lvl: 3, display: false },
  "ANLDEF-COM-FOND-SAISIE": { lvl: 3, display: false },
  "ANLUNI-COM-CAE-DEC": { lvl: 3, display: false },
  "ANLUNI-COM-CAE-NOMIN": { lvl: 3, display: false },
  "ANLUNI-COM-CAE-RAPPORT": { lvl: 3, display: true },
  "ANLUNI-COM-CAE-REUNION": { lvl: 3, display: false },
  "ANLUNI-COM-CAE-SAISIE": { lvl: 3, display: false },
  "ANLUNI-COM-FOND-NOMIN": { lvl: 3, display: false },
  "ANLUNI-COM-FOND-RAPPORT": { lvl: 3, display: true },
  "ANLUNI-COM-FOND-REUNION": { lvl: 3, display: false },
  "ANLUNI-COM-FOND-SAISIE": { lvl: 3, display: false },
  "ANNLEC-COM-AVIS-NOMIN": { lvl: 3, display: false },
  "ANNLEC-COM-AVIS-RAPPORT": { lvl: 3, display: true },
  "ANNLEC-COM-AVIS-REUNION": { lvl: 3, display: false },
  "ANNLEC-COM-AVIS-SAISIE": { lvl: 3, display: false },
  "ANNLEC-COM-FOND-NOMIN": { lvl: 3, display: false },
  "ANNLEC-COM-FOND-RAPPORT": { lvl: 3, display: true },
  "ANNLEC-COM-FOND-REUNION": { lvl: 3, display: false },
  "ANNLEC-COM-FOND-SAISIE": { lvl: 3, display: false },
  "SN1-COM-AVIS-NOMIN": { lvl: 3, display: false },
  "SN1-COM-AVIS-RAPPORT": { lvl: 3, display: true },
  "SN1-COM-AVIS-SAISIE": { lvl: 3, display: false },
  "SN1-COM-FOND-NOMIN": { lvl: 3, display: false },
  "SN1-COM-FOND-RAPPORT": { lvl: 3, display: true },
  "SN1-COM-FOND-SAISIE": { lvl: 3, display: false },
  "SN2-COM-AVIS-NOMIN": { lvl: 3, display: false },
  "SN2-COM-AVIS-RAPPORT": { lvl: 3, display: true },
  "SN2-COM-AVIS-SAISIE": { lvl: 3, display: false },
  "SN2-COM-FOND-NOMIN": { lvl: 3, display: false },
  "SN2-COM-FOND-RAPPORT": { lvl: 3, display: true },
  "SN2-COM-FOND-SAISIE": { lvl: 3, display: false },
  "SN3-COM-FOND-RAPPORT": { lvl: 3, display: true },
  "SN3-COM-FOND-SAISIE": { lvl: 3, display: false },
  "SNNLEC-COM-FOND-NOMIN": { lvl: 3, display: false },
  "SNNLEC-COM-FOND-RAPPORT": { lvl: 3, display: true },
  "SNNLEC-COM-FOND-SAISIE": { lvl: 3, display: false },
} as const;
