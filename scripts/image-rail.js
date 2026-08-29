(function () {
  var doc = document.querySelector(".doc");
  var rail = document.querySelector(".image-rail");
  if (!doc || !rail) return;

  var STACK_GAP = 32;
  var RESIZE_DEBOUNCE = 150;

  var items = Array.prototype
    .filter.call(doc.querySelectorAll(":scope > p"), function (p) {
      return p.querySelector(":scope > picture:only-child");
    })
    .map(function (p) {
      var marker = document.createComment("image-rail-marker");
      p.parentNode.insertBefore(marker, p);
      var wrapper = document.createElement("div");
      wrapper.className = "image-rail__item";
      return { el: p, marker: marker, wrapper: wrapper };
    });
  if (!items.length) return;

  var railQuery = window.matchMedia("(min-width: 1570px)");
  var resizeTimer = null;

  // Comment nodes have no box of their own — use the nearest real element's edge instead.
  function markerTop(marker) {
    var el = marker.nextElementSibling || marker.previousElementSibling;
    if (!el) return doc.getBoundingClientRect().top + window.scrollY;
    var rect = el.getBoundingClientRect();
    return (marker.nextElementSibling ? rect.top : rect.bottom) + window.scrollY;
  }

  function restoreToDocument() {
    items.forEach(function (item) {
      item.wrapper.style.minHeight = "";
      item.wrapper.style.marginBottom = "";
      if (item.el.parentNode === item.wrapper) {
        item.marker.parentNode.insertBefore(item.el, item.marker.nextSibling);
      }
      if (item.wrapper.parentNode === rail) {
        rail.removeChild(item.wrapper);
      }
    });
    rail.hidden = true;
  }

  // Each image gets its own sized wrapper (not a shared parent) so position:sticky releases
  // per-item instead of all at once; STACK_GAP is removed from min-height and re-added as
  // margin-bottom so parked images keep a gap instead of touching at handoff.
  function moveToRail() {
    items.forEach(function (item) {
      item.wrapper.style.minHeight = "";
      item.wrapper.style.marginBottom = "";
      item.wrapper.appendChild(item.el);
      rail.appendChild(item.wrapper);
    });

    var tops = items.map(function (item) {
      return markerTop(item.marker);
    });
    var docBottom = doc.getBoundingClientRect().bottom + window.scrollY;

    items.forEach(function (item, i) {
      var next = i + 1 < items.length ? tops[i + 1] : docBottom;
      var minHeight = Math.max(0, next - tops[i] - STACK_GAP);
      item.wrapper.style.minHeight = minHeight + "px";
      item.wrapper.style.marginBottom = STACK_GAP + "px";
    });

    rail.hidden = false;
  }

  function refresh() {
    if (railQuery.matches) {
      moveToRail();
    } else {
      restoreToDocument();
    }
  }

  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refresh, RESIZE_DEBOUNCE);
  }

  window.addEventListener("resize", onResize);
  window.addEventListener("load", refresh);
  railQuery.addEventListener("change", refresh);
  refresh();
})();
