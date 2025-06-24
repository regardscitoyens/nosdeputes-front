import { Amendement, Dossier } from "@prisma/client";
import { parseDossier } from "./parsers/parseDossier";

interface SearchAmendementParams {
  /**
   * @default 10
   */
  perPage?: number;
  /**
   * @default 0
   */
  page?: number;
  /**
   * @default """
   */
  sort?: string;
  /**
   * @default "numeroOrdreDepot.asc"
   */
  search?: string;
  /**
   * L'uid of the document sur lequel porte l'amendment.
   */
  documentRefUid: string;
  /**
   * L'uid of l'auteur de l'amendment.
   */
  acteurRefUid?: string;
}

export async function searchAmendement(
  params: SearchAmendementParams
): Promise<Amendement[] | null> {
  const {
    perPage = 10,
    page = 0,
    sort = "numeroOrdreDepot.asc",
    search = "",
  } = params;

  const searchParams = new URLSearchParams({
    perPage: perPage.toString(),
    page: page.toString(),
    sort,
  });

  if (search) {
    searchParams.set("search", search);
  }
  try {
    const rep = await fetch(
      `${process.env.NEXT_PUBLIC_TRICOTEUSES_API_URL}/amendements?${searchParams}`
    );

    const { data } = await rep.json();

    // Transforms all the "yyy-mm-dd" string into Date objects.
    data?.forEach(parseDossier);

    return data;
  } catch (error) {
    console.error("Error fetching dossier:", error);
    return null;
  }
}
