// Machine-readable site index for AI agents/LLMs (the emerging llms.txt
// convention: https://llmstxt.org). Built from the same _data/nav.js tree
// that drives the real sidebar — a hand-maintained copy would drift out of
// sync the first time a page got renamed, and a stale llms.txt is worse
// than none.
const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || "/";
const base = pathPrefix.replace(/\/$/, "");

function mdHref(href) {
  // href is a clean-URL site path (e.g. "/configs/quests/", or
  // "/setup/server-config/#mail" for an anchor-only nav child) — the raw
  // markdown sibling lives one level up, at the same name with .md instead
  // of the trailing slash (see the **/*.md passthrough copy in
  // eleventy.config.js). A raw markdown file has no notion of an in-page
  // anchor, so the fragment is dropped along with the trailing slash.
  const path = href.split("#")[0].replace(/\/$/, "");
  return base + path + ".md";
}

export const data = {
  permalink: "llms.txt",
  eleventyExcludeFromCollections: true,
  layout: false,
  title: "llms.txt",
};

export default function (data) {
  const lines = [
    "# Marketplace and Server NPCs (Revamped)",
    "",
    "> Documentation for the Marketplace and Server NPCs (Revamped) Valheim mod: NPC shops, quests, dialogue, banking, territories, and server/client configuration.",
    "",
    "Every link below is the raw Markdown source for that page — the same file this site is built from — rather than the rendered HTML.",
    "",
    `- [Introduction](${base}/README.md)`,
  ];

  for (const group of data.nav) {
    lines.push("", `## ${group.title}`);

    for (const item of group.items) {
      const itemPath = item.href.split("#")[0];
      lines.push(`- [${item.title}](${mdHref(item.href)})`);

      for (const child of item.children ?? []) {
        // Skip anchor-only children (e.g. Mail/Feedback under Server
        // config) — they're a spot on the parent's own page, not a
        // separate document, so they'd just repeat the same .md link.
        if (child.href.split("#")[0] === itemPath) continue;
        lines.push(`  - [${child.title}](${mdHref(child.href)})`);
      }
    }
  }

  return lines.join("\n") + "\n";
}
