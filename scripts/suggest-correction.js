(function () {
  var doc = document.querySelector(".doc");
  if (!doc) return;

  var REPO = "odin-sons/kg-marketplace-docs";
  var MAX_QUOTE_LENGTH = 500;

  var button = document.createElement("button");
  button.type = "button";
  button.className = "suggest-correction";
  button.textContent = "Suggest a correction";
  button.hidden = true;
  document.body.appendChild(button);

  var pendingQuote = "";

  function isSelectionInDoc(selection) {
    if (!selection || selection.rangeCount === 0) return false;
    var range = selection.getRangeAt(0);
    return doc.contains(range.commonAncestorContainer);
  }

  function hideButton() {
    button.hidden = true;
  }

  function showButtonForSelection(selection) {
    var text = selection.toString().trim();
    if (!text) {
      hideButton();
      return;
    }
    var rect = selection.getRangeAt(0).getBoundingClientRect();
    if (!rect.width && !rect.height) {
      hideButton();
      return;
    }
    pendingQuote = text;
    var top = rect.top + window.scrollY - 44;
    var left = rect.left + window.scrollX + rect.width / 2;
    button.style.top = Math.max(8, top) + "px";
    button.style.left = left + "px";
    button.hidden = false;
  }

  function handleSelectionEnd(event) {
    if (event && event.target === button) return;
    var selection = window.getSelection();
    if (!isSelectionInDoc(selection) || selection.isCollapsed) {
      hideButton();
      return;
    }
    showButtonForSelection(selection);
  }

  document.addEventListener("mouseup", handleSelectionEnd);
  document.addEventListener("touchend", handleSelectionEnd);
  document.addEventListener("keyup", function (event) {
    if (event.shiftKey || event.key === "a") handleSelectionEnd();
  });
  window.addEventListener("scroll", hideButton, { passive: true });
  window.addEventListener("resize", hideButton);

  button.addEventListener("click", function () {
    var quote = pendingQuote;
    if (quote.length > MAX_QUOTE_LENGTH) {
      quote = quote.slice(0, MAX_QUOTE_LENGTH) + "…";
    }
    var params = new URLSearchParams({
      template: "doc-correction.yml",
      "page-url": location.href,
      "selected-text": "> " + quote.split("\n").join("\n> "),
    });
    window.open("https://github.com/" + REPO + "/issues/new?" + params.toString(), "_blank", "noopener");
    hideButton();
    window.getSelection().removeAllRanges();
  });
})();
