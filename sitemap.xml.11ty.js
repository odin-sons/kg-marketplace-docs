if (!process.env.ELEVENTY_SITE_ORIGIN) {
  throw new Error("ELEVENTY_SITE_ORIGIN must be set — see package.json's start/serve scripts (local) or deploy.yml (CI)");
}
const siteOrigin = process.env.ELEVENTY_SITE_ORIGIN;
const pathPrefix = (process.env.ELEVENTY_PATH_PREFIX || "/").replace(/\/$/, "");

export const data = {
  permalink: "sitemap.xml",
  eleventyExcludeFromCollections: true,
  layout: false,
  title: "sitemap.xml",
};

export default function (data) {
  const paths = new Set(["/"]);

  for (const group of data.nav) {
    for (const item of group.items) {
      const itemPath = item.href.split("#")[0];
      paths.add(itemPath);

      for (const child of item.children ?? []) {
        const childPath = child.href.split("#")[0];
        if (childPath !== itemPath) paths.add(childPath);
      }
    }
  }

  const urls = [...paths]
    .sort()
    .map((p) => `  <url><loc>${siteOrigin}${pathPrefix}${p}</loc></url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
