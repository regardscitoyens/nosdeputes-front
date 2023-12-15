import knex from "knex";
import config from "./knexfile";

const db = knex(config.development);

export async function listTables() {
  try {
    const result = await db.raw(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public'"
    );
    return result.rows.map((row: any) => row.table_name).sort();
  } catch (error) {
    console.error("Error listing tables:", error);
    throw error;
  }
}

export interface DossierRow {
  uid: string;
  xsiType: string;
  legislature: string;
  senatChemin: string;
  titre: string;
  titreChemin: string;
  theme: string | null;
  codeProcedure: string;
  libelleProcedure: string;
  causeFusionDossier: string | null;
  dossierAbsorbantRefUid: string | null;
  organeRefUid: string | null;
}

export interface ActLegislatif {
  uid: string;
  codeActe: string;
  nomCanonique: string;
  libelleCourtActe: string;
  xsiType: string;
  dateActe: Date | null;
  organeRefUid: string;
  organeProvenanceRefUid: string | null;
  famCodeStatutConclusion: string | null;
  libelleStatutConclusion: string | null;
  famCodeCasSaisine: string | null;
  libelleCasSaisine: string | null;
  anneeDecisionConseilConstitutionnel: string | null;
  urlConclusionConseilConstitutionnel: string | null;
  motifConseilConstitutionnel: string | null;
  numDecisionConseilConstitutionnel: string | null;
  auteurMotionRefUid: string | null;
  famCodeTypeMotion: string | null;
  libelleTypeMotion: string | null;
  famCodeTypeMotionCensure: string | null;
  libelleTypeMotionCensure: string | null;
  famCodeDecision: string | null;
  libelleDecision: string | null;
  formuleDecision: string | null;
  codeLoiRefUid: string | null;
  dateJo: string | null;
  numJo: string | null;
  referenceNor: string | null;
  typeJo: string | null;
  urlLegifrance: string | null;
  titreLoi: string | null;
  urlEcheancierLoi: string | null;
  dateFermetureContributionInternaute: string | null;
  dateOuvertureContributionInternaute: string | null;
  dateJoce: string | null;
  refJoce: string | null;
  titreTexteEuropeen: string | null;
  typeTexteEuropeen: string | null;
  odjRefUid: string | null;
  reunionRefUid: string | null;
  famCodeStatutAdoption: string | null;
  libelleStatutAdoption: string | null;
  texteAdopteRefUid: string | null;
  texteAssocieRefUid: string;
  famCodeStatutTypeDeclaration: string | null;
  libelleStatutTypeDeclaration: string | null;
  dossierRefUid: string;
}

export async function getDossiers(
  { legislature = 16 },
  limit = 10
): Promise<DossierRow[]> {
  try {
    const rows = await db
      .select("*")
      .from("Dossier")
      .where("legislature", "=", legislature)
      .limit(limit);

    return rows;
  } catch (error) {
    console.error("Error fetching rows from Dossier:", error);
    throw error;
  }
}
export async function getDossier(
  legislature: string,
  id: string
): Promise<{ dossier: DossierRow; acts: ActLegislatif[] } | undefined> {
  try {
    const dossiers = await db
      .select("*")
      .from("Dossier")
      .where("legislature", "=", legislature)
      .where("uid", "=", id);

    const dossier = dossiers[0];
    if (dossier === undefined) {
      return undefined;
    }

    const acts = await db
      .select("*")
      .from("ActeLegislatif")
      .where("dossierRefUid", "=", dossier.uid);

    return { dossier, acts };
  } catch (error) {
    console.error("Error fetching rows from Dossier:", error);
    throw error;
  }
}

export async function getTable(
  table: string,
  limit = 10
): Promise<DossierRow[]> {
  try {
    const rows = await db
      .select("*")
      .from(table || "Dossier")
      .limit(limit);
    return rows;
  } catch (error) {
    console.error("Error fetching rows from Dossier:", error);
    throw error;
  }
}
