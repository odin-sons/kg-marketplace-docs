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
