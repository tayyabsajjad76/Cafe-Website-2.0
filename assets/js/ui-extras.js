/**
 * Aurum Café — Newsletter popup + AI chat assistant (all pages)
 */
(function () {
  "use strict";

  function basePath() {
    return /\/pages\//.test(location.pathname) ? "../" : "";
  }

  function ensureStylesOk() {
    /* components rely on CSS already loaded */
  }

  /* ---------- Newsletter Modal ---------- */
  function initNewsletter() {
    if (sessionStorage.getItem("aurum_nl_seen") === "1") return;
    if (document.querySelector(".nl-modal")) return;

    const modal = document.createElement("div");
    modal.className = "nl-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "nl-title");
    modal.innerHTML = `
      <div class="nl-modal__backdrop" data-nl-close></div>
      <div class="nl-modal__panel">
        <button type="button" class="nl-modal__close" data-nl-close aria-label="Close">&times;</button>
        <div class="nl-modal__media">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80" alt="" width="700" height="500">
        </div>
        <div class="nl-modal__body">
          <p class="eyebrow">Stay in the Loop</p>
          <h2 id="nl-title">Subscribe to Our Newsletter</h2>
          <p>Seasonal menus, roasting notes, and early access to tasting events — once a month.</p>
          <form class="nl-modal__form" novalidate>
            <label class="sr-only" for="nl-email-popup">Email</label>
            <input type="email" id="nl-email-popup" placeholder="Your email address" required>
            <button type="submit" class="btn btn--primary" style="width:100%">Subscribe</button>
          </form>
          <button type="button" class="nl-modal__skip" data-nl-close>No thanks</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const close = () => {
      modal.classList.remove("is-open");
      sessionStorage.setItem("aurum_nl_seen", "1");
      document.body.style.overflow = "";
      setTimeout(() => modal.remove(), 400);
    };

    modal.querySelectorAll("[data-nl-close]").forEach((el) =>
      el.addEventListener("click", close)
    );

    modal.querySelector("form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = modal.querySelector("#nl-email-popup");
      if (!input.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        input.focus();
        input.classList.add("is-invalid");
        return;
      }
      sessionStorage.setItem("aurum_nl_seen", "1");
      modal.querySelector(".nl-modal__body").innerHTML = `
        <p class="eyebrow">Welcome</p>
        <h2>You're subscribed</h2>
        <p>Thank you — watch your inbox for the next Aurum note.</p>
        <button type="button" class="btn btn--primary" data-nl-close style="width:100%">Continue browsing</button>
      `;
      modal.querySelector("[data-nl-close]")?.addEventListener("click", close);
    });

    setTimeout(() => {
      modal.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }, 1200);
  }

  /* ---------- AI Chat Bot ---------- */
  const BOT_REPLIES = [
    {
      keys: ["hours", "open", "timing", "time"],
      reply:
        "We're open Mon–Fri 7:00–20:00, Saturday 8:00–21:00, and Sunday 8:00–18:00. Would you like to reserve a table?",
    },
    {
      keys: ["reserv", "book", "table"],
      reply:
        "You can book online on our Reservation page. I can also note that weekends fill quickly — book ahead if you can!",
    },
    {
      keys: ["menu", "food", "coffee", "price"],
      reply:
        "Our menu covers breakfast, lunch, specialty coffee, tea, cold drinks, desserts, and bakery. Browse the Menu page and tap any item for details or Add to Cart.",
    },
    {
      keys: ["cart", "order", "checkout", "payment", "shipping"],
      reply:
        "Add items from the Menu or product pages, then open Cart from the header. Checkout asks for shipping details and payment (Card, Cash on Delivery, or JazzCash/EasyPaisa style demo).",
    },
    {
      keys: ["address", "location", "where", "map"],
      reply: "We're at 142 Willow Lane, Suite 3, Portland, OR 97205. See Contact for the map and directions.",
    },
    {
      keys: ["phone", "call", "contact", "email"],
      reply:
        "Call +1 (503) 555-0142 or email hello@aurumcafe.com. You can also use the Contact form — we reply within one business day.",
    },
    {
      keys: ["wifi", "parking", "vegan", "gluten"],
      reply:
        "Free Wi‑Fi is available. Street parking on Willow Lane. We offer plant-based milks and mark vegan / gluten-conscious options on the menu.",
    },
    {
      keys: ["hello", "hi", "hey", "salam"],
      reply: "Hello! I'm Aurum Assistant. Ask me about hours, menu, reservations, orders, or how to reach us.",
    },
  ];

  function botAnswer(text) {
    const q = text.toLowerCase();
    for (const row of BOT_REPLIES) {
      if (row.keys.some((k) => q.includes(k))) return row.reply;
    }
    return "Thanks for your message! For quick help try asking about hours, menu, reservations, cart/checkout, or contact. You can also visit our Contact page anytime.";
  }

  function initChat() {
    if (document.querySelector(".chat-bot")) return;
    const base = basePath();

    const wrap = document.createElement("div");
    wrap.className = "chat-bot";
    wrap.innerHTML = `
      <button type="button" class="chat-bot__toggle" aria-label="Open chat assistant" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M21 15a4 4 0 01-4 4H7l-4 3V7a4 4 0 014-4h10a4 4 0 014 4z"/>
        </svg>
        <span class="chat-bot__pulse"></span>
      </button>
      <div class="chat-bot__panel" id="aurum-chat-panel" hidden>
        <div class="chat-bot__head">
          <div>
            <strong>Aurum Assistant</strong>
            <span>Quick answers & contact</span>
          </div>
          <button type="button" class="chat-bot__x" aria-label="Close chat">&times;</button>
        </div>
        <div class="chat-bot__messages" role="log" aria-live="polite"></div>
        <div class="chat-bot__quick">
          <button type="button" data-q="What are your hours?">Hours</button>
          <button type="button" data-q="How do I reserve a table?">Reserve</button>
          <button type="button" data-q="How does the cart work?">Cart</button>
          <a href="${base}pages/contact.html">Contact page</a>
        </div>
        <form class="chat-bot__form">
          <input type="text" placeholder="Ask a question…" aria-label="Chat message" autocomplete="off">
          <button type="submit" aria-label="Send">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(wrap);

    const toggle = wrap.querySelector(".chat-bot__toggle");
    const panel = wrap.querySelector(".chat-bot__panel");
    const closeBtn = wrap.querySelector(".chat-bot__x");
    const msgs = wrap.querySelector(".chat-bot__messages");
    const form = wrap.querySelector(".chat-bot__form");
    const input = form.querySelector("input");

    function addMsg(text, who) {
      const div = document.createElement("div");
      div.className = `chat-msg chat-msg--${who}`;
      div.textContent = text;
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function openChat() {
      panel.hidden = false;
      panel.classList.add("is-open");
      wrap.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      if (!msgs.dataset.greeted) {
        addMsg("Hi! I'm Aurum Assistant. Ask about hours, menu, reservations, orders, or contact info.", "bot");
        msgs.dataset.greeted = "1";
      }
      setTimeout(() => input.focus(), 50);
    }

    function closeChat(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      panel.hidden = true;
      panel.classList.remove("is-open");
      wrap.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (wrap.classList.contains("is-open")) closeChat(e);
      else openChat();
    });

    closeBtn.addEventListener("click", closeChat);

    wrap.querySelectorAll("[data-q]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const q = btn.getAttribute("data-q");
        addMsg(q, "user");
        setTimeout(() => addMsg(botAnswer(q), "bot"), 350);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
      addMsg(q, "user");
      input.value = "";
      setTimeout(() => addMsg(botAnswer(q), "bot"), 400);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    ensureStylesOk();
    initNewsletter();
    initChat();
  });
})();
