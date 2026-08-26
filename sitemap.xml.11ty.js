// XML sitemap (sitemaps.org protocol) for search/AI crawlers. Built from the
// same _data/nav.js tree as the sidebar and llms.txt, so a renamed or
// removed page can't leave a stale entry behind.
//
// <loc> always uses *this build's own* domain (ELEVENTY_SITE_ORIGIN, set
// per pathPrefix pass in .github/workflows/deploy.yml exactly like
// ELEVENTY_PATH_PREFIX already is) rather than one hardcoded canonical
// host: Google's own cross-domain sitemap rules only accept a sitemap
// listing URLs on the same host that serves it (or one you've separately
// verified in Search Console) — a GitHub Pages build whose sitemap only
// listed the Cloudflare domain's URLs would be invalid under that rule.
// Required, not defaulted — see CANONICAL_ORIGIN's comment in
// eleventy.config.js for why.
if (!process.env.ELEVENTY_SITE_ORIGIN) {
  throw new Error("ELEVENTY_SITE_ORIGIN must be set — see deploy.yml");
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
  // The homepage isn't in nav.js — base.njk renders it as a standalone
  // "Introduction" link ahead of the array — so it's seeded in by hand.
  const paths = new Set(["/"]);

  for (const group of data.nav) {
    for (const item of group.items) {
      const itemPath = item.href.split("#")[0];
      paths.add(itemPath);

      for (const child of item.children ?? []) {
        const childPath = child.href.split("#")[0];
        // Anchor-only children (e.g. Mail/Feedback under Server config)
        // point at a spot on the parent's own page, not a distinct URL —
        // listing it again would duplicate the parent's <loc> entry.
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
