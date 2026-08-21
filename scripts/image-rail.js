(function () {
  var doc = document.querySelector(".doc");
  var rail = document.querySelector(".image-rail");
  if (!doc || !rail) return;

  var STACK_GAP = 32; // visual gap enforced between two rail images at handoff
  var RESIZE_DEBOUNCE = 150;

  // A comment node left at each image's original spot in the text — lets a
  // narrower resize move it back to exactly where it came from, instead of
  // just remembering "the rail" and losing its place in the prose. Each
  // image also gets its own wrapper (see moveToRail for why).
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

  // Comment nodes render no box, so neither they nor a Range around them
  // have a getBoundingClientRect worth reading (it comes back zeroed).
  // nextElementSibling/previousElementSibling, though, are part of the
  // NonDocumentTypeChildNode DOM mixin that Comment implements too — so
  // the nearest real element's edge stands in for the marker's position.
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

  // Moves each standalone image into its own wrapper inside `.image-rail`,
  // sized via `min-height` to exactly the vertical span of page it
  // corresponds to — with the real `position: sticky` (set in CSS) on the
  // image *inside* that wrapper, not on the wrapper itself. That placement
  // matters: a sticky element only ever releases once its own containing
  // block's edge scrolls past, and its containing block is its immediate
  // parent — give every image the same rail-wide parent and every one of
  // them is free to stay stuck for the entire rest of the page at once
  // (which is exactly what happened before this used per-image wrappers).
  // Give each one its own correctly-sized wrapper instead, and it can only
  // ever be stuck for as long as its own wrapper is still on screen.
  //
  // Each zone's size comes from the gap between markers *after* the images
  // have already left the text column, not before: a page that's mostly
  // back-to-back images (e.g. Traders) shrinks a lot once those images are
  // pulled out, since they stop taking up space in the (wider) text
  // column. Measuring with them still in place would size every zone for
  // a document that no longer exists once the move happens, leaving the
  // rail far taller than the real page and images scrolling on long after
  // the content has ended.
  //
  // STACK_GAP comes off each wrapper's min-height *and* gets added back as
  // margin-bottom, rather than just shrinking the box. A sticky item that
  // can't stay pinned any longer doesn't jump back to its wrapper's top —
  // it parks flush against its own wrapper's bottom edge for the rest of
  // that wrapper's scroll range. With no margin, the next wrapper (and the
  // image waiting inside it) starts at that exact same edge, so the two
  // images end up touching with zero space between them for that entire
  // stretch. The margin is real empty space the parked image can't reach,
  // so there's always STACK_GAP of breathing room until the handoff.
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
