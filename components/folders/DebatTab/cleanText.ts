export function cleanText(text: string, justRemove?: boolean) {
  return text
    .replaceAll("<exposant>", "<sup>")
    .replaceAll("</exposant>", "</sup>")
    .replaceAll("<italique>", justRemove ? "" : "<i>")
    .replaceAll("<italique>", justRemove ? "" : "<i>");
}
