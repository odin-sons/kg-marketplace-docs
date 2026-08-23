(function () {
  var toggle = document.querySelector(".sidebar-collapse-toggle");
  if (!toggle) return;

  var root = document.documentElement;

  function sync() {
    var collapsed = root.getAttribute("data-sidebar") === "collapsed";
    toggle.setAttribute("aria-expanded", String(!collapsed));
    toggle.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
  }

  sync();

  toggle.addEventListener("click", function () {
    var collapsed = root.getAttribute("data-sidebar") === "collapsed";
    if (collapsed) {
      root.removeAttribute("data-sidebar");
    } else {
      root.setAttribute("data-sidebar", "collapsed");
    }
    try {
      localStorage.setItem("sidebarCollapsed", String(!collapsed));
    } catch (e) {}
    sync();
  });
})();
