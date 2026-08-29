export default {
  extends: "stylelint-config-standard",
  rules: {
    // Project uses BEM (block__element--modifier) throughout.
    "selector-class-pattern": "^[a-z0-9]+(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$",
    // postcss-csso (our minifier) can't parse the modern range syntax this rule wants — keep min-width/max-width.
    "media-feature-range-notation": "prefix",
  },
};
