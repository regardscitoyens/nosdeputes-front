import { type NextRequest } from "next/server";
import { prisma } from "@/prisma";

// export const dynamic = "force-static";

function parseNumber(value: string | null, defaultValue: number) {
  if (value === null) {
    return defaultValue;
  }

  const parsed = Number.parseInt(value);

  return Number.isInteger(parsed) ? parsed : defaultValue;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const legislature = searchParams.get("legislature") ?? "16";
  const theme = searchParams.get("theme");
  const page = parseNumber(searchParams.get("page"), 0);
  const pageSize = parseNumber(searchParams.get("pageSize"), 20);

  const data = await prisma.dossier.findMany({
    where: { legislature, ...(theme === "" ? {} : { theme }) },
    orderBy: { numero: "asc" }, // TODO replace by last date when possible
    take: pageSize,
    skip: page * pageSize,
  });

  return Response.json({ data });
}
