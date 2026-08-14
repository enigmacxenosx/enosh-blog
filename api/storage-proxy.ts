import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const key = (req.query.key as string) || req.url?.replace(/^\/api\/storage-proxy\?key=/, "");
  if (!key) {
    res.status(400).send("Missing storage key");
    return;
  }

  const forgeBaseUrl = process.env.BUILT_IN_FORGE_API_URL?.replace(/\/+$/, "");
  const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

  if (!forgeBaseUrl || !forgeKey) {
    res.status(500).send("Storage proxy not configured");
    return;
  }

  try {
    const url = new URL("v1/storage/presign/get", forgeBaseUrl + "/");
    url.searchParams.set("path", key);

    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${forgeKey}` },
    });

    if (!resp.ok) {
      res.status(resp.status).send("Storage fetch failed");
      return;
    }

    const { url: signedUrl } = await resp.json();
    res.redirect(307, signedUrl);
  } catch {
    res.status(500).send("Storage proxy error");
  }
}
