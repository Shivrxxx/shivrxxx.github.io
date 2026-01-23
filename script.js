/* =========================================================
   PRELOADER (logo → fade out)
========================================================= */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("hide");
  }
});

/* =========================================================
   THEME TOGGLE (DARK / LIGHT)
========================================================= */
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const navLogo = document.getElementById("siteLogo");
const heroLogo = document.getElementById("heroLogo");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");
    const isLight = body.classList.contains("light");

    themeToggle.textContent = isLight ? "☀️" : "🌙";

    const newSrc = isLight
      ? "assets/signature-dark.png"
      : "assets/signature-light.png";

    [navLogo, heroLogo].forEach(logo => {
      if (!logo) return;
      logo.style.opacity = "0";
      setTimeout(() => {
        logo.src = newSrc;
        logo.style.opacity = "1";
      }, 160);
    });
  });
}

/* =========================================================
   STAGGERED HERO TEXT (WORD BY WORD)
========================================================= */
document.querySelectorAll(".stagger").forEach(el => {
  const words = el.textContent.trim().split(" ");
  el.innerHTML = words
    .map(
      (word, i) =>
        `<span style="animation-delay:${i * 0.08}s">${word}</span>`
    )
    .join(" ");
});

/* =========================================================
   MOBILE HAMBURGER MENU
========================================================= */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("open");
    });
  });
}

/* =========================================================
   NAV ACTIVE (CLICK BASED – FALLBACK)
========================================================= */
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    document
      .querySelectorAll(".nav-link")
      .forEach(l => l.classList.remove("active", "scroll-active"));
    link.classList.add("active");
  });
});

/* =========================================================
   SCROLL-SYNCED NAV ACTIVE (INTERSECTION OBSERVER)
========================================================= */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if (sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            const target = link.getAttribute("href");
            link.classList.toggle(
              "scroll-active",
              target === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { threshold: 0.6 }
  );

  sections.forEach(section => navObserver.observe(section));
}

/* =========================================================
   BUTTON PRESS MICRO-INTERACTION
========================================================= */
document.querySelectorAll(".btn").forEach(btn => {
  const reset = () => (btn.style.transform = "scale(1)");

  btn.addEventListener("mousedown", () => {
    btn.style.transform = "scale(0.95)";
  });
  btn.addEventListener("mouseup", reset);
  btn.addEventListener("mouseleave", reset);
});

/* =========================================================
   SCROLL REVEAL (ONCE, NO REPEAT)
========================================================= */
const revealItems = document.querySelectorAll(
  ".reveal, .skill-card, .timeline-item, .project-card"
);

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach(item => revealObserver.observe(item));
}

/* =========================================================
   PROJECT MODAL (ANIMATED)
========================================================= */
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalGallery = document.querySelector(".modal-gallery");
const modalClose = document.querySelector(".modal-close");

if (modal && modalTitle && modalDesc && modalGallery) {
  document.querySelectorAll(".view-work").forEach(btn => {
    btn.addEventListener("click", e => {
      const card = e.target.closest(".project-card");
      if (!card) return;

      modalTitle.textContent =
        card.querySelector("h4")?.innerText || "";
      modalDesc.textContent =
        card.querySelector("p")?.innerText || "";

      modalGallery.innerHTML = "";
      const img = card.querySelector("img")?.cloneNode(true);
      if (img) modalGallery.appendChild(img);

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

if (modalClose) modalClose.addEventListener("click", closeModal);

if (modal) {
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal?.classList.contains("active")) {
    closeModal();
  }
});

/* =========================================================
   LOTTIE MICRO-ICONS (OPTIONAL, READY)
   Add elements with class `.lottie-icon`
========================================================= */
document.querySelectorAll(".lottie-icon").forEach(el => {
  const path = el.getAttribute("data-lottie");
  if (!path || !window.lottie) return;

  lottie.loadAnimation({
    container: el,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path
  });
});
