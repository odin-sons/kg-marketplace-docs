// Templated (not a static passthrough file) so the cache name below can
// carry this build's own buildId (see eleventy.config.js) — that's what
// makes the browser detect a real update: a new build means different
// bytes for this exact file, which is the one signal service workers
// actually watch for.
export const data = {
  permalink: "sw.js",
  eleventyExcludeFromCollections: true,
  layout: false,
  title: "sw.js",
};

export default function (data) {
  const CACHE_NAME = `docs-${data.buildId}`;

  // eleventy-img output (see eleventy.config.js) — content-hashed filenames,
  // so the URL itself changes whenever the image does. Safe to cache
  // forever with no revalidation: there's no such thing as a stale hit.
  const HASHED_ASSET = /\/img\/[^/]+\.(?:avif|webp|jpe?g|png)$/;

  // base.njk preloads this one via <link rel="preload" as="style"
  // onload="...rel='stylesheet'">, not a plain <link rel="stylesheet"> —
  // that trick depends on the browser's own preload cache recognizing the
  // later stylesheet load as the same request its scanner already fetched.
  // A service worker sits in between and answers with its own Response
  // object even when the bytes are identical, which breaks that
  // correlation — confirmed live as Edge's own "cross-world service worker
  // resource mismatch" warning. Any future resource using this same
  // preload+swap technique needs the same exclusion; today this is the
  // only one.
  const PRELOAD_SWAPPED_ASSET = /\/pagefind\/pagefind-component-ui\.css$/;

  return `// Auto-generated for build ${data.buildId} — do not edit by hand.
const CACHE_NAME = ${JSON.stringify(CACHE_NAME)};
const HASHED_ASSET = ${HASHED_ASSET.toString()};
const PRELOAD_SWAPPED_ASSET = ${PRELOAD_SWAPPED_ASSET.toString()};

self.addEventListener("install", () => {
  // Take over immediately rather than waiting for every open tab with the
  // previous worker to close — the per-resource update banner (see
  // scripts/sw-update-banner.js) is what actually tells a visitor content
  // changed, so there's nothing gained by delaying activation on top of
  // that.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // cross-origin (e.g. the version switcher's own /versions.json fetch to the canonical domain) — leave alone, no CORS guarantee to safely cache an opaque response.
  if (PRELOAD_SWAPPED_ASSET.test(url.pathname)) return; // see its own comment above — let the browser handle this one natively.

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) {
    // Cache-first for speed, but for anything that *can* change (i.e. not
    // a content-hashed asset) kick off a background revalidation — don't
    // await it, the cached response has already been returned below.
    if (!HASHED_ASSET.test(new URL(request.url).pathname)) {
      revalidate(request, cached, cache);
    }
    return cached;
  }

  // Not cached yet — this is the "cache on first fetch" half: no attempt
  // to pre-populate the whole site, just cache whatever actually gets
  // requested, the moment it's requested.
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function revalidate(request, cachedResponse, cache) {
  let fresh;
  try {
    fresh = await fetch(request);
  } catch {
    return; // offline right now — the cached copy already served is fine as-is.
  }
  if (!fresh.ok) return;

  const [freshText, cachedText] = await Promise.all([fresh.clone().text(), cachedResponse.clone().text()]);
  if (freshText === cachedText) return;

  await cache.put(request, fresh);

  // Only the clients actually displaying this exact URL care that it
  // changed underneath them — everyone else just gets the fresher cache
  // entry silently, next time they ask for it.
  const clients = await self.clients.matchAll({ type: "window" });
  for (const client of clients) {
    if (client.url === request.url) client.postMessage({ type: "kg-docs-content-updated", url: request.url });
  }
}
`;
}
