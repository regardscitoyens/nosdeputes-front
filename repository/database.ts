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

interface DossierRow {
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

export async function getDossiers(
  legislature = 16,
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
): Promise<DossierRow | undefined> {
  try {
    const rows = await db
      .select("*")
      .from("Dossier")
      .where("legislature", "=", legislature)
      .where("uid", "=", id);

    return rows[0];
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
    const rows = await db.select("*").from(table).limit(limit);
    return rows;
  } catch (error) {
    console.error("Error fetching rows from Dossier:", error);
    throw error;
  }
}
