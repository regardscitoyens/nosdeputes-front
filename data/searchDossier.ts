import { Dossier } from "@prisma/client";
import { parseDossier } from "./parsers/parseDossier";

interface SearchDossierParams {
  /**
   * @default 10
   */
  perPage?: number;
  /**
   * @default 0
   */
  page?: number;
  /**
   * @default 'dateDernierActe.desc'
   */
  sort?: string;
  /**
   * @default ""
   */
  search?: string;
}

export async function searchDossier(
  params: SearchDossierParams
): Promise<Dossier[] | null> {
  const {
    perPage = 10,
    page = 0,
    sort = "dateDernierActe.desc",
    search = "",
  } = params;

  const searchParams = new URLSearchParams({
    perPage: perPage.toString(),
    page: page.toString(),
    sort,
    dataset: "17",
  });

  if (search) {
    searchParams.set("search", search);
  }
  try {
    const rep = await fetch(
      `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/dossiers/?${searchParams}`
    );

    const { data } = await rep.json();

    // Transforms all the "yyy-mm-dd" string into Date objects.
    data.forEach(parseDossier);

    return data;
  } catch (error) {
    console.error("Error fetching dossier:", error);
    return null;
  }
}
