import fs from "node:fs";
import { MARKDOWN_CONTENT_DIRS } from "./eleventy.config.js";

const pathPrefix = (process.env.ELEVENTY_PATH_PREFIX || "/").replace(/\/$/, "");

export const data = {
  permalink: "llms-full.txt",
  eleventyExcludeFromCollections: true,
  layout: false,
  title: "llms-full.txt",
};

function collectMarkdownFiles() {
  const files = ["README.md"];
  for (const dir of MARKDOWN_CONTENT_DIRS) {
    for (const entry of fs.readdirSync(dir, { recursive: true }).sort()) {
      if (entry.endsWith(".md")) files.push(`${dir}/${entry}`);
    }
  }
  return files;
}

export default function () {
  const parts = [
    "# Marketplace and Server NPCs (Revamped) — full documentation",
    "",
    `> Every page below, concatenated, for pasting into an AI assistant's context all at once. Want a link to just one page instead? See ${pathPrefix}/llms.txt for an index, or that page's own <url>/index.md.`,
    "",
  ];

  for (const file of collectMarkdownFiles()) {
    parts.push("---", `<!-- source: ${file} -->`, "", fs.readFileSync(file, "utf8").trimEnd(), "");
  }

  return parts.join("\n") + "\n";
}
