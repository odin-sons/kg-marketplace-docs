(function () {
  // Baseline HTML always renders every group and every third-level child
  // link, expanded — a reader with JS disabled (or a crawler) still sees
  // the full tree, nothing hidden. This just layers a collapse/expand
  // toggle on top of both levels, defaulting collapsed unless the visitor
  // is already on that section's own current page or one of its
  // descendants, so landing on any page never hides the very links that
  // explain where it sits in the tree.

  // Third-level items — a page with children, e.g. Quests > Quest
  // Profiles/Quest Events. The row itself is a real link to its own page,
  // so the toggle has to stay a small, separate control next to it rather
  // than swallowing the whole row.
  document.querySelectorAll(".site-nav__item--has-children").forEach(function (li, index) {
    var link = li.querySelector(":scope > a");
    var children = li.querySelector(":scope > .site-nav__children");
    if (!link || !children) return;

    var isActive = link.hasAttribute("aria-current") || children.querySelector("[aria-current]") !== null;
    var contentId = "nav-children-" + index;
    children.id = contentId;

    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "site-nav__toggle";
    toggle.setAttribute("aria-expanded", isActive ? "true" : "false");
    toggle.setAttribute("aria-controls", contentId);
    toggle.setAttribute("aria-label", "Toggle " + link.textContent.trim() + " sub-pages");
    link.insertAdjacentElement("afterend", toggle);

    if (!isActive) children.hidden = true;

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      children.hidden = expanded;
    });
  });

  // Top-level groups (Core, Economy, Guides, ...) — collapsed by default
  // except whichever one contains the page currently open, so a fresh
  // visit shows a short, scannable list of section names instead of every
  // page on the site at once. The flat Introduction/Installation/File
  // structure list at the very top has no title and is skipped here (it's
  // three links, not a section — nothing to collapse). Unlike the item
  // toggle above, the group title is plain text, not a link — so the
  // *entire* title becomes the button instead of getting a separate
  // control squeezed in beside it.
  document.querySelectorAll(".site-nav__group").forEach(function (group, index) {
    var title = group.querySelector(":scope > .site-nav__group-title");
    var list = group.querySelector(":scope > ul");
    if (!title || !list) return;

    var isActive = list.querySelector("[aria-current]") !== null;
    var contentId = "nav-group-" + index;
    list.id = contentId;

    var textWrap = document.createElement("span");
    textWrap.className = "site-nav__group-title-text";
    while (title.firstChild) textWrap.appendChild(title.firstChild);

    var button = document.createElement("button");
    button.type = "button";
    button.className = "site-nav__group-toggle";
    button.setAttribute("aria-expanded", isActive ? "true" : "false");
    button.setAttribute("aria-controls", contentId);
    button.appendChild(textWrap);
    title.appendChild(button);

    if (!isActive) list.hidden = true;

    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      list.hidden = expanded;
    });
  });
})();
