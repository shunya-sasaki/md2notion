import { Client } from "@notionhq/client";
import type { Config } from "@/models/Config";
import { getDbItems } from "@/utils/getDbItems";
import { readJson } from "@/utils/readJson";

const config: Config = readJson("./config.json");
const databaseName = "languages";

const dbConfig = config.databases[databaseName];
const databaseId = dbConfig.id;

const token = process.env.NOTION_TOKEN;
const notion = new Client({
  auth: token,
});

const items = await getDbItems(databaseId);
console.log(JSON.stringify(items, null, 2));
