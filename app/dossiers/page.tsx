import { Layout } from "../components/Layout";

import Link from "next/link";

export default function Dossiers() {
  return (
    <Layout>
      {/* TODO: match old website url ":id/dossiers/:id" */}
      <Link href="dossiers/dossier">Lien vers un dossier</Link>
    </Layout>
  );
}
