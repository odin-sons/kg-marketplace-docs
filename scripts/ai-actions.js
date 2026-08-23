(function () {
  var button = document.querySelector(".ai-actions__copy");
  if (!button) return;

  var defaultLabel = button.textContent;
  var resetTimer;

  button.addEventListener("click", function () {
    var url = button.dataset.markdownUrl;

    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("bad response");
        return res.text();
      })
      .then(function (markdown) {
        return navigator.clipboard.writeText(markdown);
      })
      .then(function () {
        button.textContent = "Copied!";
      })
      .catch(function () {
        button.textContent = "Couldn't copy — try “View as Markdown” instead";
      })
      .finally(function () {
        clearTimeout(resetTimer);
        resetTimer = setTimeout(function () {
          button.textContent = defaultLabel;
        }, 2000);
      });
  });
})();
