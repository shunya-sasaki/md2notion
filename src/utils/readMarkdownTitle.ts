import { readFileSync } from "node:fs";

/**
 * @summary Function to read the title of a markdown file.
 * @param filePath The path to the markdown file.
 * @returns The title of the markdown file.
 */
export const readMarkdownTitle = async (filePath: string) => {
  if (!filePath) {
    console.error("Please provide a file path as an argument.");
    process.exit(1);
  }
  const fileContent = readFileSync(filePath, "utf-8");
  const title = fileContent.split("\n")[0].replace(/^#\s*/, "");
  return title;
};
