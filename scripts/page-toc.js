(function () {
  var MIN_HEADINGS = 2;

  var doc = document.querySelector(".doc");
  if (!doc) return;

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

    // Label before tick in DOM order — keeps the tick pinned to the right edge (see CSS).
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
