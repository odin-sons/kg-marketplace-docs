import fs from "node:fs";
import path from "node:path";
import { InputPathToUrlTransformPlugin, IdAttributePlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { slug as githubSlug } from "github-slugger";
import postcss from "postcss";
import { AI_PROVIDER_ICONS, COPY_ICON, VIEW_MARKDOWN_ICON } from "./ai-provider-icons.js";
import { loadIcon } from "./svg-icons.js";
import postcssConfig from "./postcss.config.js";

const SIDEBAR_TOGGLE_ICON = await loadIcon("chevron-left.svg");

const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || "/";
const editBranch = process.env.ELEVENTY_GIT_BRANCH || "main";
const isArchivedVersion = process.env.ELEVENTY_ARCHIVED_VERSION === "true";

if (!process.env.ELEVENTY_CANONICAL_ORIGIN) {
  throw new Error("ELEVENTY_CANONICAL_ORIGIN must be set — see package.json's start/serve scripts (local) or deploy.yml (CI)");
}
const CANONICAL_ORIGIN = process.env.ELEVENTY_CANONICAL_ORIGIN;

const AI_PROVIDERS = [
  { name: "ChatGPT", prefillUrl: (prompt) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}` },
  { name: "Perplexity", prefillUrl: (prompt) => `https://www.perplexity.ai/?q=${encodeURIComponent(prompt)}` },
  { name: "Grok", prefillUrl: (prompt) => `https://grok.com/?q=${encodeURIComponent(prompt)}` },
  { name: "DeepSeek", prefillUrl: (prompt) => `https://chat.deepseek.com/?q=${encodeURIComponent(prompt)}` },
  { name: "Google AI Studio", prefillUrl: (prompt) => `https://aistudio.google.com/apps?prompt=${encodeURIComponent(prompt)}` },
  { name: "Claude Desktop", prefillUrl: (prompt) => `claude://claude.ai/new?q=${encodeURIComponent(prompt)}` },
].map((provider) => ({ ...provider, icon: AI_PROVIDER_ICONS[provider.name] }));

export const MARKDOWN_CONTENT_DIRS = ["api", "assets", "concepts", "configs", "guides", "npc", "reference", "setup", "tooling"];

// Not dir/slug.md — collides with InputPathToUrlTransformPlugin rewriting the link back to the HTML page.
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
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("icons");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("manifest.json");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("reference/translations.English.yml");

  // Both are real entry points (not one @import-ing the other) — site.css is
  // the blocking, above-the-fold stylesheet; deferred.css (loaded via a
  // media="print" swap in base.njk) is everything else.
  const CSS_ENTRY_POINTS = ["./styles/site.css", "./styles/deferred.css"];
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async (inputContent, inputPath) => {
      if (!CSS_ENTRY_POINTS.includes(inputPath)) return;

      return async () => {
        const result = await postcss(postcssConfig.plugins).process(inputContent, { from: inputPath });
        return result.css;
      };
    },
  });

  eleventyConfig.addPassthroughCopy(markdownPassthroughMap());

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["avif", "webp", "jpeg"],
    widths: [400, 800, 1600],
    urlPath: "/img/",
    outputDir: ".cache/@11ty/img/",
    sharpAvifOptions: { quality: 60 },
    sharpWebpOptions: { quality: 82 },
    sharpJpegOptions: { quality: 82 },
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
        // Must live here, not as a top-level option — silently ignored otherwise.
        sizes: "(max-width: 900px) 100vw, 796px",
      },
    },
  });

  eleventyConfig.addTransform("prioritize-first-in-content-image", function (content) {
    const main = content.match(/<main\b[^>]*>[\s\S]*?<\/main>/);
    if (!main) return content;

    const picture = main[0].match(/<picture\b[^>]*>[\s\S]*?<\/picture>/);
    if (!picture) return content;

    let firstImageSeen = false;
    const updatedPicture = picture[0].replace(/<img\b[^>]*>/, (tag) => {
      firstImageSeen = true;
      return tag.replace('loading="lazy"', 'loading="eager" fetchpriority="high"');
    });
    if (!firstImageSeen) return content;

    const getAttr = (tag, name) => {
      const match = tag.match(new RegExp(`\\b${name}="([^"]*)"`));
      return match ? match[1] : null;
    };
    const firstSource = picture[0].match(/<source\b[^>]*>/);
    const preloadLink = (() => {
      if (!firstSource) return null;
      const type = getAttr(firstSource[0], "type");
      const srcset = getAttr(firstSource[0], "srcset");
      const sizes = getAttr(firstSource[0], "sizes");
      if (!type || !srcset) return null;
      return `<link rel="preload" as="image" type="${type}" imagesrcset="${srcset}"${sizes ? ` imagesizes="${sizes}"` : ""} fetchpriority="high">`;
    })();

    const updatedMain = main[0].replace(picture[0], updatedPicture);
    let updatedContent = content.slice(0, main.index) + updatedMain + content.slice(main.index + main[0].length);
    if (preloadLink) {
      updatedContent = updatedContent.replace("<head>", `<head>\n  ${preloadLink}`);
    }
    return updatedContent;
  });

  eleventyConfig.on("eleventy.after", () => {
    if (!fs.existsSync(".cache/@11ty/img/")) return;
    fs.cpSync(".cache/@11ty/img/", path.join(eleventyConfig.directories.output, "img"), {
      recursive: true,
    });
  });

  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

  // githubSlug matches GitHub's own heading-anchor algorithm — anchors were hand-authored assuming it.
  eleventyConfig.addPlugin(IdAttributePlugin, {
    slugify: githubSlug,
  });

  eleventyConfig.addGlobalData("layout", "layouts/doc.njk");

  eleventyConfig.addGlobalData("copyIcon", COPY_ICON);
  eleventyConfig.addGlobalData("viewMarkdownIcon", VIEW_MARKDOWN_ICON);
  eleventyConfig.addGlobalData("sidebarToggleIcon", SIDEBAR_TOGGLE_ICON);

  eleventyConfig.addGlobalData("pagefindBundlePath", pathPrefix + "pagefind/");
  eleventyConfig.addGlobalData("pagefindBaseUrl", pathPrefix);

  eleventyConfig.addGlobalData("swPath", pathPrefix + "sw.js");

  eleventyConfig.addGlobalData("buildId", process.env.ELEVENTY_BUILD_ID || String(Date.now()));

  eleventyConfig.addGlobalData("eleventyComputed.permalink", () => {
    return (data) => {
      if (data.page?.inputPath === "./README.md") return "index.html";
      return data.permalink;
    };
  });

  eleventyConfig.addGlobalData("eleventyComputed.title", () => {
    return (data) => {
      if (data.title) return data.title;
      const match = data.page?.rawInput?.match(/^#\s+(.+?)\s*$/m);
      return match ? match[1] : data.page.fileSlug;
    };
  });

  eleventyConfig.addGlobalData("eleventyComputed.canonicalUrl", () => {
    return (data) => (isArchivedVersion ? undefined : CANONICAL_ORIGIN + data.page.url);
  });

  eleventyConfig.addGlobalData("noIndex", isArchivedVersion);

  eleventyConfig.addGlobalData("editBranch", editBranch);

  eleventyConfig.addGlobalData("eleventyComputed.navWithState", () => {
    return (data) => {
      const isCurrent = (href) => href === data.page.url;
      return (data.nav || []).map((group) => {
        const items = group.items.map((item) => {
          const childActive = (item.children || []).some((child) => isCurrent(child.href));
          return { ...item, active: isCurrent(item.href) || childActive };
        });
        return { ...group, items, active: items.some((item) => item.active) };
      });
    };
  });

  eleventyConfig.addGlobalData(
    "siteDescription",
    "Marketplace and Server NPCs (Revamped) adds server-configurable NPCs and mechanics to Valheim — a player-to-player marketplace, shops, quests, dialogue trees, zones, banking, gambling, transmog, and more."
  );

  eleventyConfig.addGlobalData("eleventyComputed.markdownUrl", () => {
    return (data) => {
      const inputPath = data.page?.inputPath ?? "";
      if (inputPath === "./README.md") return "/index.md";

      const topDir = inputPath.replace(/^\.\//, "").split("/")[0];
      if (!MARKDOWN_CONTENT_DIRS.includes(topDir)) return undefined;

      return data.page.url + "index.md";
    };
  });

  eleventyConfig.addGlobalData("eleventyComputed.aiPrompt", () => {
    return (data) => {
      if (!data.markdownUrl) return undefined;
      return `Read this Marketplace and Server NPCs (Revamped) documentation page and help me with it: ${data.canonicalUrl}`;
    };
  });

  eleventyConfig.addGlobalData("eleventyComputed.aiLinks", () => {
    return (data) => {
      if (!data.aiPrompt) return undefined;
      return AI_PROVIDERS.map((provider) => ({
        name: provider.name,
        url: provider.prefillUrl(data.aiPrompt),
        icon: provider.icon,
      }));
    };
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: process.env.ELEVENTY_OUTPUT_DIR || "_site",
    },
    pathPrefix,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
