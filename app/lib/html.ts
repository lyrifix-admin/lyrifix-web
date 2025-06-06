import parse from "html-react-parser";

export function parseHTML(html?: string) {
  if (!html) return "";
  return parse(html);
}
