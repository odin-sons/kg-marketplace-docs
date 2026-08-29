export const data = {
  permalink: "sw.js",
  eleventyExcludeFromCollections: true,
  layout: false,
  title: "sw.js",
};

export default function (data) {
  const CACHE_NAME = `docs-${data.buildId}`;
  const HASHED_ASSET = /\/img\/[^/]+\.(?:avif|webp|jpe?g|png)$/;

  return `// Auto-generated for build ${data.buildId} — do not edit by hand.
const CACHE_NAME = ${JSON.stringify(CACHE_NAME)};
const HASHED_ASSET = ${HASHED_ASSET.toString()};

self.addEventListener("install", () => {
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
  if (url.origin !== self.location.origin) return;

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) {
    if (!HASHED_ASSET.test(new URL(request.url).pathname)) {
      // Cloned here, before either copy is touched — cached is also handed to the browser
      // below via the return, and cloning after that race loses sometimes ("Response body
      // is already used"), confirmed live in production.
      revalidate(request, cached.clone(), cache);
    }
    return cached;
  }

  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function revalidate(request, cachedResponse, cache) {
  let fresh;
  try {
    fresh = await fetch(request);
  } catch {
    return;
  }
  if (!fresh.ok) return;

  const [freshText, cachedText] = await Promise.all([fresh.clone().text(), cachedResponse.text()]);
  if (freshText === cachedText) return;

  await cache.put(request, fresh);

  const clients = await self.clients.matchAll({ type: "window" });
  for (const client of clients) {
    if (client.url === request.url) client.postMessage({ type: "kg-docs-content-updated", url: request.url });
  }
}
`;
}
