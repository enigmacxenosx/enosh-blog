import { and, asc, desc, eq, lt } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertBlogPost, InsertGalleryPhoto, InsertUser, blogPosts, galleryPhotos, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/* ─── Gallery Photos ─── */

export async function getAllGalleryPhotos() {
  const db = await getDb();
  if (!db) return [];
  const result = await db
    .select()
    .from(galleryPhotos)
    .orderBy(desc(galleryPhotos.createdAt));
  return result;
}

export async function insertGalleryPhoto(photo: InsertGalleryPhoto) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(galleryPhotos).values(photo);
  return result;
}

export async function deleteGalleryPhoto(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(galleryPhotos).where(eq(galleryPhotos.id, id));
}

/* ─── Blog Posts ─── */

const now = () => new Date();

export async function listPublishedPosts() {
  const db = await getDb();
  if (!db) return [];
  const result = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.status, "published"), lt(blogPosts.publishedAt, now())))
    .orderBy(asc(blogPosts.sortOrder), desc(blogPosts.publishedAt));
  return result;
}

export async function getPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function listAllPosts() {
  const db = await getDb();
  if (!db) return [];
  const result = await db
    .select()
    .from(blogPosts)
    .orderBy(asc(blogPosts.sortOrder), desc(blogPosts.createdAt));
  return result;
}

export async function insertPost(post: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(blogPosts).values(post);
}

export async function updatePost(id: number, fields: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(blogPosts).set(fields).where(eq(blogPosts.id, id));
}

export async function deletePost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

export async function slugExists(slug: string, excludeId?: number) {
  const db = await getDb();
  if (!db) return false;
  const conditions = excludeId ? [eq(blogPosts.slug, slug), eq(blogPosts.id, excludeId)] : [eq(blogPosts.slug, slug)];
  const result = await db
    .select({ id: blogPosts.id })
    .from(blogPosts)
    .where(and(...conditions))
    .limit(1);
  return result.length > 0;
}
