(function () {
  var HIGHLIGHT_CLASS = "anchor-highlight";
  var HIGHLIGHT_DURATION = 2200;

  // Works for any #id on the page — every heading already has one (see
  // eleventy.config.js's IdAttributePlugin), and a handful of settings-table
  // rows carry an extra, empty <a id="..."> placed right before the setting
  // name specifically so a single row inside a much bigger table (like
  // Server config's) can be a real link target too.
  function targetForHighlight(el) {
    // An empty inline anchor has no visible box of its own to flash — flash
    // the table row it lives in instead, if it's in one.
    var row = el.closest("tr");
    return row || el;
  }

  function highlight(id) {
    if (!id) return;
    var el;
    try {
      el = document.getElementById(id);
    } catch (e) {
      return;
    }
    if (!el) return;

    var target = targetForHighlight(el);
    target.scrollIntoView({ behavior: "smooth", block: "center" });

    // Restart the animation even if this exact anchor was just highlighted
    // (e.g. clicking the same sidebar link twice) — removing the class,
    // forcing a reflow, then re-adding it is the standard way to do that.
    target.classList.remove(HIGHLIGHT_CLASS);
    void target.offsetWidth;
    target.classList.add(HIGHLIGHT_CLASS);

    window.clearTimeout(target._anchorHighlightTimeout);
    target._anchorHighlightTimeout = window.setTimeout(function () {
      target.classList.remove(HIGHLIGHT_CLASS);
    }, HIGHLIGHT_DURATION);
  }

  function highlightFromHash() {
    if (!location.hash) return;
    try {
      highlight(decodeURIComponent(location.hash.slice(1)));
    } catch (e) {}
  }

  highlightFromHash();
  window.addEventListener("hashchange", highlightFromHash);

  // A same-page link to the anchor you're already on doesn't fire
  // "hashchange" (the hash isn't changing), so re-clicking it would
  // otherwise do nothing — handle that click directly instead.
  document.addEventListener("click", function (event) {
    var link = event.target.closest('a[href*="#"]');
    if (!link) return;
    var hash = link.getAttribute("href").split("#")[1];
    if (hash && hash === location.hash.slice(1)) {
      highlight(decodeURIComponent(hash));
    }
  });
})();
