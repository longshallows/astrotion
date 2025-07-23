export { default } from "./customization/config";

export const auth = import.meta.env.NOTION_API_SECRET;
export const databaseId = import.meta.env.ARTICLES_DB_ID;
export const authorsDbId = import.meta.env.AUTHORS_DB_ID;
export const debug = !!import.meta.env.DEBUG;
export const site = import.meta.env.SITE || "http://localhost:3000";
