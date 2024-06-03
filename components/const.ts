export type PartisKeys =
  | "LFI"
  | "GDR"
  | "SOC"
  | "ECO"
  | "LIOT"
  | "REN"
  | "MODEM"
  | "HOR"
  | "LR"
  | "RN"
  | "NI";

export type PartisInfo = {
  color: string;
  fullName: string;
  group?: string;
};

export const partis: Record<PartisKeys, PartisInfo> = {
  LFI: {
    color: "#CC2A46",
    fullName: "La France insoumise",
    group: "NUPES",
  },
  GDR: {
    color: "#A52727",
    fullName: "Gauche démocrate et Républicaine",
    group: "NUPES",
  },
  SOC: {
    color: "#FF9999",
    fullName: "Socialistes et apparentés",
    group: "NUPES",
  },
  ECO: {
    color: "#88CD34",
    fullName: "Ecologistes",
    group: "NUPES",
  },
  LIOT: {
    color: "#DDE727",
    fullName: "Libertés, indépendants, Outre-mer et Territoires",
  },
  REN: {
    color: "#7B5EAE",
    fullName: "Renaissance",
  },
  MODEM: {
    color: "#FDCC1B",
    fullName: "Démocrates",
  },
  HOR: {
    color: "#379DC8",
    fullName: "Horizons et apparentés",
  },
  LR: {
    color: "#4565AD",
    fullName: "Les Républicains",
  },
  RN: {
    color: "#173B4B",
    fullName: "Rassemblement National",
  },
  NI: {
    color: "#A5A5A5",
    fullName: "Députés Non Inscrit",
  },
};

export type ThemeKeys =
  | "Union européenne"
  | "fiscalité"
  | "Économie et finances"
  | "Énergie"
  | "Culture"
  | "Famille"
  | "Justice"
  | "Société"
  | "Éducation"
  | "Pouvoirs publics et Constitution"
  | "Police et sécurité"
  | "Agriculture et pêche"
  | "Environnement"
  | "Aménagement du territoire"
  | "Collectivités territoriales"
  | "Entreprises"
  | "Questions sociales et santé"
  | "PME"
  | "commerce et artisanat"
  | "Défense"
  | "Travail"
  | "Affaires étrangères et coopération"
  | "Logement et urbanisme"
  | "Traités et conventions"
  | "Budget"
  | "Transports"
  | "Outre-mer"
  | "Recherche"
  | "sciences et techniques"
  | "Sécurité sociale"
  | "Sports"
  | "Anciens combattants"
  | "Fonction publique";

export const THEMES = [
  "Union européenne",
  "fiscalité",
  "Économie et finances",
  "Énergie",
  "Culture",
  "Famille",
  "Justice",
  "Société",
  "Éducation",
  "Pouvoirs publics et Constitution",
  "Police et sécurité",
  "Agriculture et pêche",
  "Environnement",
  "Aménagement du territoire",
  "Collectivités territoriales",
  "Entreprises",
  "Questions sociales et santé",
  "PME",
  "commerce et artisanat",
  "Défense",
  "Travail",
  "Affaires étrangères et coopération",
  "Logement et urbanisme",
  "Traités et conventions",
  "Budget",
  "Transports",
  "Outre-mer",
  "Recherche",
  "sciences et techniques",
  "Sécurité sociale",
  "Sports",
  "Anciens combattants",
  "Fonction publique",
];

export const CODE_ACTS_AVEC_DEBAT = [
  "AN1-DEBATS-SEANCE",
  "AN2-DEBATS-SEANCE",
  "AN21-DEBATS-SEANCE",
  "AN3-DEBATS-SEANCE",
  "ANLDEF-DEBATS-SEANCE",
  "ANLUNI-DEBATS-SEANCE",
  "ANNLEC-DEBATS-SEANCE",
  "CMP-DEBATS-AN-SEANCE",
  "CMP-DEBATS-SN-SEANCE",
];

export const WORDS_PER_MINUTES = 200;
