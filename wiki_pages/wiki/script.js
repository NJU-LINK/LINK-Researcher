const root = document.documentElement;
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const themeToggle = document.getElementById("themeToggle");
const tocLinks = Array.from(document.querySelectorAll(".toc-link"));
const sections = tocLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const THEME_KEY = "deep-research-wiki-theme";

function applyTheme(theme) {
  if (theme === "light") {
    root.classList.add("light");
  } else {
    root.classList.remove("light");
  }
  themeToggle.textContent = theme === "light" ? "Light" : "Dark";
}

function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") {
    applyTheme(stored);
    return;
  }
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(prefersLight ? "light" : "dark");
}

function toggleTheme() {
  const next = root.classList.contains("light") ? "dark" : "light";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

function setActiveLink() {
  const offset = window.scrollY + 120;
  let currentId = sections[0] ? sections[0].id : "";
  sections.forEach((section) => {
    if (section.offsetTop <= offset) {
      currentId = section.id;
    }
  });

  tocLinks.forEach((link) => {
    const href = link.getAttribute("href").slice(1);
    link.classList.toggle("active", href === currentId);
  });
}

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

themeToggle.addEventListener("click", toggleTheme);

document.addEventListener("click", (event) => {
  if (!sidebar.classList.contains("open")) return;
  if (sidebar.contains(event.target) || menuToggle.contains(event.target)) return;
  sidebar.classList.remove("open");
});

tocLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });
});

window.addEventListener("scroll", setActiveLink);
window.addEventListener("resize", setActiveLink);

initTheme();
setActiveLink();
