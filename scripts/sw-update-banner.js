// Listens for the "content changed underneath you" message sw.js.11ty.js
// sends when a background revalidation finds this exact page (or another
// resource it's currently using) differs from what was served from cache —
// see that file for the caching/revalidation logic itself. Pure messaging/
// DOM here, no URL construction, so unlike the registration call in
// base.njk this doesn't need pathPrefix baked in — a plain passthrough file.
(function () {
  if (!("serviceWorker" in navigator)) return;

  navigator.serviceWorker.addEventListener("message", function (event) {
    if (event.data && event.data.type === "kg-docs-content-updated") showBanner();
  });

  function showBanner() {
    if (document.querySelector(".sw-update-banner")) return;

    var banner = document.createElement("div");
    banner.className = "sw-update-banner";
    banner.setAttribute("role", "status");

    var text = document.createElement("span");
    text.textContent = "A newer version of this page is available.";

    var button = document.createElement("button");
    button.type = "button";
    button.textContent = "Reload";
    button.addEventListener("click", function () {
      window.location.reload();
    });

    banner.appendChild(text);
    banner.appendChild(button);
    document.body.appendChild(banner);
  }
})();
