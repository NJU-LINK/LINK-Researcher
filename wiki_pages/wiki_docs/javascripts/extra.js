document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector(".md-typeset table");
  if (table) {
    table.setAttribute("role", "table");
  }

  // Build large Prev/Next cards from the top-level tab order.
  const tabLinks = Array.from(document.querySelectorAll(".md-tabs__list .md-tabs__link"));
  if (!tabLinks.length) {
    return;
  }

  const normalizePath = (value) => {
    try {
      const path = new URL(value, window.location.href).pathname;
      return path.replace(/index\.html$/, "").replace(/\/$/, "") || "/";
    } catch (_) {
      return "/";
    }
  };

  const seen = new Set();
  const pages = tabLinks
    .map((a) => ({
      href: a.getAttribute("href") || "",
      title: (a.textContent || "").trim(),
      path: normalizePath(a.getAttribute("href") || ""),
    }))
    .filter((item) => {
      if (!item.href || seen.has(item.path)) {
        return false;
      }
      seen.add(item.path);
      return true;
    });

  const currentPath = normalizePath(window.location.pathname);
  const currentIndex = pages.findIndex((p) => p.path === currentPath);
  if (currentIndex < 0) {
    return;
  }

  const prev = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const next = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;
  if (!prev && !next) {
    return;
  }

  const article = document.querySelector("article.md-content__inner");
  if (!article) {
    return;
  }

  const existing = article.querySelector(".wiki-page-nav");
  if (existing) {
    existing.remove();
  }

  const nav = document.createElement("nav");
  nav.className = "wiki-page-nav";
  nav.setAttribute("aria-label", "页面切换");

  const createCard = (item, direction, label) => {
    const card = document.createElement("a");
    card.className = `wiki-page-nav__card wiki-page-nav__card--${direction}`;
    card.href = item.href;
    card.innerHTML = `
      <span class="wiki-page-nav__kicker">${label}</span>
      <span class="wiki-page-nav__title">${item.title}</span>
    `;
    return card;
  };

  if (prev) {
    nav.appendChild(createCard(prev, "prev", "Prev"));
  }
  if (next) {
    nav.appendChild(createCard(next, "next", "Next"));
  }

  if (!prev && next) {
    nav.classList.add("wiki-page-nav--next-only");
  }
  if (prev && !next) {
    nav.classList.add("wiki-page-nav--prev-only");
  }

  article.appendChild(nav);
});
