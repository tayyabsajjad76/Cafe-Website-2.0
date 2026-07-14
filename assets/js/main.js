/**
 * Aurum Café — Main Interactions
 * Navigation, forms, menu filters, FAQ, lightbox, newsletter
 */

(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- Page Loader ---------- */
  window.addEventListener("load", () => {
    const loader = $(".page-loader");
    if (loader) {
      setTimeout(() => loader.classList.add("is-done"), 400);
    }
  });

  /* ---------- Sticky Header ---------- */
  const header = $(".site-header");
  const onScrollHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Mobile Navigation ---------- */
  const toggle = $(".nav-toggle");
  const nav = $(".nav");
  let lockedScrollY = 0;

  const lockScroll = () => {
    lockedScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  };

  const unlockScroll = () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, lockedScrollY);
  };

  const closeNav = () => {
    toggle?.classList.remove("is-open");
    nav?.classList.remove("is-open");
    header?.classList.remove("menu-open");
    unlockScroll();
  };

  toggle?.addEventListener("click", () => {
    const open = toggle.classList.toggle("is-open");
    nav?.classList.toggle("is-open", open);
    header?.classList.toggle("menu-open", open);
    if (open) {
      lockScroll();
    } else {
      unlockScroll();
    }
  });

  $$(".nav-link").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeNav();
  });

  /* ---------- Active Nav Link ---------- */
  const path = window.location.pathname.split("/").pop() || "index.html";
  $$(".nav-link").forEach((link) => {
    const href = link.getAttribute("href") || "";
    const file = href.split("/").pop();
    if (file === path || (path === "" && file === "index.html")) {
      link.classList.add("is-active");
    }
  });

  /* ---------- Back to Top ---------- */
  const backTop = $(".back-to-top");
  window.addEventListener(
    "scroll",
    () => {
      backTop?.classList.toggle("is-visible", window.scrollY > 500);
    },
    { passive: true }
  );
  backTop?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Button Ripple Position ---------- */
  $$(".btn").forEach((btn) => {
    btn.addEventListener("pointerdown", (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty("--ripple-x", `${e.clientX - rect.left}px`);
      btn.style.setProperty("--ripple-y", `${e.clientY - rect.top}px`);
    });
  });

  /* ---------- Menu Filtering ---------- */
  const filterBtns = $$(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const cat = btn.dataset.filter;
      const menuItems = $$(".menu-item");

      menuItems.forEach((item) => {
        const match = cat === "all" || item.dataset.category === cat;
        if (match) {
          item.classList.remove("is-hidden");
          item.classList.add("is-filtering");
          requestAnimationFrame(() => {
            requestAnimationFrame(() => item.classList.remove("is-filtering"));
          });
        } else {
          item.classList.add("is-hidden");
        }
      });
    });
  });

  /* ---------- FAQ Accordion ---------- */
  $$(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-question");
    btn?.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      $$(".faq-item").forEach((i) => {
        i.classList.remove("is-open");
        i.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Gallery Lightbox ---------- */
  const lightbox = $(".lightbox");
  if (lightbox) {
    const lbImg = $(".lightbox__img", lightbox);
    const items = $$(".gallery-item, .gallery-preview__item[data-full]");
    let current = 0;
    const sources = items.map(
      (el) =>
        el.dataset.full ||
        el.querySelector("img")?.src ||
        ""
    );

    const openLb = (index) => {
      current = index;
      lbImg.src = sources[current];
      lbImg.alt = items[current].querySelector("img")?.alt || "Gallery image";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };

    const closeLb = () => {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    };

    const navLb = (dir) => {
      current = (current + dir + sources.length) % sources.length;
      lbImg.src = sources[current];
      lbImg.alt = items[current].querySelector("img")?.alt || "Gallery image";
    };

    items.forEach((item, i) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        openLb(i);
      });
    });

    $(".lightbox__close", lightbox)?.addEventListener("click", closeLb);
    $(".lightbox__prev", lightbox)?.addEventListener("click", () => navLb(-1));
    $(".lightbox__next", lightbox)?.addEventListener("click", () => navLb(1));

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLb();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") navLb(-1);
      if (e.key === "ArrowRight") navLb(1);
    });
  }

  /* ---------- Form Validation ---------- */
  const validators = {
    required: (v) => v.trim().length > 0,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    phone: (v) => /^[\d\s+\-().]{7,20}$/.test(v.trim()),
    min: (v, n) => v.trim().length >= Number(n),
  };

  function validateField(field) {
    const group = field.closest(".form-group");
    if (!group) return true;
    const rules = (field.dataset.validate || "").split("|").filter(Boolean);
    let valid = true;
    let message = "";

    for (const rule of rules) {
      const [name, arg] = rule.split(":");
      const value = field.value;

      if (name === "required" && !validators.required(value)) {
        valid = false;
        message = "This field is required.";
        break;
      }
      if (name === "email" && value && !validators.email(value)) {
        valid = false;
        message = "Please enter a valid email address.";
        break;
      }
      if (name === "phone" && value && !validators.phone(value)) {
        valid = false;
        message = "Please enter a valid phone number.";
        break;
      }
      if (name === "min" && !validators.min(value, arg)) {
        valid = false;
        message = `Please enter at least ${arg} characters.`;
        break;
      }
    }

    // Date not in the past
    if (field.type === "date" && field.value) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(field.value + "T00:00:00");
      if (selected < today) {
        valid = false;
        message = "Please choose today or a future date.";
      }
    }

    group.classList.toggle("has-error", !valid);
    field.classList.toggle("is-invalid", !valid);
    field.classList.toggle("is-valid", valid && field.value.trim() !== "");
    const err = group.querySelector(".form-error");
    if (err && message) err.textContent = message;

    return valid;
  }

  $$("form[data-validate]").forEach((form) => {
    const fields = $$("[data-validate]", form);

    fields.forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.classList.contains("is-invalid")) validateField(field);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      fields.forEach((f) => {
        if (!validateField(f)) ok = false;
      });

      if (!ok) {
        const first = form.querySelector(".has-error .form-control");
        first?.focus();
        return;
      }

      const wrap = form.closest(".form-wrap, .reservation-form-wrap, .contact-form-wrap");
      const success = wrap?.querySelector(".form-success") || form.nextElementSibling;

      form.style.display = "none";
      if (success?.classList.contains("form-success")) {
        success.classList.add("is-visible");
      }

      // Newsletter: keep form visible with reset
      if (form.classList.contains("newsletter-form")) {
        form.style.display = "";
        form.reset();
        const btn = form.querySelector("button");
        const original = btn.textContent;
        btn.textContent = "Subscribed!";
        setTimeout(() => {
          btn.textContent = original;
        }, 2500);
      }
    });
  });

  /* ---------- Set min date on reservation ---------- */
  const dateInput = $("#res-date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
  }
})();
