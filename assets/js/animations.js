/**
 * Aurum Café — Scroll Animations & Counters
 */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Reveal on Scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Counter Animation ---------- */
  const counters = document.querySelectorAll("[data-count]");

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString() + suffix;
    }

    requestAnimationFrame(tick);
  }

  if (counters.length) {
    if (prefersReduced) {
      counters.forEach((el) => {
        el.textContent = parseInt(el.dataset.count, 10).toLocaleString() + (el.dataset.suffix || "");
      });
    } else if ("IntersectionObserver" in window) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach((el) => counterObserver.observe(el));
    }
  }

  /* ---------- Parallax-lite on page heroes ---------- */
  const heroMedia = document.querySelector(".hero__media img");
  if (heroMedia && !prefersReduced) {
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          heroMedia.style.transform = `scale(1.05) translateY(${y * 0.15}px)`;
        }
      },
      { passive: true }
    );
  }

  /* ---------- Stagger children utility ---------- */
  document.querySelectorAll("[data-stagger]").forEach((parent) => {
    [...parent.children].forEach((child, i) => {
      if (!child.classList.contains("reveal")) child.classList.add("reveal");
      child.classList.add(`reveal-delay-${Math.min(i + 1, 4)}`);
    });
  });
})();
