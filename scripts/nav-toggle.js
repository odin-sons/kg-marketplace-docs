(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  var current = nav.querySelector('a[aria-current="page"]');
  if (current) {
    // Deferred a frame to avoid forcing a layout mid-render (was a measured Lighthouse reflow).
    requestAnimationFrame(function () {
      current.scrollIntoView({ block: "nearest" });
    });
  }
})();
