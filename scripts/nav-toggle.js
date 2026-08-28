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

  // Bring the current page's own link into view within the (independently)
  // scrolling nav — there's no hash in the URL to drive a pure-CSS :target
  // scroll here, and CSS anchor positioning doesn't trigger scrolling at
  // all (it only positions one element relative to another). `block:
  // "nearest"` moves the list the minimum amount needed, so it's a no-op
  // whenever the link is already visible, and jumps instantly rather than
  // animating — this is correcting the initial position, not a user
  // interaction that calls for animated feedback.
  var current = nav.querySelector('a[aria-current="page"]');
  if (current) {
    // Deferred a frame: called synchronously during initial page load, this
    // forces a layout pass while the rest of the page is still rendering
    // (measured at ~63ms in Lighthouse's forced-reflow audit) — waiting for
    // the next frame lets that first render complete undisturbed first.
    requestAnimationFrame(function () {
      current.scrollIntoView({ block: "nearest" });
    });
  }
})();
