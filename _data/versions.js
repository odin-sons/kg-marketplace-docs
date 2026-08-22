// Version manifest for the sidebar version switcher. Each entry is a mod
// version this documentation was built for, and the base URL of the
// deployment that covers it. `current: true` marks the version this exact
// build represents — its own `url` is "/" so the switcher still resolves
// correctly no matter which deployment (GitHub Pages, Cloudflare Pages, a
// Cloudflare preview for an older tag) happens to be serving this page.
//
// This file is both the per-build fallback AND, once THIS version is the
// one deployed to https://kg-marketplace.pages.dev (see CANONICAL_VERSIONS_URL
// in scripts/version-switcher.js), the live source every other build's
// dropdown fetches at /versions.json (see versions.json.11ty.js) to learn
// about versions released after they themselves were built.
//
// To cut a new version: tag the mod release, deploy that tag as its own
// build (e.g. a Cloudflare Pages branch/tag deployment gets its own URL
// automatically, no extra config needed), then here — change the current
// entry's `url` from "/" to that new deployment's real URL, drop its
// `current` flag, and add a fresh `{ version, url: "/", current: true }`
// entry for the version now being built. Once *this* change itself is
// deployed to the canonical domain, every older build's switcher picks up
// the new entry automatically.
export default [{ version: "9.8.8", url: "/", current: true }];
