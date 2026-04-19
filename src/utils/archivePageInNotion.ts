import { Client } from "@notionhq/client";

export const archivePageInNotion = async (pageId: string) => {
  try {
    const token = process.env.NOTION_TOKEN;
    const notion = new Client({
      auth: token,
    });
    const response = await notion.pages.update({
      page_id: pageId,
      archived: true,
    });
  } catch (errror) {
    console.error("Error archiving page:", errror);
  }
};
