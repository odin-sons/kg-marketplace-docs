(function () {
  if (!("serviceWorker" in navigator)) return;

  // The actual message listener lives in base.njk's inline head script, which runs before
  // this (deferred) script can — it calls window.__kgShowSwUpdateBanner directly once this
  // has loaded, or sets __kgSwUpdatePending if the message arrived first.
  window.__kgShowSwUpdateBanner = showBanner;
  if (window.__kgSwUpdatePending) showBanner();

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
