// Templated (not a static passthrough file) specifically so the Sitemap:
// line below can point at *this build's own* domain — see sitemap.xml.11ty.js
// for why the two must agree: Google only accepts a sitemap that lists URLs
// on the same host serving it, so the GitHub Pages build and the Cloudflare
// build each need their own absolute Sitemap URL, not one shared constant.
const siteOrigin = process.env.ELEVENTY_SITE_ORIGIN || "https://kg-marketplace.pages.dev";
const pathPrefix = (process.env.ELEVENTY_PATH_PREFIX || "/").replace(/\/$/, "");
const isArchivedVersion = process.env.ELEVENTY_ARCHIVED_VERSION === "true";

export const data = {
  permalink: "robots.txt",
  eleventyExcludeFromCollections: true,
  layout: false,
  title: "robots.txt",
};

export default function () {
  // A frozen past mod version (see eleventy.config.js's isArchivedVersion)
  // shouldn't compete with the current docs in search results — every
  // page already carries noindex (base.njk), this is the belt-and-braces
  // crawl-level block to match. No Sitemap: line for the same reason.
  if (isArchivedVersion) {
    return `User-agent: *
Disallow: /
`;
  }

  return `# Nothing on this site is disallowed — it's public mod documentation. AI
# crawlers are listed individually (rather than relying on the User-agent: *
# block alone) so that if a path-specific Disallow is ever added under *,
# these stay unaffected: a more specific user-agent block always wins over *
# in the robots.txt spec, regardless of which one appears first.
#
# Machine-readable site index for agents/LLMs: /llms.txt
# Raw markdown for any page: same URL plus index.md

User-agent: *
Allow: /
# Content Signals (contentsignals.org) — usage preference after a crawler has
# already accessed the content, distinct from the Allow above (which is
# about access itself). All three "yes" because every other change in this
# file/site this conversation has been about making these docs *more*
# consumable by agents, not less — flip ai-train to "no" here alone if that
# stops being true for training specifically.
Content-Signal: search=yes, ai-input=yes, ai-train=yes

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${siteOrigin}${pathPrefix}/sitemap.xml
`;
}
