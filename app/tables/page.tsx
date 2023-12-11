import { getTable, listTables } from "@/repository/database";
import Link from "next/link";

export default async function Dossiers({
  searchParams,
}: {
  searchParams: { table: string };
}) {
  const tables = await listTables();
  const dossier = await getTable(searchParams.table ?? "");
  // TODO: match old website url ":id/dossiers/:id"
  return (
    <div style={{ display: "flex" }}>
      <ul>
        {tables.map((tableName: string) => (
          <li key={tableName}>
            <a href={`/tables/?table=${tableName}`}>{tableName}</a>
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
