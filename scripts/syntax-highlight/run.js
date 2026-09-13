// Custom Highlight API isn't universal yet — code blocks stay plain, unstyled
// text where it's missing, same as before this feature existed.
if ("highlights" in CSS) {
  import("/scripts/syntax-highlight/highlight.js").then(({ highlightAll }) => highlightAll());
}
