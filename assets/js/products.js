/**
 * Aurum Café — Product Catalog
 * Shared by menu, product detail, cart, and checkout
 */
window.AURUM_PRODUCTS = [
  {
    id: "aurum-breakfast",
    name: "Aurum Breakfast",
    price: 16.0,
    category: "breakfast",
    tag: "Best Seller",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80",
    desc: "Soft scrambled eggs, herb butter toast, avocado, house-cured salmon, and greens.",
    longDesc:
      "Our signature morning plate: farm eggs scrambled soft with crème fraîche, sourdough toasted in herb butter, ripe avocado, house-cured salmon, and a handful of dressed greens. Designed for a slow start or a proper brunch.",
  },
  {
    id: "spiced-shakshuka",
    name: "Spiced Shakshuka",
    price: 14.5,
    category: "breakfast",
    tag: "New",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
    desc: "Tomato-pepper stew, baked eggs, labneh, and warm flatbread for dipping.",
    longDesc:
      "A North African classic adapted for Aurum: slow-cooked tomatoes and peppers with warm spices, eggs baked until just set, cool labneh, and flatbread fresh from the oven.",
  },
  {
    id: "granola-bowl",
    name: "House Granola Bowl",
    price: 11.0,
    category: "breakfast",
    tag: "",
    image: "https://images.unsplash.com/photo-1517672651691-24622a91b550?auto=format&fit=crop&w=900&q=80",
    desc: "Toasted oat granola, coconut yogurt, seasonal fruit, and wildflower honey.",
    longDesc:
      "House-toasted oats with nuts and seeds, coconut yogurt, seasonal fruit, and a drizzle of local wildflower honey. Light, bright, and naturally gluten-conscious on request.",
  },
  {
    id: "chicken-sandwich",
    name: "Herb Roast Chicken Sandwich",
    price: 15.0,
    category: "lunch",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80",
    desc: "Sourdough, lemon aioli, pickled shallots, and crisp gem lettuce.",
    longDesc:
      "Herb-roasted chicken breast on country sourdough with lemon aioli, pickled shallots, and gem lettuce. Served with a side of seasonal greens.",
  },
  {
    id: "grain-bowl",
    name: "Seasonal Grain Bowl",
    price: 14.0,
    category: "lunch",
    tag: "",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    desc: "Farro, roasted vegetables, soft herbs, and tahini-lemon dressing.",
    longDesc:
      "Nutty farro, market vegetables roasted until caramelized, soft herbs, and a bright tahini-lemon dressing. Satisfying, colorful, and fully plant-based.",
  },
  {
    id: "tomato-soup",
    name: "Roasted Tomato Soup",
    price: 9.5,
    category: "lunch",
    tag: "",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
    desc: "Slow-roasted tomatoes, basil oil, and grilled cheese soldiers.",
    longDesc:
      "Tomatoes roasted low and slow, blended silky, finished with basil oil. Comes with crisp grilled-cheese soldiers for dipping.",
  },
  {
    id: "espresso",
    name: "Single Origin Espresso",
    price: 4.5,
    category: "coffee",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
    desc: "Rotating lot — currently Ethiopian Yirgacheffe with citrus and cocoa.",
    longDesc:
      "Pulled to order on our La Marzocco from a rotating single-origin lot. Currently featuring Ethiopian Yirgacheffe — citrus brightness with a cocoa finish.",
  },
  {
    id: "flat-white",
    name: "Flat White",
    price: 5.25,
    category: "coffee",
    tag: "Best Seller",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
    desc: "Double ristretto with velvety microfoam — our house signature.",
    longDesc:
      "Two ristretto shots crowned with silky microfoam. The Aurum flat white is dialed daily for balance — never bitter, never watery.",
  },
  {
    id: "oat-cappuccino",
    name: "Oat Cappuccino",
    price: 5.75,
    category: "coffee",
    tag: "New",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80",
    desc: "Barista-blend oat milk and our house espresso — silky and balanced.",
    longDesc:
      "Barista-blend oat milk steamed to a fine foam over house espresso. Naturally dairy-free without sacrificing texture.",
  },
  {
    id: "earl-grey",
    name: "Earl Grey Supreme",
    price: 4.75,
    category: "tea",
    tag: "",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80",
    desc: "Bergamot-forward black tea with cornflower petals — pot for one.",
    longDesc:
      "A classic Earl Grey with pronounced bergamot and cornflower petals, served as a pot for one with honey on the side.",
  },
  {
    id: "chamomile",
    name: "Chamomile & Honey",
    price: 4.25,
    category: "tea",
    tag: "",
    image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=900&q=80",
    desc: "Whole-flower chamomile with local wildflower honey on the side.",
    longDesc:
      "Whole-flower chamomile steeped gently and served with local wildflower honey. Ideal for late afternoons and wind-downs.",
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    price: 5.0,
    category: "cold",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
    desc: "16-hour steep, chocolate-forward, served over ice with optional oat milk.",
    longDesc:
      "Coarse-ground coffee steeped for sixteen hours, resulting in a smooth, chocolate-forward cup. Served over ice; oat milk optional.",
  },
  {
    id: "iced-matcha",
    name: "Iced Vanilla Matcha",
    price: 5.75,
    category: "cold",
    tag: "New",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80",
    desc: "Ceremonial matcha, house vanilla syrup, and cold oat milk over ice.",
    longDesc:
      "Ceremonial matcha shaken with house vanilla syrup and cold oat milk over ice. Creamy, cool, and gently sweet.",
  },
  {
    id: "dark-forest",
    name: "Dark Forest Gateau",
    price: 9.5,
    category: "desserts",
    tag: "Best Seller",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
    desc: "Valrhona sponge, cherry compote, and lightly whipped cream.",
    longDesc:
      "Layers of Valrhona chocolate sponge, sour-cherry compote, and lightly whipped cream. Rich without being heavy.",
  },
  {
    id: "cheesecake",
    name: "Lemon Ricotta Cheesecake",
    price: 8.5,
    category: "desserts",
    tag: "",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80",
    desc: "Silky ricotta filling, shortbread base, and candied citrus zest.",
    longDesc:
      "A lighter take on cheesecake: whipped ricotta, buttery shortbread base, and candied citrus zest for brightness.",
  },
  {
    id: "affogato",
    name: "Affogato",
    price: 7.0,
    category: "desserts",
    tag: "",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80",
    desc: "Vanilla bean gelato drowned in a hot double espresso.",
    longDesc:
      "A scoop of vanilla bean gelato drowned in a hot double espresso. Half dessert, half coffee — entirely irresistible.",
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    price: 4.75,
    category: "bakery",
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    desc: "72-layer laminated dough with cultured European butter.",
    longDesc:
      "Seventy-two layers of laminated dough and cultured European butter, baked golden every morning. Flaky, fragrant, and best warm.",
  },
  {
    id: "sourdough",
    name: "Country Sourdough",
    price: 8.0,
    category: "bakery",
    tag: "New",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=900&q=80",
    desc: "Naturally leavened loaf — available whole or by the slice with butter.",
    longDesc:
      "Naturally leavened country loaf with a crackling crust and open crumb. Available whole to take home, or by the slice with cultured butter.",
  },
];

window.AURUM_getProduct = function (id) {
  return (window.AURUM_PRODUCTS || []).find((p) => p.id === id) || null;
};

window.AURUM_formatPrice = function (n) {
  return "$" + Number(n).toFixed(2);
};
