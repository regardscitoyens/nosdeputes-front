import { getTable, listTables } from "@/repository/database";
import Link from "next/link";

export default async function Dossiers({
  searchParams,
}: {
  searchParams: { table: string };
}) {
  const tables = await listTables();
  const dossier = await getTable(searchParams.table ?? "");

  return (
    <div style={{ display: "flex" }}>
      <ul>
        {tables.map((tableName: string) => (
          <li key={tableName}>
            <Link href={`/tables/?table=${tableName}`}>{tableName}</Link>
          </li>
        ))}
      </ul>
      <div>
        <p>{searchParams.table}</p>
        <pre>{JSON.stringify(dossier, null, 2)}</pre>
      </div>
    </div>
  );
}
