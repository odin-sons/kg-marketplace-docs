(function () {
  var CANONICAL_VERSIONS_URL = "https://kg-marketplace.pages.dev/versions.json";

  var select = document.getElementById("version-switcher");
  if (!select) return;

  select.addEventListener("change", function () {
    if (select.value) window.location.href = select.value;
  });

  // The options above are server-rendered from this exact build's own
  // versions.js — accurate as of whenever this page was built, but a build
  // made for an older mod version has no way to know about versions
  // released after it. Fetching the manifest fresh from the canonical
  // "latest docs" domain (rather than trusting only what got baked into
  // this particular build) keeps every old build's dropdown current for as
  // long as it's reachable online; if the fetch fails, the baked-in list
  // above is already a complete, working fallback and is simply left alone.
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
    .catch(function () {
      // Offline, blocked, or the canonical host is unreachable — the
      // server-rendered options already cover this build's own version.
    });
})();
