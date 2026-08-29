(function () {
  // The server (base.njk, driven by navWithState in eleventy.config.js)
  // already decided and rendered which sections start expanded/collapsed
  // for this exact page, via `hidden` + aria-expanded — this only wires up
  // the click interaction on top of that, it doesn't make any decisions of
  // its own. Both toggle types (site-nav__toggle for a third-level item,
  // site-nav__group-toggle for a top-level group) behave identically —
  // aria-controls names the element to show/hide — so one generic
  // selector covers both instead of two near-duplicate loops.
  document.querySelectorAll("#site-nav [aria-controls]").forEach(function (toggle) {
    var target = document.getElementById(toggle.getAttribute("aria-controls"));
    if (!target) return;

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      target.hidden = expanded;
    });
  });
})();
