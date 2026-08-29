import postcssImport from "postcss-import";
import postcssNormalize from "postcss-normalize";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import stylelint from "stylelint";
import postcssReporter from "postcss-reporter";

// eleventy.config.js only sets ELEVENTY_RUN_MODE via Eleventy itself, so
// this is unset (falsy) if postcss.config.js is ever loaded outside an
// Eleventy build (e.g. a plain `npx postcss` invocation) — treated the same
// as a real build, i.e. lint stays off unless we're actually inside
// `eleventy --serve`/`--watch`.
const isDevServer = process.env.ELEVENTY_RUN_MODE === "serve" || process.env.ELEVENTY_RUN_MODE === "watch";

export default {
  plugins: [
    // Lint the CSS as actually authored, before anything below transforms
    // it — linting the post-autoprefixer/post-minify output would just
    // produce noise about code this file never wrote. Warnings only: this
    // is a postcss plugin, not the CLI, so it can only ever attach messages
    // to the result — nothing here can fail the build. Dev-server only
    // (see isDevServer above) — CI gets its own separate, also non-blocking
    // stylelint step (reviewdog) that comments on PRs instead; see
    // .github/workflows/deploy.yml.
    ...(isDevServer ? [stylelint(), postcssReporter({ clearReportedMessages: true })] : []),

    // Pulls in sanitize.css (see the `@import "sanitize.css";` at the top
    // of styles/site.css), trimmed to just the browsers listed in this
    // project's own browserslist (package.json). postcss-normalize's own
    // .postcssImport() returns a pre-configured postcss-import options
    // object — this exact nesting is its documented integration shape, not
    // an ad-hoc choice.
    postcssImport(postcssNormalize().postcssImport()),

    // Also browserslist-driven (package.json) — adds only the vendor
    // prefixes browsers in that list actually still need.
    autoprefixer(),

    // Minifies + restructures using CSSO, more aggressively than the
    // defaults: forceMediaMerge combines identical @media blocks that
    // aren't adjacent (CSSO's own docs call this "unsafe but effective" —
    // verified with before/after screenshots at desktop/tablet/mobile
    // widths before enabling, see the PR this shipped in), and comments
    // are stripped entirely since none of ours carry meaning at runtime.
    csso({ restructure: true, forceMediaMerge: true, comments: false }),
  ],
};
