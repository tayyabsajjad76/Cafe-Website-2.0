# Aurum Café — Premium Multi-Page Website

A production-ready specialty café website built with **HTML5**, **CSS3**, and **Vanilla JavaScript** only — no frameworks, no Bootstrap, no Tailwind.

**Brand:** Aurum Café  
**Tone:** Quiet luxury, craft coffee, artisan bakery

---

## Pages

| Page | Path |
|------|------|
| Home | `index.html` |
| About | `pages/about.html` |
| Menu | `pages/menu.html` |
| Product detail | `pages/product.html?id=...` |
| Cart | `pages/cart.html` |
| Checkout | `pages/checkout.html` |
| Gallery | `pages/gallery.html` |
| Blog | `pages/blog.html` |
| Reservation | `pages/reservation.html` |
| Contact | `pages/contact.html` |
| 404 | `pages/404.html` |

### Shopping & extras
- Add to Cart on menu / product / home featured items (localStorage)
- Header cart badge on every page
- Checkout with shipping + payment methods (demo)
- Newsletter popup on first visit (session)
- Blog section on home + `pages/blog.html`
- Aurum Assistant chat bot (bottom-right) on all pages

## Folder Structure

```
Cafe Website/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   ├── animations.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   ├── shop.js
│   │   └── ui-extras.js
│   ├── images/
│   └── icons/
└── pages/
    ├── about.html
    ├── menu.html
    ├── product.html
    ├── cart.html
    ├── checkout.html
    ├── gallery.html
    ├── blog.html
    ├── reservation.html
    ├── contact.html
    └── 404.html
```

---

## Features

- Sticky header with scroll state and mobile hamburger menu
- Full-bleed home hero with brand-first composition
- Menu filtering by category (Vanilla JS)
- Gallery lightbox with keyboard navigation
- Reservation & contact forms with client-side validation
- FAQ accordion, animated counters, scroll reveals
- Newsletter signup, social links, back-to-top
- Fully responsive (desktop → mobile landscape)
- Semantic HTML, SEO meta tags, lazy-loaded images
- Accessibility: focus styles, ARIA labels, reduced-motion support

---

## Getting Started

Open `index.html` in a browser, or serve locally:

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Then visit `http://localhost:8080`.

---

## Design System

| Token | Value |
|-------|--------|
| Primary | Pure white / off-white |
| Accent | Coffee brown `#3d2914` |
| Secondary accent | Forest green `#2c4a3e` |
| Highlight | Gold `#c4a35a` |
| Soft surface | Warm cream `#f5efe6` |
| Display font | Playfair Display |
| Body font | Poppins |
| UI font | Inter |

Images are loaded from [Unsplash](https://unsplash.com) via CDN for high-quality café photography.

---

## Customization Notes

1. **Google Maps** — On `pages/contact.html`, replace the map placeholder with your embed iframe when you have a Maps key.
2. **Forms** — Currently validate and show success states client-side. Connect to your backend or a form service for production.
3. **Local images** — Drop files into `assets/images/` and update `src` paths if you prefer offline assets.

---

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses CSS custom properties, Flexbox/Grid, and Intersection Observer.

---

## License

Demo project for educational / portfolio use. Unsplash images remain under their respective licenses.
