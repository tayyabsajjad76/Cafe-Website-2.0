/**
 * Aurum Café — Product Detail Page
 * Dedicated renderer (no opacity:0 reveal classes)
 */
(function () {
  "use strict";

  function money(n) {
    return window.AURUM_formatPrice
      ? AURUM_formatPrice(n)
      : "$" + Number(n).toFixed(2);
  }

  function getId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id") || params.get("product") || "";
  }

  function render() {
    const root = document.getElementById("product-root");
    if (!root) return;

    const products = window.AURUM_PRODUCTS || [];
    const id = getId();
    const product =
      (window.AURUM_getProduct && window.AURUM_getProduct(id)) ||
      products.find((p) => p.id === id);

    if (!id) {
      root.innerHTML = `
        <div class="cart-empty">
          <h2>No product selected</h2>
          <p>Choose an item from the menu to see full details.</p>
          <a href="menu.html" class="btn btn--primary">Browse Menu</a>
        </div>`;
      return;
    }

    if (!product) {
      root.innerHTML = `
        <div class="cart-empty">
          <h2>Product not found</h2>
          <p>We couldn’t find “${id.replace(/[<>&"]/g, "")}” in our menu.</p>
          <a href="menu.html" class="btn btn--primary">Back to Menu</a>
        </div>`;
      return;
    }

    document.title = product.name + " — Aurum Café";
    const heroTitle = document.getElementById("product-hero-title");
    const crumb = document.getElementById("product-crumb");
    if (heroTitle) heroTitle.textContent = product.name;
    if (crumb) crumb.textContent = product.name;

    const tagHtml = product.tag
      ? `<span class="product-detail__tag">${product.tag}</span>`
      : "";

    root.innerHTML = `
      <div class="product-detail" data-product-root>
        <div class="product-detail__media">
          <img src="${product.image}" alt="${product.name}" width="900" height="900">
        </div>
        <div>
          ${tagHtml}
          <p class="eyebrow">${product.category}</p>
          <h2 class="section-title" style="margin-bottom:0">${product.name}</h2>
          <p class="product-detail__price">${money(product.price)}</p>
          <p class="product-detail__desc">${product.longDesc || product.desc}</p>
          <div class="qty-row">
            <span style="font-family:var(--font-ui);font-size:0.85rem;font-weight:500">Quantity</span>
            <div class="qty-control" aria-label="Quantity">
              <button type="button" id="qty-minus" aria-label="Decrease">−</button>
              <input type="number" id="product-qty" data-qty value="1" min="1" max="20" readonly>
              <button type="button" id="qty-plus" aria-label="Increase">+</button>
            </div>
          </div>
          <div class="btn-group">
            <button type="button" class="btn btn--primary btn--lg" data-add-cart="${product.id}" id="btn-add-cart">
              Add to Cart
            </button>
            <a href="cart.html" class="btn btn--secondary btn--lg">View Cart</a>
          </div>
          <p class="mt-xl" style="font-size:0.9rem;color:var(--color-text-soft)">
            <a href="menu.html">← Back to full menu</a>
          </p>
        </div>
      </div>`;

    const qtyInput = document.getElementById("product-qty");
    document.getElementById("qty-minus")?.addEventListener("click", () => {
      qtyInput.value = String(Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1));
    });
    document.getElementById("qty-plus")?.addEventListener("click", () => {
      qtyInput.value = String(Math.min(20, (parseInt(qtyInput.value, 10) || 1) + 1));
    });

    renderRelated(product);
  }

  function renderRelated(product) {
    const wrap = document.getElementById("related-wrap");
    const grid = document.getElementById("related-grid");
    if (!wrap || !grid || !window.AURUM_PRODUCTS) return;

    const related = AURUM_PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 3);

    if (!related.length) {
      wrap.hidden = true;
      return;
    }

    wrap.hidden = false;
    grid.innerHTML = related
      .map(
        (p) => `
      <article class="menu-card">
        <a class="menu-card__link" href="product.html?id=${encodeURIComponent(p.id)}">
          <div class="menu-card__image">
            ${p.tag ? `<span class="menu-card__tag">${p.tag}</span>` : ""}
            <img src="${p.image}" alt="${p.name}" loading="lazy" width="700" height="525">
          </div>
          <div class="menu-card__body">
            <div class="menu-card__meta">
              <h3 class="menu-card__name">${p.name}</h3>
              <span class="menu-card__price">${money(p.price)}</span>
            </div>
            <p class="menu-card__desc">${p.desc}</p>
          </div>
        </a>
        <div class="menu-card__actions">
          <a class="btn btn--secondary btn--sm" href="product.html?id=${encodeURIComponent(p.id)}">View</a>
          <button type="button" class="btn btn--primary btn--sm" data-add-cart="${p.id}">Add to Cart</button>
        </div>
      </article>`
      )
      .join("");
  }

  function boot() {
    if (!window.AURUM_PRODUCTS) {
      const root = document.getElementById("product-root");
      if (root) {
        root.innerHTML = `
          <div class="cart-empty">
            <h2>Unable to load products</h2>
            <p>Please refresh the page or return to the menu.</p>
            <a href="menu.html" class="btn btn--primary">Back to Menu</a>
          </div>`;
      }
      return;
    }
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
