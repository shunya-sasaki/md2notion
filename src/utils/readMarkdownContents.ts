import { readFileSync } from "node:fs";

/**
 * @summary Function to read markdown file and convert it to Notion blocks
 * @param filePath The path to the markdown file
 * @returns An array of Notion blocks
 */
export const readMarkdownContents = async (filePath: string) => {
  if (!filePath) {
    console.error("Please provide a file path as an argument.");
    process.exit(1);
  }
  const fileContent = readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n");
  const contents: Array<string> = [];
  const regexBlankLine = /^$/;
  const regexIndexItem = /^\s*-\s\[[^\]]+]\([^)]*\)\s*$/m;
  const regexShieldIcon =
    /^\s*!\[[^\]]+]\(https:\/\/img.shields.io[^)]*\)\s*$/m;
  const regexH1 = /^#\s/;
  const regexH2 = /^##\s/;
  let isBody = false;
  for (const line of lines) {
    if (line.includes("<!-- toc -->")) {
    } else if (line.includes("<!-- /toc -->")) {
    } else if (regexShieldIcon.test(line)) {
    } else if (isBody === false && regexBlankLine.test(line)) {
    } else if (isBody === false && regexIndexItem.test(line)) {
    } else if (regexH1.test(line)) {
      contents.push(line);
      contents.push("\n");
    } else if (isBody === false && regexH2.test(line)) {
      isBody = true;
      contents.push("\n");
      contents.push(line);
    } else {
      contents.push(line);
    }
  }
  const blocksContents = contents.join("\n");
  return blocksContents;
};
