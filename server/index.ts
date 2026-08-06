import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // 1. Storage Proxy (Critical for images to work in production)
  app.use("/manus-storage", async (req, res) => {
    const key = req.url?.replace(/^\//, "");
    if (!key) {
      return res.status(400).send("Missing storage key");
    }

    const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
    const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

    if (!forgeBaseUrl || !forgeKey) {
      return res.status(500).send("Storage proxy not configured");
    }

    try {
      const forgeUrl = new URL("v1/storage/presign/get", forgeBaseUrl + "/");
      forgeUrl.searchParams.set("path", key);

      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${forgeKey}` },
      });

      if (!forgeResp.ok) {
        return res.status(502).send("Storage backend error");
      }

      const { url } = (await forgeResp.json()) as { url: string };
      if (!url) {
        return res.status(502).send("Empty signed URL");
      }

      res.redirect(307, url);
    } catch (error) {
      console.error("Storage proxy error:", error);
      res.status(502).send("Storage proxy error");
    }
  });

  // 2. Static File Serving
  // In production, the server is at dist/index.js and static files are in dist/public
  // In development (tsx), the server is at server/index.ts and static files are in dist/public
  const staticPath = process.env.NODE_ENV === "production"
    ? path.join(__dirname, "public")
    : path.join(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // 3. Client-side Routing
  app.get("*", (req, res, next) => {
    // Skip if it's an API call or other non-page request
    if (req.path.startsWith("/api") || req.path.includes(".")) {
      return next();
    }
    res.sendFile(path.join(staticPath, "index.html"), (err) => {
      if (err) {
        res.status(404).send("Not Found");
      }
    });
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`Serving static files from: ${staticPath}`);
  });
}

startServer().catch(console.error);
