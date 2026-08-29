const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || "/";
const base = pathPrefix.replace(/\/$/, "");

function mdHref(href) {
  const path = href.split("#")[0];
  return base + path + "index.md";
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
    `- [Introduction](${base}/index.md)`,
  ];

  for (const group of data.nav) {
    lines.push("", `## ${group.title}`);

    for (const item of group.items) {
      const itemPath = item.href.split("#")[0];
      lines.push(`- [${item.title}](${mdHref(item.href)})`);

      for (const child of item.children ?? []) {
        if (child.href.split("#")[0] === itemPath) continue;
        lines.push(`  - [${child.title}](${mdHref(child.href)})`);
      }
    }
  }

  return lines.join("\n") + "\n";
}
