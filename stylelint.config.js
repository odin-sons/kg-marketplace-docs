// Shared by both lint paths: the dev-server-only postcss plugin in
// postcss.config.js, and the CI-only reviewdog step in
// .github/workflows/deploy.yml — one config, so the rules a contributor
// sees locally while editing are the same ones CI comments on in the PR.
export default {
  extends: "stylelint-config-standard",
};
