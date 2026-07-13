/**
 * Aurum Café — Menu render, product detail, cart page, checkout
 */
(function () {
  "use strict";

  function money(n) {
    return window.AURUM_formatPrice ? AURUM_formatPrice(n) : "$" + Number(n).toFixed(2);
  }

  function base() {
    return window.AURUM_CART ? AURUM_CART.basePath() : /\/pages\//.test(location.pathname) ? "../" : "";
  }

  function tagClass(tag) {
    if (!tag) return "";
    const t = tag.toLowerCase();
    if (t.includes("new")) return "menu-card__tag--new";
    if (t.includes("popular")) return "menu-card__tag--popular";
    return "";
  }

  /* ---------- Menu grid ---------- */
  function renderMenu() {
    const grid = document.querySelector("[data-menu-grid]");
    if (!grid || !window.AURUM_PRODUCTS) return;
    const b = base();
    grid.innerHTML = AURUM_PRODUCTS.map(
      (p) => `
      <article class="menu-card menu-item" data-category="${p.category}" data-product-id="${p.id}">
        <a class="menu-card__link" href="${b}pages/product.html?id=${encodeURIComponent(p.id)}">
          <div class="menu-card__image">
            ${p.tag ? `<span class="menu-card__tag ${tagClass(p.tag)}">${p.tag}</span>` : ""}
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
          <a class="btn btn--secondary btn--sm" href="${b}pages/product.html?id=${encodeURIComponent(p.id)}">View</a>
          <button type="button" class="btn btn--primary btn--sm" data-add-cart="${p.id}">Add to Cart</button>
        </div>
      </article>`
    ).join("");
  }

  /* ---------- Product detail (legacy hook — product-page.js handles product.html) ---------- */
  function renderProduct() {
    /* Skip if dedicated product-page.js is present */
    if (document.querySelector('script[src*="product-page.js"]')) return;

    const root = document.querySelector("[data-product-page]");
    if (!root) return;
    const id = new URLSearchParams(location.search).get("id");
    const product = window.AURUM_getProduct?.(id);
    const b = base();

    if (!product) {
      root.innerHTML = `
        <div class="cart-empty">
          <h2>Product not found</h2>
          <p>This item may have been removed from the menu.</p>
          <a href="${b}pages/menu.html" class="btn btn--primary">Back to Menu</a>
        </div>`;
      return;
    }

    document.title = `${product.name} — Aurum Café`;
    root.innerHTML = `
      <div class="product-detail" data-product-root>
        <div class="product-detail__media">
          <img src="${product.image}" alt="${product.name}" width="900" height="900">
        </div>
        <div>
          ${product.tag ? `<span class="product-detail__tag">${product.tag}</span>` : ""}
          <p class="eyebrow">${product.category}</p>
          <h1 class="section-title" style="margin-bottom:0">${product.name}</h1>
          <p class="product-detail__price">${money(product.price)}</p>
          <p class="product-detail__desc">${product.longDesc || product.desc}</p>
          <div class="qty-row">
            <div class="qty-control" aria-label="Quantity">
              <button type="button" data-qty-minus aria-label="Decrease">−</button>
              <input type="number" data-qty value="1" min="1" max="20" readonly>
              <button type="button" data-qty-plus aria-label="Increase">+</button>
            </div>
          </div>
          <div class="btn-group">
            <button type="button" class="btn btn--primary btn--lg" data-add-cart="${product.id}">Add to Cart</button>
            <a href="${b}pages/cart.html" class="btn btn--secondary btn--lg">View Cart</a>
          </div>
          <p class="mt-xl" style="font-size:0.9rem;color:var(--color-text-soft)">
            <a href="${b}pages/menu.html">← Back to full menu</a>
          </p>
        </div>
      </div>`;

    const qty = root.querySelector("[data-qty]");
    root.querySelector("[data-qty-minus]")?.addEventListener("click", () => {
      qty.value = Math.max(1, (parseInt(qty.value, 10) || 1) - 1);
    });
    root.querySelector("[data-qty-plus]")?.addEventListener("click", () => {
      qty.value = Math.min(20, (parseInt(qty.value, 10) || 1) + 1);
    });
  }

  /* ---------- Cart page ---------- */
  function renderCart() {
    const root = document.querySelector("[data-cart-page]");
    if (!root || !window.AURUM_CART) return;
    const b = base();

    function paint() {
      const items = AURUM_CART.read();
      if (!items.length) {
        root.innerHTML = `
          <div class="cart-empty">
            <h2>Your cart is empty</h2>
            <p>Browse the menu and add something delicious.</p>
            <a href="${b}pages/menu.html" class="btn btn--primary">Explore Menu</a>
          </div>`;
        return;
      }

      const sub = AURUM_CART.subtotal();
      const shipping = sub >= 40 ? 0 : 4.5;
      const total = sub + shipping;

      root.innerHTML = `
        <div class="cart-layout">
          <div>
            ${items
              .map(
                (i) => `
              <div class="cart-item" data-id="${i.id}">
                <img class="cart-item__img" src="${i.image}" alt="">
                <div>
                  <h3 class="cart-item__name"><a href="${b}pages/product.html?id=${encodeURIComponent(i.id)}">${i.name}</a></h3>
                  <p class="cart-item__unit">${money(i.price)} each</p>
                  <div class="qty-control mt-lg" style="margin-top:0.65rem">
                    <button type="button" data-dec="${i.id}">−</button>
                    <input type="number" value="${i.qty}" readonly>
                    <button type="button" data-inc="${i.id}">+</button>
                  </div>
                  <button type="button" class="cart-item__remove" data-remove="${i.id}">Remove</button>
                </div>
                <div class="cart-item__line">${money(i.price * i.qty)}</div>
              </div>`
              )
              .join("")}
          </div>
          <aside class="cart-summary">
            <h3>Order Summary</h3>
            <div class="cart-summary__row"><span>Subtotal</span><span>${money(sub)}</span></div>
            <div class="cart-summary__row"><span>Shipping</span><span>${shipping === 0 ? "Free" : money(shipping)}</span></div>
            <div class="cart-summary__row cart-summary__row--total"><span>Total</span><span>${money(total)}</span></div>
            <p style="font-size:0.8rem;color:var(--color-text-soft);margin:0.75rem 0 1.25rem">Free shipping on orders $40+</p>
            <a href="${b}pages/checkout.html" class="btn btn--primary btn--lg" style="width:100%">Proceed to Checkout</a>
            <a href="${b}pages/menu.html" class="btn btn--secondary btn--sm mt-lg" style="width:100%">Continue Shopping</a>
          </aside>
        </div>`;

      root.querySelectorAll("[data-inc]").forEach((btn) =>
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-inc");
          const item = AURUM_CART.read().find((x) => x.id === id);
          if (item) AURUM_CART.setQty(id, item.qty + 1);
        })
      );
      root.querySelectorAll("[data-dec]").forEach((btn) =>
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-dec");
          const item = AURUM_CART.read().find((x) => x.id === id);
          if (item) AURUM_CART.setQty(id, item.qty - 1);
        })
      );
      root.querySelectorAll("[data-remove]").forEach((btn) =>
        btn.addEventListener("click", () => AURUM_CART.remove(btn.getAttribute("data-remove")))
      );
    }

    paint();
    document.addEventListener("aurum:cart-updated", paint);
  }

  /* ---------- Checkout ---------- */
  function renderCheckout() {
    const formRoot = document.querySelector("[data-checkout-form]");
    const summary = document.querySelector("[data-checkout-summary]");
    const success = document.querySelector("[data-checkout-success]");
    if (!formRoot || !window.AURUM_CART) return;
    const b = base();

    function paintSummary() {
      if (!summary) return;
      const items = AURUM_CART.read();
      if (!items.length) {
        summary.innerHTML = `<p>Your cart is empty. <a href="${b}pages/menu.html">Browse menu</a></p>`;
        return;
      }
      const sub = AURUM_CART.subtotal();
      const shipping = sub >= 40 ? 0 : 4.5;
      summary.innerHTML = `
        <div class="checkout-card">
          <h3>Your Order</h3>
          ${items
            .map(
              (i) => `
            <div class="cart-summary__row">
              <span>${i.name} × ${i.qty}</span>
              <span>${money(i.price * i.qty)}</span>
            </div>`
            )
            .join("")}
          <div class="cart-summary__row"><span>Shipping</span><span>${shipping === 0 ? "Free" : money(shipping)}</span></div>
          <div class="cart-summary__row cart-summary__row--total"><span>Total</span><span>${money(sub + shipping)}</span></div>
        </div>`;
    }

    paintSummary();

    if (!AURUM_CART.read().length) {
      formRoot.innerHTML = `
        <div class="cart-empty">
          <h2>Nothing to checkout</h2>
          <p>Add items to your cart first.</p>
          <a href="${b}pages/menu.html" class="btn btn--primary">Explore Menu</a>
        </div>`;
      return;
    }

    const payRadios = formRoot.querySelectorAll('input[name="payment"]');
    const cardFields = formRoot.querySelector("[data-card-fields]");
    payRadios.forEach((r) =>
      r.addEventListener("change", () => {
        const selected = formRoot.querySelector('input[name="payment"]:checked');
        cardFields?.classList.toggle("is-visible", selected?.value === "card");
      })
    );

    formRoot.addEventListener("submit", (e) => {
      e.preventDefault();
      const required = [...formRoot.querySelectorAll("[required]")];
      let ok = true;
      required.forEach((field) => {
        const group = field.closest(".form-group");
        const valid = field.type === "radio"
          ? formRoot.querySelector(`input[name="${field.name}"]:checked`)
          : field.value.trim().length > 0;
        if (field.name === "payment") return;
        if (!valid && field.type !== "radio") {
          ok = false;
          group?.classList.add("has-error");
        } else group?.classList.remove("has-error");
      });
      const pay = formRoot.querySelector('input[name="payment"]:checked');
      if (!pay) {
        ok = false;
        AURUM_CART.toast("Please select a payment method");
      }
      if (pay?.value === "card") {
        formRoot.querySelectorAll("[data-card-required]").forEach((f) => {
          if (!f.value.trim()) {
            ok = false;
            f.closest(".form-group")?.classList.add("has-error");
          }
        });
      }
      if (!ok) return;

      AURUM_CART.clear();
      document.querySelector("[data-checkout-layout]")?.setAttribute("hidden", "");
      if (success) {
        success.classList.add("is-visible");
        success.hidden = false;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderMenu();
    renderProduct();
    renderCart();
    renderCheckout();
  });
})();
