const pathPrefix = (process.env.ELEVENTY_PATH_PREFIX || "/").replace(/\/$/, "");
const isArchivedVersion = process.env.ELEVENTY_ARCHIVED_VERSION === "true";

export const data = {
  permalink: "robots.txt",
  eleventyExcludeFromCollections: true,
  layout: false,
  title: "robots.txt",
};

export default function () {
  if (isArchivedVersion) {
    return `User-agent: *
Disallow: /
`;
  }

  if (!process.env.ELEVENTY_SITE_ORIGIN) {
    throw new Error("ELEVENTY_SITE_ORIGIN must be set — see package.json's start/serve scripts (local) or deploy.yml (CI)");
  }
  const siteOrigin = process.env.ELEVENTY_SITE_ORIGIN;

  return `# Machine-readable site index for agents/LLMs: /llms.txt
# Raw markdown for any page: same URL plus index.md

User-agent: *
Allow: /
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
