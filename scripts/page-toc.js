(function () {
  var MIN_HEADINGS = 2;

  var doc = document.querySelector(".doc");
  if (!doc) return;

  // Every heading already has an id from IdAttributePlugin (eleventy.config.js)
  // — no build-time TOC generation needed, this just reads what's already there.
  var headings = Array.prototype.filter.call(doc.querySelectorAll("h2, h3"), function (h) {
    return h.id;
  });
  if (headings.length < MIN_HEADINGS) return;

  var nav = document.createElement("nav");
  nav.className = "page-toc";
  nav.setAttribute("aria-label", "On this page");

  var list = document.createElement("ol");
  list.className = "page-toc__list";
  nav.appendChild(list);

  var linkByHeading = new Map();

  headings.forEach(function (heading) {
    var level = heading.tagName === "H3" ? 3 : 2;

    var item = document.createElement("li");
    item.className = "page-toc__item page-toc__item--h" + level;

    var link = document.createElement("a");
    link.className = "page-toc__link";
    link.href = "#" + heading.id;

    var tick = document.createElement("span");
    tick.className = "page-toc__tick";
    tick.setAttribute("aria-hidden", "true");

    var label = document.createElement("span");
    label.className = "page-toc__label";
    label.textContent = heading.textContent.trim();

    // Label before tick in DOM order — combined with `justify-content:
    // flex-end` in CSS, this keeps the tick pinned to the same right edge
    // whether the label is collapsed or expanded, with the label growing
    // out to the left of it instead of shifting the tick around.
    link.appendChild(label);
    link.appendChild(tick);
    item.appendChild(link);
    list.appendChild(item);

    linkByHeading.set(heading, link);
  });

  document.body.appendChild(nav);

  function setActive(heading) {
    linkByHeading.forEach(function (link) {
      link.classList.remove("is-active");
    });
    var active = linkByHeading.get(heading);
    if (active) active.classList.add("is-active");
  }

  // A heading becomes "active" once it crosses into a thin band near the
  // top of the viewport — narrowing the observed root to that band (rather
  // than the whole viewport) is what makes this fire right as a section
  // starts being read instead of only once the whole heading has scrolled
  // by. Only reacting to entries becoming intersecting (never clearing on
  // exit) is what keeps the last active tick lit while scrolling through
  // a long section with no heading of its own in view.
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target);
      });
    },
    { rootMargin: "0px 0px -70% 0px", threshold: 0 },
  );
  headings.forEach(function (h) {
    observer.observe(h);
  });

  setActive(headings[0]);
})();
