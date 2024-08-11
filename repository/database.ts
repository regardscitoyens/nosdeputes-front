import * as React from "react";
import knex from "knex";
import config from "./knexfile";
import {
  Dossier,
  ActeLegislatif,
  Organe,
  Acteur,
  Document as DocumentData,
  Amendement,
  Vote,
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

export async function listTablesUnCached() {
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

export type DossierAmendementsData = {
  dossier: Dossier;
  documents: Record<string, DocumentData>;
  amendements: Amendement[];
};

export async function getDossierAmendementsUnCached(
  legislature: string,
  dossierId: string
): Promise<(Amendement & Pick<Acteur, "nom" | "prenom">)[] | undefined> {
  try {
    const dossiers = await db
      .select("*")
      .from("Dossier")
      .where("legislature", "=", legislature)
      .where("uid", "=", dossierId);

    const dossier = dossiers[0];
    if (dossier === undefined) {
      return undefined;
    }

    const acts = await db
      .select("*")
      .from("ActeLegislatif")
      .where("dossierRefUid", "=", dossier.uid);

    const documentsIds = new Set<string>();
    acts.forEach((act) => {
      const { texteAssocieRefUid, texteAdopteRefUid } = act;
      if (texteAssocieRefUid) documentsIds.add(texteAssocieRefUid);
      if (texteAdopteRefUid) documentsIds.add(texteAdopteRefUid);
    });

    const documentsData = await db
      .select("*")
      .from("Document")
      .whereIn("uid", Array.from(documentsIds));

    const documents: Record<string, DocumentData> = {};
    documentsData.forEach((doc) => {
      documents[doc.uid] = doc;
    });

    const amendements = await db
      .select("*")
      .from("Amendement")
      .whereIn("texteLegislatifRefUid", Array.from(documentsIds))
      .leftJoin(
        function () {
          this.select([
            "uid as acteur_uid",
            "slug as acteur_slug",
            "prenom",
            "nom",
            "groupeParlementaireUid",
          ])
            .from("Acteur")
            .as("acteur");
        },
        "Amendement.acteurRefUid",
        "acteur.acteur_uid"
      )
      .leftJoin(
        function () {
          this.select([
            "uid as organe_uid",
            "codeType",
            "libelle as group_libelle",
            "libelleAbrege as group_libelle_short",
            "couleurAssociee as group_color",
          ])
            .from("Organe")
            .as("organe");
        },
        "acteur.groupeParlementaireUid",
        "organe.organe_uid"
      );

    return amendements;
  } catch (error) {
    console.error("Error fetching rows from Dossier:", error);
    throw error;
  }
}

export async function getDossierVotesUnCached(
  legislature: string,
  dossierId: string
): Promise<{ votes: Vote[]; acts: ActeLegislatif[] } | undefined> {
  try {
    const dossiers = await db
      .select("*")
      .from("Dossier")
      .where("legislature", "=", legislature)
      .where("uid", "=", dossierId);

    const dossier = dossiers[0];
    if (dossier === undefined) {
      return undefined;
    }

    const acts = await db
      .select("*")
      .from("ActeLegislatif")
      .where("dossierRefUid", "=", dossier.uid);

    const actsIds = acts.map((act) => act.uid);

    const votes = await db
      .select("*")
      .from("VoteActeLegislatif")
      .whereIn("acteLegislatifRefUid", actsIds)
      .rightJoin("Vote", "VoteActeLegislatif.voteRefUid", "Vote.scrutinRefUid")
      .leftJoin(
        function () {
          this.select([
            "uid as acteur_uid",
            "prenom",
            "nom",
            "slug as depute_slug",
          ])
            .from("Acteur")
            .as("acteur");
        },
        "Vote.acteurRefUid",
        "acteur.acteur_uid"
      )
      .leftJoin(
        function () {
          this.select([
            "id as group_id",
            "organeRefUid",
            "positionMajoritaire as group_position",
            "hash",
          ])
            .from("GroupeVotant")
            .as("groupeVotant");
        },
        "Vote.groupeVotantRefId",
        "groupeVotant.hash"
      )
      .leftJoin(
        function () {
          this.select([
            "uid as organe_uid",
            "codeType",
            "libelle as group_libelle",
            "libelleAbrege as group_libelle_short",
            "couleurAssociee as group_color",
          ])
            .from("Organe")
            .as("organe");
        },
        "groupeVotant.organeRefUid",
        "organe.organe_uid"
      );
    return { votes, acts };
  } catch (error) {
    console.error("Error fetching rows from Dossier:", error);
    throw error;
  }
}

export async function getDeputeDocumentsUnCached(slug: string) {
  try {
    const depute = await db
      .select("uid", "prenom", "nom")
      .from("Acteur")
      .where("slug", "=", slug);
    if (!depute) {
      return {};
    }

    const documents = await db
      .select("*")
      .from("Auteur")
      // .where("qualite", "=", "auteur")
      .where("acteurRefUid", "=", depute[0].uid)
      .leftJoin("Document", "Document.uid", "Auteur.documentRefUid");

    /**
     * Je pensais que ca donnerait des textes legislatifs. Mais la pluspart des acteur de InitiateurActeLegislatif c'est Elisabeth Borne
     */
    // const actes = await db
    //   .select("*")
    //   .from("InitiateurActeLegislatif")
    //   .leftJoin(
    //     // I don't know why this has to be a right join to work
    //     function () {
    //       this.select(["uid as acteur_uid", "prenom", "nom", "slug as depute_slug"])
    //         .from("Acteur")
    //         .as("acteur");
    //     },
    //     "InitiateurActeLegislatif.acteurRefUid",
    //     "acteur.acteur_uid"
    //   )
    // .where("acteurRefUid", "=", depute[0].uid);
    // .leftJoin(
    //   "ActeLegislatif",
    //   "ActeLegislatif.uid",
    //   "InitiateurActeLegislatif.acteLegislatifRefUid"
    // )
    // .rightJoin(
    //   // I don't know why this has to be a right join to work
    //   function () {
    //     this.select(["texteAssocieRefUid", "acteLegislatifRefUid"])
    //       .from("TexteAssocie")
    //       .as("texteAssocie");
    //   },
    //   "texteAssocie.acteLegislatifRefUid",
    //   "ActeLegislatif.uid"
    // )
    // .leftJoin(
    //   // I don't know why this has to be a right join to work
    //   function () {
    //     this.select(["uid as docu_uid", "titrePrincipalCourt"])
    //       .from("Document")
    //       .as("docu");
    //   },
    //   "texteAssocie.texteAssocieRefUid",
    //   "docu.docu_uid"
    // );

    return {
      depute: depute[0],
      documents,
      // actes,
    };
  } catch (error) {
    console.error(`Error fetching amendement from depute ${slug}:`, error);
    throw error;
  }
}

export async function getDeputesUnCached(legislature: string) {
  try {
    const deputes = await db
      .select("*")
      .from("Mandat")
      .where("legislature", "=", legislature)
      .where("typeOrgane", "=", "ASSEMBLEE")
      .leftJoin("Acteur", "Mandat.acteurRefUid", "Acteur.uid")
      .leftJoin(
        function () {
          this.select([
            "uid as organe_uid",
            "codeType",
            "libelle as group_libelle",
            "libelleAbrege as group_libelle_short",
            "couleurAssociee as group_color",
          ])
            .from("Organe")
            .as("organe");
        },
        "Acteur.groupeParlementaireUid",
        "organe.organe_uid"
      );

    const lastStartDate = new Map();

    deputes.forEach(({ dateDebut, slug }) => {
      const savedDate = lastStartDate.get(slug);
      if (!savedDate || savedDate < dateDebut) {
        lastStartDate.set(slug, dateDebut);
      }
    });

    // Have fun, certains deputes ont plusieurs mandat dans une même legislature.
    // Par exemple si ils sont élu, que le vote et annullé par le conseil consti, et qu'il gagnent à nouveau par la suite (#Bertrand Petit)
    return deputes.filter(
      ({ dateDebut, slug }) => lastStartDate.get(slug) === dateDebut
    );
  } catch (error) {
    console.error(
      `Error fetching deputes from legislature ${legislature}:`,
      error
    );
    throw error;
  }
}

export async function getParagraphsUnCached(
  compteRendus: string[]
): Promise<any[]> {
  try {
    const rows = await db
      .select("*")
      .from("Paragraphe")
      .whereIn("debatRefUid", compteRendus)
      .leftJoin(
        function () {
          this.select([
            "uid as acteur_uid",
            "slug as acteur_slug",
            "prenom",
            "nom",
            "groupeParlementaireUid",
          ])
            .from("Acteur")
            .as("acteur");
        },
        "Paragraphe.acteurRef",
        "acteur.acteur_uid"
      )
      .leftJoin(
        function () {
          this.select([
            "uid as organe_uid",
            "codeType",
            "libelle as group_libelle",
            "libelleAbrege as group_libelle_short",
            "couleurAssociee as group_color",
          ])
            .from("Organe")
            .as("organe");
        },
        "acteur.groupeParlementaireUid",
        "organe.organe_uid"
      );
    return rows;
  } catch (error) {
    console.error("Error fetching rows from Dossier:", error);
    throw error;
  }
}

export async function getAgendasUnCached(reunionIds: string[]): Promise<any[]> {
  try {
    const rows = await db.select("*").from("Agenda").whereIn("uid", reunionIds);

    return rows;
  } catch (error) {
    console.error("Error fetching rows from Dossier:", error);
    throw error;
  }
}

export async function getPtsOdjUnCached(reunionIds: string[]): Promise<any[]> {
  try {
    const rows = await db
      .select("*")
      .from("PointOdj")
      .where("etat", "=", "Confirmé")
      .whereIn("agendaRefUid", reunionIds);

    return rows;
  } catch (error) {
    console.error("Error fetching rows from Dossier:", error);
    throw error;
  }
}

export async function getTableUnCached(
  table: string,
  limit = 10
): Promise<Dossier[]> {
  try {
    if (table === "VoteActeLegislatif") {
      //   return await db
      //     .select("voteRefUid")
      //     .from(table)
      //     .groupBy("voteRefUid")
      //     .havingRaw("COUNT(*) = 1");

      return await db
        .select("*")
        .from(table)
        // .where("voteRefUid", "=", "VTANR5L16V569")
        .limit(limit);
    }

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

export const listTables = listTablesUnCached; //React.cache();

// export const getThemes = getThemesUnCached;//React.cache();

export const getDossierAmendements = getDossierAmendementsUnCached; //React.cache();
export const getDossierVotes = getDossierVotesUnCached; //React.cache();

export const getDeputeDocuments = getDeputeDocumentsUnCached; //React.cache();
export const getDeputes = getDeputesUnCached; //React.cache();
export const getParagraphs = getParagraphsUnCached; //React.cache();
export const getAgendas = getAgendasUnCached; //React.cache();
export const getPtsOdj = getPtsOdjUnCached; //React.cache();
export const getTable = getTableUnCached; //React.cache();
