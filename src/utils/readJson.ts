import { readFileSync } from "node:fs";

/**
 * @summary Function to read a JSON file and parse its contents.
 * @param filePath The
 */
export const readJson = (filePath: string) => {
  const text = readFileSync(filePath, "utf-8");
  return JSON.parse(text);
};
