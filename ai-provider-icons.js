// SVGO-optimized, inline icons for doc.njk's ai-actions dropdown. Stays
// inline (not <img src>) so fill/stroke="currentColor" can inherit
// .ai-actions__icon's CSS color. Sources live in icons-src/.
import fs from "node:fs";
import path from "node:path";
import { optimize } from "svgo";
import { AssetCache } from "@11ty/eleventy-fetch";

const SOURCE_DIR = "icons-src";
const CACHE_DIR = ".cache/svgo";

/** @type {import("svgo").Config} */
const SVGO_CONFIG = {
  // Sizing lives in CSS only — removeDimensions strips width/height so
  // there's no second, possibly-disagreeing source of truth.
  plugins: ["preset-default", "removeDimensions"],
};

async function optimizeIcon(filename) {
  const raw = fs.readFileSync(path.join(SOURCE_DIR, filename), "utf8");

  const asset = new AssetCache(raw, CACHE_DIR);
  if (asset.isCacheValid("*")) return asset.getCachedValue();

  const { data } = optimize(raw, SVGO_CONFIG);
  await asset.save(data, "text");
  return data;
}

const [chatgpt, perplexity, grok, claude, gemini, copyIcon, viewMarkdownIcon] = await Promise.all([
  optimizeIcon("chatgpt.svg"),
  optimizeIcon("perplexity.svg"),
  optimizeIcon("grok.svg"),
  optimizeIcon("claude.svg"),
  optimizeIcon("gemini.svg"),
  optimizeIcon("copy.svg"),
  optimizeIcon("view-markdown.svg"),
]);

export const AI_PROVIDER_ICONS = {
  ChatGPT: chatgpt,
  Perplexity: perplexity,
  Grok: grok,
  Claude: claude,
  Gemini: gemini,
};

export const COPY_ICON = copyIcon;
export const VIEW_MARKDOWN_ICON = viewMarkdownIcon;
