(function () {
  var select = document.getElementById("theme-switcher");
  if (!select) return;

  var stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (e) {}
  select.value = stored === "light" || stored === "dark" ? stored : "auto";

  select.addEventListener("change", function () {
    var value = select.value;
    try {
      if (value === "auto") {
        localStorage.removeItem("theme");
        document.documentElement.removeAttribute("data-theme");
      } else {
        localStorage.setItem("theme", value);
        document.documentElement.setAttribute("data-theme", value);
      }
    } catch (e) {}
  });
})();
