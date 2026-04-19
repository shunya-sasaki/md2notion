import type { BlockObjectRequest } from "@notionhq/client";
import { Client } from "@notionhq/client";

/**
 * @summary Function to upload Notion blocks to a Notion database.
 * @param blocks An array of Notion blocks to be uploaded.
 * @param title The title of the page to be created in Notion.
 * @param propertyName The name of the property to be set in the Notion page.
 * @param properties An array of properties to be set for the new page.
 */
export const uploadBlocksToNotion = async (
  databaseId: string,
  title: string,
  blocks: BlockObjectRequest[],
  propertyName: string,
  properties: Array<string | number>,
) => {
  try {
    const token = process.env.NOTION_TOKEN;
    const notion = new Client({
      auth: token,
    });
    const BATCH_SIZE = 100;
    const firstBatch = blocks.slice(0, BATCH_SIZE);
    const remaining = blocks.slice(BATCH_SIZE);

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: { title: [{ text: { content: title } }] },
        [propertyName]: {
          multi_select: properties.map((prop: string | number) => ({
            name: String(prop),
          })),
        },
      },
      children: firstBatch,
    });

    for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
      const batch = remaining.slice(i, i + BATCH_SIZE);
      await notion.blocks.children.append({
        block_id: response.id,
        children: batch,
      });
    }

    console.log("Page created successfully:", response);
  } catch (error) {
    console.error("Error :", title);
    console.error(JSON.stringify(blocks, null, 2));
    console.error("Error creating page:", error);
  }
};
