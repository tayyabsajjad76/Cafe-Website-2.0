/**
 * Aurum Café — Cart (localStorage)
 */
(function () {
  "use strict";

  const KEY = "aurum_cart_v1";

  function basePath() {
    return /\/pages\//.test(location.pathname) ? "../" : "";
  }

  function read() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  }

  function write(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    updateBadges();
    document.dispatchEvent(new CustomEvent("aurum:cart-updated", { detail: items }));
  }

  function count() {
    return read().reduce((s, i) => s + i.qty, 0);
  }

  function subtotal() {
    return read().reduce((s, i) => s + i.price * i.qty, 0);
  }

  function add(productId, qty = 1) {
    const product = window.AURUM_getProduct?.(productId);
    if (!product) return false;
    const items = read();
    const existing = items.find((i) => i.id === productId);
    if (existing) existing.qty += qty;
    else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty,
      });
    }
    write(items);
    toast(`${product.name} added to cart`);
    return true;
  }

  function setQty(productId, qty) {
    let items = read();
    const item = items.find((i) => i.id === productId);
    if (!item) return;
    if (qty <= 0) items = items.filter((i) => i.id !== productId);
    else item.qty = qty;
    write(items);
  }

  function remove(productId) {
    write(read().filter((i) => i.id !== productId));
  }

  function clear() {
    write([]);
  }

  function updateBadges() {
    const n = count();
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = String(n);
      el.hidden = n === 0;
      el.classList.toggle("is-empty", n === 0);
    });
  }

  function toast(msg) {
    let el = document.querySelector(".cart-toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "cart-toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("is-visible");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("is-visible"), 2200);
  }

  function bindAddButtons() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-add-cart]");
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      const id = btn.getAttribute("data-add-cart");
      const qtyInput = btn.closest("[data-product-root]")?.querySelector("[data-qty]");
      const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value, 10) || 1) : 1;
      add(id, qty);
    });
  }

  window.AURUM_CART = {
    read,
    add,
    setQty,
    remove,
    clear,
    count,
    subtotal,
    updateBadges,
    basePath,
    toast,
  };

  document.addEventListener("DOMContentLoaded", () => {
    updateBadges();
    bindAddButtons();
  });
})();
