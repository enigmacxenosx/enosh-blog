import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { protectedProcedure } from "./_core/trpc";
import {
  deleteGalleryPhoto,
  deletePost,
  getAllGalleryPhotos,
  getPostBySlug,
  insertGalleryPhoto,
  insertPost,
  listAllPosts,
  listPublishedPosts,
  slugExists,
  updatePost,
} from "./db";
import { storagePut } from "./storage";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  gallery: router({
    /** Get all gallery photos (public). */
    list: publicProcedure.query(async () => {
      const photos = await getAllGalleryPhotos();
      return photos;
    }),

    /** Upload a new photo to the gallery (authenticated users only). */
    upload: protectedProcedure
      .input(
        z.object({
          /** Base64-encoded file data */
          fileData: z.string().min(1),
          /** Original filename (used for extension) */
          fileName: z.string().min(1),
          /** Photo caption/title */
          caption: z.string().min(1).max(256),
          /** Optional sub-caption */
          subCaption: z.string().max(128).default(""),
        }),
      )
      .mutation(async ({ input }) => {
        // Determine file extension from filename
        const ext = input.fileName.split(".").pop()?.toLowerCase() || "jpg";
        const allowedExts = ["jpg", "jpeg", "png", "webp", "gif"];
        if (!allowedExts.includes(ext)) {
          throw new Error("Only image files (jpg, jpeg, png, webp, gif) are allowed");
        }

        // Decode base64 to buffer
        const buffer = Buffer.from(input.fileData, "base64");
        if (buffer.length > 10 * 1024 * 1024) {
          throw new Error("File size must be under 10MB");
        }

        const contentType =
          ext === "png"
            ? "image/png"
            : ext === "webp"
              ? "image/webp"
              : ext === "gif"
                ? "image/gif"
                : "image/jpeg";

        // Upload to S3
        const { url } = await storagePut(
          `gallery/enosh-${Date.now()}.${ext}`,
          buffer,
          contentType,
        );

        // Get total count for sort order
        const existing = await getAllGalleryPhotos();
        const sortOrder = existing.length;

        // Save to database
        await insertGalleryPhoto({
          fileKey: url.replace("/manus-storage/", ""),
          url,
          caption: input.caption,
          subCaption: input.subCaption,
          sortOrder,
        });

        return { success: true, url };
      }),

    /** Delete a gallery photo (authenticated users only). */
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteGalleryPhoto(input.id);
        return { success: true };
      }),
  }),

  posts: router({
    /** List published posts (public, client-safe fields). */
    list: publicProcedure.query(async () => {
      const posts = await listPublishedPosts();
      return posts.map(p => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        tags: p.tags,
        coverUrl: p.coverUrl,
        publishedAt: p.publishedAt,
        createdAt: p.createdAt,
      }));
    }),

    /** Get a single published post by slug (public). */
    bySlug: publicProcedure
      .input(z.object({ slug: z.string().min(1).max(256) }))
      .query(async ({ input }) => {
        const post = await getPostBySlug(input.slug);
        if (!post || post.status !== "published") return null;
        return post;
      }),

    /** List ALL posts including drafts (authenticated users only). */
    adminList: protectedProcedure.query(async () => {
      return listAllPosts();
    }),

    /** Create a new post (authenticated users only). */
    create: protectedProcedure
      .input(
        z.object({
          slug: z.string().min(1).max(256).regex(/^[a-z0-9-]+$/),
          title: z.string().min(1).max(512),
          excerpt: z.string().max(1024).default(""),
          body: z.string().min(1),
          tags: z.string().max(512).default(""),
          coverUrl: z.string().max(512).default(""),
          status: z.enum(["draft", "published"]).default("draft"),
          sortOrder: z.number().int().default(0),
        }),
      )
      .mutation(async ({ input }) => {
        if (await slugExists(input.slug)) {
          throw new Error(`Slug "${input.slug}" already exists`);
        }
        await insertPost({
          ...input,
          publishedAt: input.status === "published" ? new Date() : null,
        });
        return { success: true };
      }),

    /** Update an existing post (authenticated users only). */
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          slug: z.string().min(1).max(256).regex(/^[a-z0-9-]+$/).optional(),
          title: z.string().min(1).max(512).optional(),
          excerpt: z.string().max(1024).optional(),
          body: z.string().min(1).optional(),
          tags: z.string().max(512).optional(),
          coverUrl: z.string().max(512).optional(),
          status: z.enum(["draft", "published"]).optional(),
          sortOrder: z.number().int().optional(),
        }),
      )
      .mutation(async ({ input }) => {
        const { id, slug, ...rest } = input;
        if (slug && (await slugExists(slug, id))) {
          throw new Error(`Slug "${slug}" already exists`);
        }
        await updatePost(id, rest);
        return { success: true };
      }),

    /** Delete a post (authenticated users only). */
    remove: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deletePost(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
