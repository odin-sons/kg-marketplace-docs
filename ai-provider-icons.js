// Loads, SVGO-optimizes, and inlines the icons for the ai-actions dropdown
// (doc.njk, via eleventyComputed.aiLinks/copyIcon/viewMarkdownIcon in
// eleventy.config.js). Source SVGs live in icons-src/, untouched upstream
// geometry — see each file's own header for where it came from.
//
// These have to end up as literal inline <svg> markup in the page (not an
// <img src>) so fill/stroke="currentColor" can inherit .ai-actions__icon's
// CSS color — that's what makes the icons follow the muted color and
// dark/light theme automatically. eleventy-img's own <img>-tag transform
// pipeline (already used elsewhere in this file for screenshots) writes a
// separate output file with a baked-in color instead, which would defeat
// that — so this is a small parallel build step rather than a second use
// of that plugin. Its default SVG format hook (format-hooks/svg.js in the
// package) doesn't run SVGO either, for what it's worth: by default it's a
// byte-for-byte passthrough, just with eleventy-img's own disk-cache
// wrapped around it — there's no built-in SVG optimization to opt into.
//
// The optimize-and-cache step below is the same idea applied to inline
// SVGs specifically: content-hash the source, skip re-running SVGO if a
// cached optimized copy already exists on disk. Unlike the screenshot
// cache this isn't fixing a measured slowdown — SVGO on seven small icons
// finishes in low single-digit milliseconds regardless — it's here mainly
// so the pattern matches (and so a much larger icon set later wouldn't
// need revisiting this file).
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { optimize } from "svgo";

const SOURCE_DIR = "icons-src";
const CACHE_DIR = ".cache/svgo";

const SVGO_CONFIG = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          // Every icon is sized via CSS (.ai-actions__icon svg), not a
          // fixed pixel box, so the viewBox has to survive — removing it
          // is preset-default's default behavior whenever width/height are
          // also present, which every source file here has.
          removeViewBox: false,
        },
      },
    },
    // Strips width/height so sizing has exactly one source of truth (the
    // CSS rule) instead of two that could disagree.
    "removeDimensions",
  ],
};

function optimizeIcon(filename) {
  const sourcePath = path.join(SOURCE_DIR, filename);
  const raw = fs.readFileSync(sourcePath, "utf8");

  const cacheKey = crypto.createHash("sha1").update(raw).digest("hex");
  const cachePath = path.join(CACHE_DIR, `${cacheKey}.svg`);

  if (fs.existsSync(cachePath)) {
    return fs.readFileSync(cachePath, "utf8");
  }

  const { data } = optimize(raw, SVGO_CONFIG);

  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(cachePath, data, "utf8");

  return data;
}

export const AI_PROVIDER_ICONS = {
  ChatGPT: optimizeIcon("chatgpt.svg"),
  Perplexity: optimizeIcon("perplexity.svg"),
  Grok: optimizeIcon("grok.svg"),
  Claude: optimizeIcon("claude.svg"),
  Gemini: optimizeIcon("gemini.svg"),
};

export const COPY_ICON = optimizeIcon("copy.svg");
export const VIEW_MARKDOWN_ICON = optimizeIcon("view-markdown.svg");
