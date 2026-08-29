(function () {
  var HIGHLIGHT_CLASS = "anchor-highlight";
  var HIGHLIGHT_DURATION = 2200;

  function targetForHighlight(el) {
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

    target.classList.remove(HIGHLIGHT_CLASS);
    void target.offsetWidth; // forces a reflow so the animation restarts
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

  document.addEventListener("click", function (event) {
    var link = event.target.closest('a[href*="#"]');
    if (!link) return;
    var hash = link.getAttribute("href").split("#")[1];
    if (hash && hash === location.hash.slice(1)) {
      highlight(decodeURIComponent(hash));
    }
  });
})();
