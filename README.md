# Amazon Storefront (Frontend + Minimal Backend Integration)

A modular, Amazon-style storefront built with **HTML, CSS, and JavaScript modules**.  
It renders a product grid, supports a cart and checkout flow, shows past orders, and includes a tracking page.  
A tiny backend integration is used to **place orders** via a public demo API.

---

## What’s included

- **Pages**
  - `amazon.html` – product listing page with header, search bar, and dynamic products grid. It loads `scripts/amazon.js` as an ES module to render products and handle “Add to Cart”.
  - `checkout.html` – cart & checkout page that renders an **Order Summary** and **Payment Summary**. It imports `scripts/checkout.js`.
  - `orders.html` – static Orders history UI (with “Track package” buttons linking to the tracker).
  - `tracking.html` – shipment progress page; reads `orderId` / `productId` from the URL (via `URLSearchParams`).

- **Scripts (ES Modules)**
  - `scripts/amazon.js` – loads product data, renders product cards, and wires **Add to Cart**; also updates the cart count badge.
  - `scripts/checkout.js` – bootstraps checkout: loads products + cart, then renders order & payment summaries.=
  - `scripts/checkout/orderSummary.js` – renders each cart line, delivery options, and hooks up Delete/Update & delivery selection. Uses `dayjs` for date math and helper `formatCurrency()`. 
  - `scripts/checkout/paymentSummary.js` – calculates totals (items, shipping, tax, order total) and **places the order**; on success it saves the order and redirects to `orders.html`. 
  - `scripts/utils/money.js` – formats cents → dollars (`12.34`).

- **Data**
  - `data/products.json` – product catalog (id, image, name, rating, priceCents, etc.). (Other data modules like `cart.js`, `orders.js`, `products.js`, `deliveryOptions.js` are referenced by the scripts.)

- **Styles**
  - Shared header + general styles and per-page CSS (referenced from each HTML page). 

---

## How it works

1. **Product listing**
   - `amazon.html` loads `products` (via a module that fetches `data/products.json`) and renders each item: image, name, rating, price, quantity selector, and “Add to Cart”. On click, `addToCart(productId)` updates the cart, and the **cart quantity badge** is refreshed. 

2. **Checkout**
   - `checkout.html` calls `loadProductsFetch()` and `loadCart()`, then:
     - `orderSummary.js` prints each cart row, computes **estimated delivery date** per delivery option using `dayjs`, and handles **Delete** / **Change delivery option** actions. 
     - `paymentSummary.js` computes **items**, **shipping**, **tax**, and **total**, and renders a **Place Order** button.

3. **Order placement (minimal backend)**
   - On “Place your order”, the app POSTs `{ cart }` to a demo endpoint `https://supersimplebackend.dev/orders`, receives the created order JSON, saves it via `addOrder()`, then navigates to `orders.html`. :contentReference[oaicite:15]{index=15}

4. **Orders & tracking**
   - `orders.html` displays example orders (UI scaffold). “Track package” links to `tracking.html` (can include `?orderId=...&productId=...`). The tracking page parses those params and shows progress states.

---

## Price & totals

- Prices are stored in **cents**; `formatCurrency(priceCents)` renders dollars with 2 decimals. 
- Subtotal = sum(item `priceCents` × `quantity`)
- Shipping = sum of selected delivery options per item
- Tax = 10% of (subtotal + shipping)
- Total = subtotal + shipping + tax  
 
---

## Run locally

Because ES modules and JSON fetches require HTTP, use a local live server:

---

## Notes
- The order POST uses a public demo endpoint; swap it for your own backend when ready. 
- If you deploy statically (e.g., GitHub Pages), ensure paths to images, JSON, and modules remain valid.

---

## Author
- Developed by Nicolas Constantinou
- 2025
