import knex from "knex";
import config from "./knexfile";
import { ActeLegislatif } from "./Acts";

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

export type Document = {
  titrePrincipal: string;
  titrePrincipalCourt: string;
  uid: string;
  classeCode: string;
  classeLibelle: string;
  texteDeLoi: boolean;
  depotCode: string;
  depotLibelle: string;
  especeCode: string;
  especeLibelle: string;
  sousTypeCode: string;
  sousTypeLibelle: string;
  sousTypeLibelleEdition: string;
  statutAdoption: null | string;
  niveauCorrection: null | string;
  typeCorrection: null | string;
  dateCreation: Date;
  dateDepot: Date;
  datePublication: Date;
  datePublicationWeb: Date;
  denominationStructurelle: string;
  amendable: null | string;
  dian: null | string;
  isbn: null | string;
  nbPage: null | string;
  prix: null | string;
  legislature: string;
  adoptionConforme: boolean;
  formule: string;
  numNotice: string;
  provenance: string;
  xsiType: string;
  auteurUid: string;
  documentParentRefUid: null;
};

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
): Promise<
  | {
      dossier: DossierRow;
      acts: ActeLegislatif[];
      documents: Record<string, Document>;
    }
  | undefined
> {
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

    const documentsIds = new Set<string>();
    // const organesIds = new Set<string>();
    // const reunionIds = new Set<string>();
    // const auteurIds = new Set<string>();
    // const odjIds = new Set<string>();
    acts.forEach((act) => {
      const {
        texteAssocieRefUid,
        texteAdopteRefUid,
        // organeProvenanceRefUid,
        // organeRefUid,
        // reunionRefUid,
        // auteurMotionRefUid,
        // odjRefUid,
      } = act;
      if (texteAssocieRefUid) documentsIds.add(texteAssocieRefUid);
      if (texteAdopteRefUid) documentsIds.add(texteAdopteRefUid);
      // if (organeProvenanceRefUid) organesIds.add(organeProvenanceRefUid);
      // if (organeRefUid) organesIds.add(organeRefUid);
      // if (reunionRefUid) reunionIds.add(reunionRefUid);
      // if (auteurMotionRefUid) auteurIds.add(auteurMotionRefUid);
      // if (odjRefUid) odjIds.add(odjRefUid);
    });

    const documentsData = await db
      .select("*")
      .from("Document")
      .whereIn("uid", Array.from(documentsIds));

    const documents: Record<string, Document> = {};
    documentsData.forEach((doc) => {
      documents[doc.uid] = doc;
    });

    return { dossier, acts, documents };
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
