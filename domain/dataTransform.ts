import { Status } from "@/components/StatusChip";
import { ActeLegislatif, Document as DocumentData} from "../repository/types";

export function getDocumentURL(document?: DocumentData) {
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

const statusOrder = ["AN1", "SN1", "AN2", "SN2", "AN3", "SN3", "CMP", "PROM"];

export const statusInfo: Record<string, { label: string; status: Status }> = {
  AN1: { label: "1e lecture AN", status: "review" },
  SN1: { label: "1e lecture SN", status: "review" },
  AN2: { label: "2e lecture AN", status: "review" },
  SN2: { label: "2e lecture SN", status: "review" },
  AN3: { label: "3e lecture AN", status: "review" },
  SN3: { label: "3e lecture SN", status: "review" },
  CMP: { label: "Commission Mixte Paritaire", status: "review" },
  PROM: { label: "Promulguée", status: "validated" },
};

export function getCurrentStatus(acts: ActeLegislatif[]) {
  const codes = acts.map((act) => act.codeActe);

  for (let i = 0; i < statusOrder.length; i += 1) {
    const status = statusOrder[statusOrder.length - 1 - i];
    if (codes.some((code) => code.startsWith(status))) {
      return status;
    }
  }
}
