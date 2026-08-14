import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { protectedProcedure } from "./_core/trpc";
import {
  deleteGalleryPhoto,
  getAllGalleryPhotos,
  insertGalleryPhoto,
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
});

export type AppRouter = typeof appRouter;
