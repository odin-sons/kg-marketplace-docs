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
// that; its lower-level Image/queueImage API could in principle be coaxed
// into returning a buffer without emitting HTML, but it's still built
// around writing a real output file for its own disk-cache to check
// against, and its default SVG format hook (format-hooks/svg.js in the
// package) doesn't run SVGO anyway — just a byte-for-byte passthrough. So
// this is a small parallel step, not a second use of that plugin — but the
// *caching* underneath doesn't need to be hand-rolled: @11ty/eleventy-fetch
// (already a transitive dependency of eleventy-img, added here as a direct
// one) ships AssetCache, a general "cache this value on disk, keyed by its
// own content" utility with no HTTP involved — exactly this problem,
// already written and tested.
import fs from "node:fs";
import path from "node:path";
import { optimize } from "svgo";
import EleventyFetch from "@11ty/eleventy-fetch";

const { AssetCache } = EleventyFetch;

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

async function optimizeIcon(filename) {
  const raw = fs.readFileSync(path.join(SOURCE_DIR, filename), "utf8");

  // The source content itself is the cache key (AssetCache hashes it), so
  // an edited icon naturally invalidates its own entry — "*" duration
  // means a hit never expires on its own, only a content change moves it.
  const asset = new AssetCache(raw, CACHE_DIR);
  if (asset.isCacheValid("*")) {
    return asset.getCachedValue();
  }

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
