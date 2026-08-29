(function () {
  var CANONICAL_VERSIONS_URL = "https://kg-marketplace.pages.dev/versions.json";

  var select = document.getElementById("version-switcher");
  if (!select) return;

  select.addEventListener("change", function () {
    if (select.value) window.location.href = select.value;
  });

  fetch(CANONICAL_VERSIONS_URL)
    .then(function (res) {
      if (!res.ok) throw new Error("bad response");
      return res.json();
    })
    .then(function (versions) {
      if (!Array.isArray(versions) || !versions.length) return;

      var ownVersion = select.dataset.ownVersion;
      select.textContent = "";
      versions.forEach(function (v) {
        var option = document.createElement("option");
        option.value = v.url;
        option.textContent = "v" + v.version + (v.current ? " (current)" : "");
        if (v.version === ownVersion) option.selected = true;
        select.appendChild(option);
      });
    })
    .catch(function () {});
})();
