export function cleanText(text: string) {
  return text
    .replaceAll("<exposant>", "<sup>")
    .replaceAll("</exposant>", "</sup>")
    .replaceAll("<italique>", "<i>")
    .replaceAll("<italique>", "<i>");
}
