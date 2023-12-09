import Link from "next/link";

export default async function Dossiers() {
  // TODO: match old website url ":id/dossiers/:id"
  return (
    <div>
      <Link href="dossiers/dossier">Lien vers un dossier</Link>
    </div>
  );
}
