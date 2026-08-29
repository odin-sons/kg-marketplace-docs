import postcssImport from "postcss-import";
import postcssNormalize from "postcss-normalize";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import stylelint from "stylelint";
import postcssReporter from "postcss-reporter";

const isDevServer = process.env.ELEVENTY_RUN_MODE === "serve" || process.env.ELEVENTY_RUN_MODE === "watch";

export default {
  plugins: [
    ...(isDevServer ? [stylelint(), postcssReporter({ clearReportedMessages: true })] : []),
    postcssImport(postcssNormalize().postcssImport()),
    autoprefixer(),
    // forceMediaMerge is CSSO's own "unsafe but effective" option.
    csso({ restructure: true, forceMediaMerge: true, comments: false }),
  ],
};
