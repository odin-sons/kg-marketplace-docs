export const data = {
  permalink: "versions.json",
  eleventyExcludeFromCollections: true,
  layout: false,
  // Short-circuits the title-from-markdown-heading computed data, which otherwise assumes markdown.
  title: "versions.json",
};

export default function (data) {
  return JSON.stringify(data.versions, null, 2);
}
