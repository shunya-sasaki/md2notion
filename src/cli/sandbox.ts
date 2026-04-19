import type { Config } from "@/models/Config.ts";
import { createTocBlock } from "@/utils/createTocBlock";
import { getDbItems } from "@/utils/getDbItems";
import { listFiles } from "@/utils/listFiles";
import { mdToBlocks } from "@/utils/mdToBlocks";
import { readJson } from "@/utils/readJson";
import { readMarkdownContents } from "@/utils/readMarkdownContents";
import { readMarkdownTitle } from "@/utils/readMarkdownTitle";
import { uploadBlocksToNotion } from "@/utils/uploadBlocksToNotion";
import { writeFileSync } from "node:fs";

// Main process ===============================================================
const config: Config = readJson("./config.json");

const fileName = "sandbox/sample.md"

const title = await readMarkdownTitle(fileName);

const contents = await readMarkdownContents(fileName);
const blocks = await mdToBlocks(contents, 1).catch((error) => {
  console.log(fileName);
});
const tocBlock = createTocBlock();
blocks.splice(1, 0, tocBlock);
writeFileSync("./sandbox/output.json", JSON.stringify(blocks, null, 2))
