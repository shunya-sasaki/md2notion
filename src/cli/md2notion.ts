/**
 * A command-line tool that converts markdown files to Notion pages.
 *
 * This script reads a markdown file, converts it to Notion blocks using the @tryfabric/martian library,
 * and creates a new page in a specified Notion database with the converted content.
 *
 * @example
 * ```bash
 * # Basic usage
 * node md2notion.ts README.md
 *
 * # With programming languages and OS tags
 * node md2notion.ts README.md --language TypeScript --os Linux Windows
 * ```
 *
 * @remarks
 * - Requires NOTION_TOKEN environment variable to be set
 * - The database ID is currently hardcoded and should be configured for different use cases
 * - Supports multi-select properties for programming languages and operating systems
 *
 * @param file - Path to the markdown file to be converted (positional argument)
 * @param language - Array of programming languages used in the project (optional)
 * @param os - Array of operating systems used in the project (optional)
 *
 * @throws {Error} When file path is not provided or when Notion API calls fail
 *
 * @requires @notionhq/client - For Notion API integration
 * @requires yargs - For command-line argument parsing
 * @requires fs - For file system operations
 */

import fs from "node:fs";
import type { Config } from "@/models/Config.ts";
import { archivePageInNotion } from "@/utils/archivePageInNotion";
import { createTocBlock } from "@/utils/createTocBlock";
import { getDbItems } from "@/utils/getDbItems";
import { listFiles } from "@/utils/listFiles";
import { mdToBlocks } from "@/utils/mdToBlocks";
import { readJson } from "@/utils/readJson";
import { readMarkdownContents } from "@/utils/readMarkdownContents";
import { readMarkdownTitle } from "@/utils/readMarkdownTitle";
import { uploadBlocksToNotion } from "@/utils/uploadBlocksToNotion";

// Main process ===============================================================
const config: Config = readJson("./config.json");
const localDir = config.localDir;

const databaseNames = Object.keys(config.databases);

databaseNames.forEach(async (databaseName) => {
  const dbConfig = config.databases[databaseName];
  const databaseId = dbConfig.id;
  const propertyName = dbConfig.properties.name;
  const sectionNames = Object.keys(dbConfig.properties.sections);
  const existedDbItems = await getDbItems(databaseId);

  sectionNames.forEach(async (sectionName) => {
    const sectionConfig = dbConfig.properties.sections;
    const property = sectionConfig[sectionName].name;
    const properties = [property];
    const pattern = `${localDir}/${databaseName}/${sectionName}/*.md`;
    const fileNames = await listFiles(pattern);
    fileNames.forEach(async (fileName) => {
      const title = await readMarkdownTitle(fileName);
      let isUpToDate = false;
      existedDbItems.forEach(({ id, name, lastEdited }) => {
        if (name === title) {
          const lastEditedTime = new Date(lastEdited).getTime();
          const fileStat = fs.statSync(fileName);
          const fileModifiedTime = fileStat.mtime?.getTime() || 0;
          if (lastEditedTime >= fileModifiedTime) {
            isUpToDate = true;
          } else {
            isUpToDate = false;
            archivePageInNotion(id);
          }
        }
      });

      if (isUpToDate) {
        return;
      } else {
        console.log(`${title} will be updated.`);
      }

      const contents = await readMarkdownContents(fileName);
      const blocks = await mdToBlocks(contents).catch((error) => {
        console.log(fileName);
        console.error(error);
      });
      const tocBlock = createTocBlock();
      blocks.splice(1, 0, tocBlock);

      uploadBlocksToNotion(
        databaseId,
        title,
        blocks,
        propertyName,
        properties,
      ).catch((error) => {
        console.error(`Error in uploading ${fileName}`);
        console.error("Error uploading markdown to Notion:", error);
      });
    });
  });
});
