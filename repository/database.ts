import knex from "knex";
import config from "./knexfile";
import { AN1_COM_FOND, AN1_COM_FOND_NOMIN } from "./Acts";
import {
  Dossier,
  ActeLegislatif,
  Organe,
  Acteur,
  Document as DocumentData,
  Amendement,
} from "./types";

/**
 * So Nextjs does not create too many db connections.
 *  https://dev.to/noclat/fixing-too-many-connections-errors-with-database-clients-stacking-in-dev-mode-with-next-js-3kpm
 */
function registerService<T>(name: string, initFn: () => T): T {
  if (process.env.NODE_ENV === "development") {
    if (!(name in global)) {
      (global as any)[name] = initFn();
    }
    return (global as any)[name];
  }
  return initFn();
}

const db = registerService("database", () => knex(config.development));

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
   * Données à récupérer dans acteurs.
   */
  rapporteursFondIds?: string[];
  /**
   * list des uid des co signataires des documents.
   * Données à récupérer dans acteurs.
   */
  coSignatairesIds?: string[];
  /**
   * Map les document id avec leur nombre d'amendement.
   */
  amendementCount: Record<string, number>;
  amendements: Amendement[];
  acts: ActeLegislatif[];
  documents: Record<string, DocumentData>;
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

    const documents: Record<string, DocumentData> = {};
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

    const coSignatairesIds = (
      await db
        .select("acteurRefUid")
        .from("CoSignataireDocument")
        .whereIn("documentRefUid", Array.from(documentsIds))
    ).map((item) => item.acteurRefUid);

    const acteursData = await db
      .select("*")
      .from("Acteur")
      .whereIn("uid", [...rapporteursFondIds, ...coSignatairesIds]);

    const acteurs: Record<string, Acteur> = {};
    acteursData.forEach((acteur) => {
      acteurs[acteur.uid] = acteur;
    });

    const amendementCountData = await db
      .select("texteLegislatifRefUid", db.raw("COUNT(uid)"))
      .from("Amendement")
      .groupBy("texteLegislatifRefUid")
      .whereIn("texteLegislatifRefUid", Array.from(documentsIds));

    const amendementCount: Record<string, number> = {};
    amendementCountData.forEach(({ texteLegislatifRefUid, count }) => {
      amendementCount[texteLegislatifRefUid] = count;
    });

    const amendements = await db
      .select("*")
      .from("Amendement")
      .whereIn("texteLegislatifRefUid", Array.from(documentsIds));

    return {
      dossier,
      commissionFondId,
      commissionAvisId,
      rapporteursFondIds,
      coSignatairesIds,
      acts,
      documents,
      organes,
      acteurs,
      amendementCount,
      amendements,
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
