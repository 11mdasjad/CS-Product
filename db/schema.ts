import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const articles = sqliteTable("articles", {
  slug: text("slug").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  excerpt: text("excerpt").notNull(),
  image: text("image").notNull(),
  date: text("date").notNull(),
  author: text("author").notNull(),
  body: text("body").notNull(),
  status: text("status").notNull().default("draft"),
});
export const limits = sqliteTable("request_limits", {
  key: text("key").primaryKey(),
  count: integer("count").notNull(),
  expires: integer("expires").notNull(),
});
