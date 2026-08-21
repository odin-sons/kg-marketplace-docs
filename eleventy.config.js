import { InputPathToUrlTransformPlugin, IdAttributePlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { slug as githubSlug } from "github-slugger";

// "/" for Cloudflare Pages (served at the canonical domain's root) and local
// dev; "/kg-marketplace-docs/" for the GitHub Pages mirror, which — as a
// project page rather than a user/org page — is served under a subpath.
// The build in .github/workflows/deploy.yml runs twice, once per target,
// setting this env var only for the GitHub Pages pass.
const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || "/";

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
