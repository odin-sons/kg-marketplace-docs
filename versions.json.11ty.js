// Serves this build's own versions.js as real JSON at /versions.json.
// scripts/version-switcher.js fetches this from the canonical "latest docs"
// domain (not necessarily this build's own domain) so an old, already-
// deployed build's dropdown can still learn about versions released after
// it was built.
export const data = {
  permalink: "versions.json",
  eleventyExcludeFromCollections: true,
  // Raw JSON, not a doc page — opt out of the doc layout (which every page
  // gets by default via global data) and the title-from-markdown-heading
  // logic (which assumes `page.rawInput` is markdown text with a `.match`
  // method; a plain string here has one too, but it's not what should
  // become this file's <title>, so setting it explicitly short-circuits
  // that computed-data function entirely rather than fighting it).
  layout: false,
  title: "versions.json",
};

export default function (data) {
  return JSON.stringify(data.versions, null, 2);
}
