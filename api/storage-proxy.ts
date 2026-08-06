import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { key } = req.query;

  if (!key || typeof key !== 'string') {
    return res.status(400).send("Missing or invalid storage key");
  }

  const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
  const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

  if (!forgeBaseUrl || !forgeKey) {
    return res.status(500).send("Storage proxy not configured on Vercel");
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
}
