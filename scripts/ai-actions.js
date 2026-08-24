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

  // Flashes a button's label to `text` for 2s, then restores whatever it
  // said before this call — shared by both copy buttons below so a second
  // click (or a click on the other button) while the flash is still showing
  // doesn't leave it stuck.
  function flashLabel(button, text) {
    if (!button.dataset.defaultLabel) button.dataset.defaultLabel = button.textContent;
    clearTimeout(button._resetTimer);
    button.textContent = text;
    button._resetTimer = setTimeout(function () {
      button.textContent = button.dataset.defaultLabel;
    }, 2000);
  }

  var copyPromptButton = menu.querySelector(".ai-actions__copy-prompt");
  if (copyPromptButton) {
    copyPromptButton.addEventListener("click", function () {
      navigator.clipboard
        .writeText(copyPromptButton.dataset.prompt)
        .then(function () {
          flashLabel(copyPromptButton, "Copied!");
        })
        .catch(function () {
          flashLabel(copyPromptButton, "Couldn't copy");
        });
    });
  }

  var copyButton = menu.querySelector(".ai-actions__copy");
  if (copyButton) {
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
          flashLabel(copyButton, "Copied!");
        })
        .catch(function () {
          flashLabel(copyButton, "Couldn't copy — try “View as Markdown” instead");
        });
    });
  }
})();
