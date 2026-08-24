import fs from "node:fs";
import path from "node:path";
import { InputPathToUrlTransformPlugin, IdAttributePlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { slug as githubSlug } from "github-slugger";
import { AI_PROVIDER_ICONS, COPY_ICON, VIEW_MARKDOWN_ICON } from "./ai-provider-icons.js";
import { loadIcon } from "./svg-icons.js";

const SIDEBAR_TOGGLE_ICON = await loadIcon("chevron-left.svg");

// "/" for Cloudflare Pages (served at the canonical domain's root) and local
// dev; "/kg-marketplace-docs/" for the GitHub Pages mirror, which — as a
// project page rather than a user/org page — is served under a subpath.
// The build in .github/workflows/deploy.yml runs twice, once per target,
// setting this env var only for the GitHub Pages pass.
const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || "/";

// The domain every page's <link rel="canonical"> points at, on both mirrors
// alike — matches CANONICAL_VERSIONS_URL in scripts/version-switcher.js and
// the default in sitemap.xml.11ty.js/robots.txt.11ty.js. Unlike pathPrefix
// this never varies per build: canonical's whole job is naming the one
// preferred URL among duplicates, so both mirrors must agree on the same one.
const CANONICAL_ORIGIN = "https://kg-marketplace.pages.dev";

// Providers with a documented, currently-working "open with prefilled
// prompt" URL, checked directly against each one rather than assumed — this
// class of URL trick tends to get pulled without notice (claude.ai's own web
// `?q=` was removed in Oct 2025). Kept as a flat list specifically so adding
// or dropping a provider later is a one-line change, not a template edit.
//
// Claude has no *web* prefill param, but does have a documented Desktop
// deep-link scheme (same one Mintlify's own "Open in Claude" button uses):
// claude://claude.ai/new?q=<prompt>, capped around 14,000 characters, all
// values URL-encoded. It only does anything if Claude Desktop is installed
// and registered as the protocol handler — silently inert otherwise, and
// even when it works, Claude's own UI flags the prefilled text as
// externally-sourced (expected: the same protection stops a malicious page
// from quietly seeding a conversation) — so `copyPromptFirst` stays on too,
// a free safety net for visitors without the desktop app.
//
// Gemini itself (gemini.google.com) has no equivalent at all, on the web or
// via a desktop scheme — matches Mintlify's own reference implementation,
// which doesn't offer a Gemini option either. It offers Google AI Studio
// instead (a separate, developer-facing product built on the same models),
// and that one does have a working, if undocumented, prefill param —
// confirmed by hand: aistudio.google.com/apps?prompt=<prompt> lands with the
// prompt already in the box. So AI Studio's the one linked here, not Gemini.
const AI_PROVIDERS = [
  { name: "ChatGPT", prefillUrl: (prompt) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}` },
  { name: "Perplexity", prefillUrl: (prompt) => `https://www.perplexity.ai/?q=${encodeURIComponent(prompt)}` },
  { name: "Grok", prefillUrl: (prompt) => `https://grok.com/?q=${encodeURIComponent(prompt)}` },
  {
    name: "Claude",
    prefillUrl: (prompt) => `claude://claude.ai/new?q=${encodeURIComponent(prompt)}`,
    copyPromptFirst: true,
    copyPromptHint: "Opens the prompt directly in Claude Desktop if you have it installed. Also copies it to your clipboard either way, just in case.",
  },
  { name: "Google AI Studio", prefillUrl: (prompt) => `https://aistudio.google.com/apps?prompt=${encodeURIComponent(prompt)}` },
].map((provider) => ({ ...provider, icon: AI_PROVIDER_ICONS[provider.name] }));

// Content directories that get a raw-markdown passthrough copy (see below) —
// also drives which pages get a rel=alternate markdown link, since that link
// would 404 for any page outside this list. Kept in sync with the same list
// nav.js documents at the top of that file. Exported (rather than kept
// module-private like everything else here) so llms-full.txt.11ty.js can
// walk the same set of source files without a second hand-maintained list.
export const MARKDOWN_CONTENT_DIRS = ["api", "assets", "concepts", "configs", "guides", "npc", "reference", "setup", "tooling"];

// Maps every content .md source to <its page's own output folder>/index.md
// — e.g. configs/quests.md -> configs/quests/index.md, sibling to that
// page's index.html — rather than a same-named configs/quests.md sibling.
// The obvious-looking sibling name collides with a completely different
// Eleventy feature: InputPathToUrlTransformPlugin (below) rewrites *any*
// href/src across the whole site that matches a real template's source
// path, including inside a <link> tag we control — so a raw-markdown link
// literally named after its own source file kept getting "corrected" back
// to that same page's HTML URL. Nothing under content-dir/slug/index.md
// exists as a real template source, so nothing matches and it's left alone.
function markdownPassthroughMap() {
  const map = { "README.md": "index.md" };
  for (const dir of MARKDOWN_CONTENT_DIRS) {
    for (const entry of fs.readdirSync(dir, { recursive: true })) {
      if (!entry.endsWith(".md")) continue;
      map[`${dir}/${entry}`] = `${dir}/${entry.slice(0, -3)}/index.md`;
    }
  }
  return map;
}

export default function (eleventyConfig) {
  // Rewrites every root-relative href/src/srcset in the rendered HTML output
  // (nav links, the stylesheet, script tags, favicons, eleventy-img output,
  // manifest link, etc.) to carry pathPrefix — a no-op when pathPrefix is
  // "/", so this is safe to always enable rather than only for the GitHub
  // Pages build.
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("icons");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("manifest.json");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("reference/translations.English.yml");

  // Raw markdown copy for every doc page (e.g. /configs/quests/index.md next
  // to that page's own index.html), untouched — same file an agent (or
  // another tool) would see reading the source directly. See
  // markdownPassthroughMap's own comment for why the output path isn't just
  // configs/quests.md.
  eleventyConfig.addPassthroughCopy(markdownPassthroughMap());

  // Runs on every rendered <img>/<picture> and replaces it with an
  // optimized, modern-format version, resized to how large it's actually
  // ever displayed (Web Vitals "properly size images": don't ship pixels
  // the layout throws away). `.doc` content sits in a column capped at
  // `--max-content-width: 860px` (≈796px of actual image width once the
  // column's own padding is subtracted) down to 100vw once the sidebar
  // drops out at the 900px breakpoint — see styles/site.css — so `sizes`
  // mirrors that, and `widths` covers narrow mobile / that column width /
  // that column width at 2x for sharp rendering on high-DPI screens.
  // eleventy-img never upscales past a source's natural resolution, so a
  // screenshot already narrower than a given width just skips that variant.
  // A handful of images that DON'T follow the shared column layout (the nav
  // logo, currently) override this per-<img> via `eleventy:widths`/`sizes`
  // attributes, which take precedence over these defaults.
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp", "jpeg"],
    widths: [400, 800, 1600],
    // Without an explicit urlPath, the plugin colocates each generated image
    // next to the page that references it (and, for the homepage specifically,
    // directly at the site root next to index.html) — centralizing everything
    // under one folder instead keeps every page's own output directory clean.
    urlPath: "/img/",
    // eleventy-img decides whether to re-encode an image by checking if its
    // *output file* already exists on disk (see disk-cache.js in the
    // package) — pointing that at dir.output directly means every build
    // starts from an empty folder and reprocesses every image from scratch,
    // which is most of what made CI builds slow. Writing through .cache
    // instead — persisted across both the pathPrefix passes in a single job
    // and across CI runs via actions/cache (deploy.yml) — means a build only
    // ever pays to encode an image whose content actually changed; the
    // eleventy.after hook below then copies what's cached into this run's
    // real output directory.
    outputDir: ".cache/@11ty/img/",
    sharpAvifOptions: { quality: 60 },
    sharpWebpOptions: { quality: 82 },
    sharpJpegOptions: { quality: 82 },
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
        // `sizes` has to live here (an `imgAttributes` default), not as a
        // top-level plugin option — that key doesn't exist and is silently
        // ignored, which left `sizes` unset and made the plugin's own
        // `loading="lazy"` fallback kick in instead (`sizes="auto"`, a real
        // but Chromium-only value; Firefox/Safari treat it as invalid and
        // fall back to 100vw, i.e. always fetch the largest candidate —
        // exactly the oversized-image problem this is meant to avoid).
        sizes: "(max-width: 900px) 100vw, 796px",
      },
    },
  });

  eleventyConfig.on("eleventy.after", () => {
    // Guards a build with no local <img>/<picture> ever having been
    // encountered (nothing to copy yet) — without this, a first build on a
    // fresh checkout, or an environment where the OS/AV/sync client is slow
    // to settle a just-created directory, throws ENOENT here instead.
    if (!fs.existsSync(".cache/@11ty/img/")) return;
    fs.cpSync(".cache/@11ty/img/", path.join(eleventyConfig.directories.output, "img"), {
      recursive: true,
    });
  });

  // Rewrites internal links that point at another source file — e.g.
  // `[Quests](../configs/quests.md)`, written so they still resolve when the
  // files are read directly (GitHub, another tool) — into that file's actual
  // built URL (`/configs/quests/`). Built into Eleventy 3+; resolves relative
  // to the linking file's own path, preserves `#anchor`/`?query`, and leaves
  // external links and unresolvable paths untouched.
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

  // Adds heading `id`s (deep-link anchors), built into Eleventy 3+. Its own
  // default slugify differs from GitHub's on punctuation (e.g. it keeps
  // apostrophes and %-encodes colons) — the corpus's internal anchor links
  // were hand-authored assuming GitHub's exact algorithm, so github-slugger
  // is swapped in as the slugify function. The plugin already dedupes
  // same-page heading collisions itself, so the stateless `slug()` export is
  // used rather than the stateful class (which would otherwise keep counting
  // across every page in the whole build instead of per page).
  eleventyConfig.addPlugin(IdAttributePlugin, {
    slugify: githubSlug,
  });

  // Every content page uses the same layout — set once here instead of a
  // repeated *.11tydata.js in each content directory.
  eleventyConfig.addGlobalData("layout", "layouts/doc.njk");

  // Static (not per-page computed) — the "Copy"/"View as Markdown" icons in
  // doc.njk's ai-actions menu never vary, unlike the per-provider icons
  // above which ride along with aiLinks.
  eleventyConfig.addGlobalData("copyIcon", COPY_ICON);
  eleventyConfig.addGlobalData("viewMarkdownIcon", VIEW_MARKDOWN_ICON);
  eleventyConfig.addGlobalData("sidebarToggleIcon", SIDEBAR_TOGGLE_ICON);

  // Pagefind's own JS/wasm/index chunks and its search-result URLs both need
  // this build's pathPrefix — it indexes this build's own output directory
  // with no knowledge of which subpath it'll actually be served under.
  eleventyConfig.addGlobalData("pagefindBundlePath", pathPrefix + "pagefind/");
  eleventyConfig.addGlobalData("pagefindBaseUrl", pathPrefix);

  // The root README.md becomes the homepage (/index.html) instead of the
  // default /README/index.html — every other page keeps Eleventy's normal
  // per-file permalink, since returning the untouched `data.permalink` here
  // (usually undefined) leaves Eleventy's default behavior in place for them.
  eleventyConfig.addGlobalData("eleventyComputed.permalink", () => {
    return (data) => {
      if (data.page?.inputPath === "./README.md") return "index.html";
      return data.permalink;
    };
  });

  // Every doc page opens with a plain `# Title` line and carries no front
  // matter — derive <title> from that instead of duplicating it as data.
  eleventyConfig.addGlobalData("eleventyComputed.title", () => {
    return (data) => {
      if (data.title) return data.title; // explicit override, if ever set
      const match = data.page?.rawInput?.match(/^#\s+(.+?)\s*$/m);
      return match ? match[1] : data.page.fileSlug;
    };
  });

  // Fed to <link rel="canonical"> in base.njk — always the same domain on
  // both mirrors (see CANONICAL_ORIGIN above), computed here rather than in
  // the template so base.njk only ever renders a value, never derives one.
  eleventyConfig.addGlobalData("eleventyComputed.canonicalUrl", () => {
    return (data) => CANONICAL_ORIGIN + data.page.url;
  });

  // Fed to <link rel="alternate" type="text/markdown"> in base.njk — the
  // root-relative path to this page's raw-markdown passthrough copy (see
  // above), left undefined for any page outside MARKDOWN_CONTENT_DIRS (e.g.
  // .github/PULL_REQUEST_TEMPLATE, which Eleventy also happens to render as
  // a page but which never gets an .md copy), so the template can just skip
  // the tag rather than link to a 404.
  eleventyConfig.addGlobalData("eleventyComputed.markdownUrl", () => {
    return (data) => {
      const inputPath = data.page?.inputPath ?? "";
      if (inputPath === "./README.md") return "/index.md";

      const topDir = inputPath.replace(/^\.\//, "").split("/")[0];
      if (!MARKDOWN_CONTENT_DIRS.includes(topDir)) return undefined;

      return data.page.url + "index.md";
    };
  });

  // Fed to the "Open in <AI>" bar in doc.njk — undefined wherever
  // markdownUrl is (no raw-markdown copy means nothing to point an agent
  // at), computed here so the template just loops a ready-made list rather
  // than building URLs or encoding a prompt itself.
  eleventyConfig.addGlobalData("eleventyComputed.aiLinks", () => {
    return (data) => {
      if (!data.markdownUrl) return undefined;
      const prompt = `Read this Marketplace and Server NPCs (Revamped) documentation page and help me with it: ${data.canonicalUrl}`;
      return AI_PROVIDERS.map((provider) => ({
        name: provider.name,
        url: provider.prefillUrl(prompt),
        icon: provider.icon,
        copyPrompt: provider.copyPromptFirst ? prompt : undefined,
        copyPromptHint: provider.copyPromptHint,
      }));
    };
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      // Also parameterized so the two pathPrefix passes (see above) can
      // build to separate output folders without clobbering each other.
      output: process.env.ELEVENTY_OUTPUT_DIR || "_site",
    },
    pathPrefix,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
