import { ActLegislatif, Document } from "./database";

export function getDocumentURL(document?: Document) {
  if (!document || !document?.legislature || !document.numNotice) {
    return undefined;
  }
  const suffix =
    document.classeCode === "PRJLOI" ? "projet-loi" : "proposition-loi";

  const notice = `${"0000".slice(0, 4 - document.numNotice.length)}${
    document.numNotice
  }`;

  return `https://www.assemblee-nationale.fr/dyn/${document.legislature}/textes/l${document.legislature}b${notice}_${suffix}`;
}

