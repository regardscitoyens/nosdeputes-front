import { getDossiers } from "@/repository/database";
import Link from "next/link";

export default async function Dossiers() {
  // How to use ListTables???
  const dossiers = await getDossiers();
  // TODO: match old website url ":id/dossiers/:id"
  return (
    <div>
      <Link href="dossiers/dossier">Lien vers un dossier</Link>
      <h3>Rows from the Dossier Table: </h3>
      <div>{JSON.stringify(dossiers)}</div>
    </div>
  );
}
