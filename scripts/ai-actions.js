(function () {
  var trigger = document.querySelector(".ai-actions__trigger");
  var menu = document.getElementById("ai-actions-menu");
  if (!trigger || !menu) return;

  function close() {
    trigger.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  }

  function open() {
    trigger.setAttribute("aria-expanded", "true");
    menu.hidden = false;
  }

  trigger.addEventListener("click", function (event) {
    event.stopPropagation();
    if (menu.hidden) open();
    else close();
  });

  // Standard disclosure-widget behavior: dismiss on an outside click or
  // Escape, returning focus to the trigger for Escape specifically so a
  // keyboard user doesn't lose their place.
  document.addEventListener("click", function (event) {
    if (!menu.hidden && !menu.contains(event.target) && event.target !== trigger) close();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !menu.hidden) {
      close();
      trigger.focus();
    }
  });

  var copyButton = menu.querySelector(".ai-actions__copy");
  if (!copyButton) return;

  var defaultLabel = copyButton.textContent;
  var resetTimer;

  copyButton.addEventListener("click", function () {
    var url = copyButton.dataset.markdownUrl;

    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("bad response");
        return res.text();
      })
      .then(function (markdown) {
        return navigator.clipboard.writeText(markdown);
      })
      .then(function () {
        copyButton.textContent = "Copied!";
      })
      .catch(function () {
        copyButton.textContent = "Couldn't copy — try “View as Markdown” instead";
      })
      .finally(function () {
        clearTimeout(resetTimer);
        resetTimer = setTimeout(function () {
          copyButton.textContent = defaultLabel;
        }, 2000);
      });
  });

  // Claude and Gemini don't support a prefill-via-URL param (see
  // eleventy.config.js), so these links carry the prompt as a data
  // attribute instead: copy it to the clipboard on click, same gesture that
  // opens the new chat, so it's a paste away rather than a blank box. The
  // write must happen synchronously in this handler (not after a fetch, like
  // the button above) — Clipboard API access requires the call to still be
  // inside the click's user-activation window.
  menu.querySelectorAll("[data-copy-prompt]").forEach(function (link) {
    link.addEventListener("click", function () {
      navigator.clipboard.writeText(link.dataset.copyPrompt);
    });
  });
})();
