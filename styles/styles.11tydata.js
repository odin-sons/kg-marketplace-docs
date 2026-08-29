// Without this, site.css's PostCSS output gets silently wrapped in the doc-page HTML layout.
export default {
  layout: false,
  eleventyExcludeFromCollections: true,
};
