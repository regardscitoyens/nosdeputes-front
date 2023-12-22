import knex from "knex";
import config from "./knexfile";
import { AN1_COM_FOND, AN1_COM_FOND_NOMIN } from "./Acts";
import { Dossier, ActeLegislatif, Organe, Acteur } from "./types";

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

export async function getDossiers(
  { legislature = 16 },
  limit = 10
): Promise<Dossier[]> {
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

export type DossierData = {
  dossier: Dossier;
  /**
   * uid de la commission saisie sur le fond.
   * Données à ércupérer dans organes.
   */
  commissionFondId?: string;
  /**
   * uid de la commission saisie pour avis.
   * Données à ércupérer dans organes.
   */
  commissionAvisId?: string;
  /**
   * liste des uid des rapporteurs de la commission saisie sur le fond.
   * Données à ércupérer dans acteurs.
   */
  rapporteursFondIds?: string[];
  acts: ActeLegislatif[];
  documents: Record<string, Document>;
  organes: Record<string, Organe>;
  acteurs: Record<string, Acteur>;
};

export async function getDossier(
  legislature: string,
  id: string
): Promise<DossierData | undefined> {
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
    const organesIds = new Set<string>();
    // const reunionIds = new Set<string>();
    // const auteurIds = new Set<string>();
    // const odjIds = new Set<string>();
    acts.forEach((act) => {
      const {
        texteAssocieRefUid,
        texteAdopteRefUid,
        // organeProvenanceRefUid,
        organeRefUid,
        // reunionRefUid,
        // auteurMotionRefUid,
        // odjRefUid,
      } = act;
      if (texteAssocieRefUid) documentsIds.add(texteAssocieRefUid);
      if (texteAdopteRefUid) documentsIds.add(texteAdopteRefUid);
      // if (organeProvenanceRefUid) organesIds.add(organeProvenanceRefUid);
      if (organeRefUid) organesIds.add(organeRefUid);
      // if (reunionRefUid) reunionIds.add(reunionRefUid);
      // if (auteurMotionRefUid) auteurIds.add(auteurMotionRefUid);
      // if (odjRefUid) odjIds.add(odjRefUid);
    });

    const commissionFondId = acts.filter(
      (act): act is AN1_COM_FOND => act.codeActe === "AN1-COM-FOND"
    )[0]?.organeRefUid;
    const commissionAvisId = acts.filter(
      (act): act is any => act.codeActe === "AN1-COM-AVIS" // Type is not defined because I did not get any of those event in the 1000 rows fetched
    )[0]?.organeRefUid;

    // A utiliser pour trouver les rapporteurs dans la table Rapporteur (a par)
    const nominationRapporteursCommissionFondId = acts.filter(
      (act): act is AN1_COM_FOND_NOMIN => act.codeActe === "AN1-COM-FOND-NOMIN"
    )[0]?.uid;

    const nominationRapporteursCommissionFond: any[] =
      nominationRapporteursCommissionFondId
        ? await db
            .select("*")
            .from("Rapporteur")
            .where(
              "acteLegislatifRefUid",
              "=",
              nominationRapporteursCommissionFondId
            )
        : [];

    const rapporteursFondIds = nominationRapporteursCommissionFond.map(
      (r) => r.acteurRefUid
    );

    const documentsData = await db
      .select("*")
      .from("Document")
      .whereIn("uid", Array.from(documentsIds));

    const documents: Record<string, Document> = {};
    documentsData.forEach((doc) => {
      documents[doc.uid] = doc;
    });

    const organesData = await db
      .select("*")
      .from("Organe")
      .whereIn("uid", Array.from(organesIds));

    const organes: Record<string, Organe> = {};
    organesData.forEach((doc) => {
      organes[doc.uid] = doc;
    });

    const acteursData = await db
      .select("*")
      .from("Document")
      .whereIn("uid", Array.from(rapporteursFondIds));

    const acteurs: Record<string, Acteur> = {};
    acteursData.forEach((doc) => {
      acteurs[doc.uid] = doc;
    });

    return {
      dossier,
      commissionFondId,
      commissionAvisId,
      rapporteursFondIds,
      acts,
      documents,
      organes,
      acteurs,
    };
  } catch (error) {
    console.error("Error fetching rows from Dossier:", error);
    throw error;
  }
}

export async function getTable(table: string, limit = 10): Promise<Dossier[]> {
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
