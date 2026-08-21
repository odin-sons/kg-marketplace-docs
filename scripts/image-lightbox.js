(function () {
  var CONTENT_SELECTOR = ".doc img";
  var FLIP_DURATION = 320;
  var FLIP_EASING = "cubic-bezier(0.2, 0, 0.2, 1)";
  // Belt-and-suspenders cap on anything that's supposed to resolve on its
  // own (an image load, a Web Animations API finish) — a backgrounded tab
  // can throttle or altogether skip paint-tied work, and this is a modal
  // dialog: it must never be able to get permanently stuck open or closed.
  var SAFETY_TIMEOUT = 1500;

  var images = document.querySelectorAll(CONTENT_SELECTOR);
  if (!images.length) return;

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function withTimeout(promise, ms) {
    return new Promise(function (resolve) {
      var settled = false;
      function settle() {
        if (settled) return;
        settled = true;
        resolve();
      }
      promise.then(settle, settle);
      setTimeout(settle, ms);
    });
  }

  // --- Build the overlay once, reused for every image ---
  var lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.hidden = true;

  var backdrop = document.createElement("div");
  backdrop.className = "lightbox__backdrop";

  var stage = document.createElement("div");
  stage.className = "lightbox__stage";

  var lightboxImg = document.createElement("img");
  lightboxImg.className = "lightbox__img";

  var closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "lightbox__close";
  closeButton.setAttribute("aria-label", "Close image preview");
  closeButton.textContent = "×";

  stage.appendChild(lightboxImg);
  lightbox.appendChild(backdrop);
  lightbox.appendChild(stage);
  lightbox.appendChild(closeButton);
  document.body.appendChild(lightbox);

  var activeSourceImg = null;
  var isBusy = false;

  function computeDelta(fromRect, toRect) {
    var scaleX = fromRect.width / toRect.width;
    var scaleY = fromRect.height / toRect.height;
    var translateX = fromRect.left + fromRect.width / 2 - (toRect.left + toRect.width / 2);
    var translateY = fromRect.top + fromRect.height / 2 - (toRect.top + toRect.height / 2);
    return "translate(" + translateX + "px, " + translateY + "px) scale(" + scaleX + ", " + scaleY + ")";
  }

  function setInert(state) {
    document.querySelectorAll("body > :not(.lightbox)").forEach(function (el) {
      if (state) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    });
  }

  // Resolves once `img` has pixel data to lay out and measure. Deliberately
  // uses only the load/error events (not `decode()`, which can stall
  // indefinitely on a backgrounded/non-rendering tab) — `getBoundingClientRect`
  // forces a synchronous layout on its own once the data has arrived, so no
  // extra rAF wait is needed either.
  function whenReady(img) {
    if (img.complete && img.naturalWidth) return Promise.resolve();
    return withTimeout(
      new Promise(function (resolve) {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      }),
      SAFETY_TIMEOUT,
    );
  }

  function open(sourceImg) {
    if (isBusy) return;
    isBusy = true;
    activeSourceImg = sourceImg;

    var firstRect = sourceImg.getBoundingClientRect();
    lightboxImg.alt = sourceImg.alt || "";
    if (sourceImg.naturalWidth) lightboxImg.width = sourceImg.naturalWidth;
    if (sourceImg.naturalHeight) lightboxImg.height = sourceImg.naturalHeight;
    lightboxImg.src = sourceImg.currentSrc || sourceImg.src;

    lightbox.setAttribute("aria-label", sourceImg.alt ? sourceImg.alt : "Image preview");
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    setInert(true);

    whenReady(lightboxImg).then(function () {
      var lastRect = lightboxImg.getBoundingClientRect();

      if (prefersReducedMotion() || !lastRect.width || !lastRect.height) {
        finishOpen();
        return;
      }

      try {
        var startTransform = computeDelta(firstRect, lastRect);
        var animation = lightboxImg.animate(
          [
            { transform: startTransform, opacity: 0.6 },
            { transform: "none", opacity: 1 },
          ],
          { duration: FLIP_DURATION, easing: FLIP_EASING, fill: "both" },
        );
        withTimeout(animation.finished, SAFETY_TIMEOUT).then(finishOpen);
      } catch (e) {
        finishOpen();
      }
    });
  }

  function finishOpen() {
    isBusy = false;
    closeButton.focus();
  }

  function close() {
    if (isBusy || lightbox.hidden) return;
    isBusy = true;

    var sourceImg = activeSourceImg;
    var lastRect = lightboxImg.getBoundingClientRect();
    var firstRect = sourceImg ? sourceImg.getBoundingClientRect() : null;

    function teardown() {
      lightbox.hidden = true;
      document.body.classList.remove("lightbox-open");
      setInert(false);
      lightboxImg.getAnimations().forEach(function (a) {
        a.cancel();
      });
      lightboxImg.removeAttribute("style");
      isBusy = false;
      if (sourceImg) sourceImg.focus();
      activeSourceImg = null;
    }

    if (prefersReducedMotion() || !firstRect || !lastRect.width || !lastRect.height) {
      teardown();
      return;
    }

    try {
      var endTransform = computeDelta(firstRect, lastRect);
      var animation = lightboxImg.animate(
        [
          { transform: "none", opacity: 1 },
          { transform: endTransform, opacity: 0.6 },
        ],
        { duration: FLIP_DURATION, easing: FLIP_EASING, fill: "both" },
      );
      withTimeout(animation.finished, SAFETY_TIMEOUT).then(teardown);
    } catch (e) {
      teardown();
    }
  }

  images.forEach(function (img) {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.classList.add("lightbox-trigger");
    img.addEventListener("click", function () {
      open(img);
    });
    img.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(img);
      }
    });
  });

  closeButton.addEventListener("click", close);
  backdrop.addEventListener("click", close);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !lightbox.hidden) close();
  });
})();
