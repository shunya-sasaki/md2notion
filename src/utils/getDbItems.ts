import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

/**
 * Fetches page ids, names, and last edited times from a Notion database.
 * @param databaseId The ID of the Notion database.
 * @returns A promise that resolves to an array of objects with id, name, and lastEdited (ISO string).
 */
export const getDbItems = async (
  databaseId: string,
): Promise<{ id: string; name: string; lastEdited: string }[]> => {
  const token = process.env.NOTION_TOKEN;
  const notion = new Client({
    auth: token,
  });
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const items = response.results.map(
      (item): { id: string; name: string; lastEdited: string } => {
        const page = item as PageObjectResponse;
        const id = page.id;
        const titleProperty = Object.values(page.properties).find(
          (property) => property.type === "title",
        );

        const name =
          titleProperty && titleProperty.type === "title"
            ? titleProperty.title[0]?.plain_text || "Untitled"
            : "Untitled";

        const lastEdited = page.last_edited_time;

        return { id, name, lastEdited };
      },
    );

    return items;
  } catch (error) {
    console.error("Error fetching database items from Notion:", error);
    return [];
  }
};
