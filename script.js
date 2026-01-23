// THEME TOGGLE
const body = document.body;
const toggleBtn = document.getElementById("themeToggle");
const signatureImg = document.getElementById("signatureImg");

/* Apply theme */
function applyTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark");
    body.classList.remove("light");

    // DARK MODE → light signature
    signatureImg.src = "assets/signature-light.png";
    toggleBtn.textContent = "☀";
  } else {
    body.classList.add("light");
    body.classList.remove("dark");

    // LIGHT MODE → dark signature
    signatureImg.src = "assets/signature-dark.png";
    toggleBtn.textContent = "☾";
  }

  localStorage.setItem("theme", theme);
}

/* On page load */
const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

/* Toggle click */
toggleBtn.addEventListener("click", () => {
  const isDark = body.classList.contains("dark");
  applyTheme(isDark ? "light" : "dark");
});


// MOBILE MENU
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.querySelector(".mobile-menu");
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  mobileMenu.classList.toggle("open");
});

// NAV ACTIVE
document.querySelectorAll(".nav-link, .mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    if (link.classList.contains("nav-link")) link.classList.add("active");
    mobileMenu.classList.remove("open");
    menuToggle.classList.remove("active");
  });
});

// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.1}s`;
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

reveals.forEach(el => observer.observe(el));


