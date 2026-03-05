const header = document.getElementById("siteHeader");
const yearEl = document.getElementById("year");
const starCountEl = document.getElementById("starCount");

function onScroll() {
  if (!header) return;
  if (window.scrollY > 24) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

function setupReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("show"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
}

async function loadStars() {
  if (!starCountEl) return;
  try {
    const response = await fetch("https://api.github.com/repos/Simpleyyt/ai-manus");
    if (!response.ok) throw new Error("GitHub API error");
    const data = await response.json();
    const stars = Number(data.stargazers_count || 0);
    starCountEl.textContent = stars.toLocaleString("en-US");
  } catch (error) {
    starCountEl.textContent = "2k+";
  }
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("DOMContentLoaded", () => {
  onScroll();
  setupReveal();
  loadStars();
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
});
