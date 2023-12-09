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
  | "Environement"
  | "Transport"
  | "Défense"
  | "Agriculture"
  | "Economie";

export const THEMES: ThemeKeys[] = [
  "Environement",
  "Transport",
  "Défense",
  "Agriculture",
  "Economie",
];
