// Directory data file (Eleventy convention: named after its own folder) —
// opts everything under styles/ out of the sitewide default layout
// (eleventyConfig.addGlobalData("layout", ...) in eleventy.config.js), the
// same way sw.js.11ty.js opts itself out via its own `data` export. Without
// this, site.css's PostCSS output gets wrapped in the doc-page HTML layout
// like any other content page — the CSS pipeline still "succeeds", it just
// silently produces an HTML file instead of a stylesheet.
export default {
  layout: false,
  eleventyExcludeFromCollections: true,
};
