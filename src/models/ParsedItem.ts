export interface ParsedItem {
  type: string;
  [key: string]: string | number | boolean | ParsedItem[];
}
