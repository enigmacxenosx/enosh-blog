import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Photo gallery table — stores uploaded photos with captions.
 */
export const galleryPhotos = mysqlTable("galleryPhotos", {
  id: int("id").autoincrement().primaryKey(),
  /** S3 file key (e.g. "gallery/photo_abc123.jpg") */
  fileKey: varchar("fileKey", { length: 256 }).notNull(),
  /** Public URL to the photo */
  url: varchar("url", { length: 512 }).notNull(),
  /** Caption/title for the photo */
  caption: varchar("caption", { length: 256 }).notNull(),
  /** Sub-caption or chapter label */
  subCaption: varchar("subCaption", { length: 128 }).default(""),
  /** Sort order — lower numbers appear first */
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GalleryPhoto = typeof galleryPhotos.$inferSelect;
export type InsertGalleryPhoto = typeof galleryPhotos.$inferInsert;

/**
 * Blog posts table — Markdown-powered posts with tags, excerpts, cover images,
 * and draft/published status for the post engine.
 */
export const blogPosts = mysqlTable("blogPosts", {
  id: int("id").autoincrement().primaryKey(),
  /** URL-safe slug, e.g. "editorial-noir-design-system" */
  slug: varchar("slug", { length: 256 }).notNull().unique(),
  title: varchar("title", { length: 512 }).notNull(),
  /** Optional short excerpt shown on list cards; derived if empty */
  excerpt: varchar("excerpt", { length: 1024 }).default(""),
  /** Full Markdown body */
  body: text("body").notNull(),
  /** Comma-separated tags, e.g. "design, case-study" */
  tags: varchar("tags", { length: 512 }).default(""),
  /** Optional cover image URL */
  coverUrl: varchar("coverUrl", { length: 512 }).default(""),
  status: mysqlEnum("status", ["draft", "published"]).default("draft").notNull(),
  publishedAt: timestamp("publishedAt"),
  /** Lower numbers appear first on the list */
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;