# Maji Flowers — React Frontend

A responsive, frontend-only florist storefront and event-planning website built with React, Vite, React Router, Framer Motion and Lucide icons.

## Included in this package

- Premium editorial-style homepage with responsive navigation and footer
- Flower catalogue with category filters, search, sorting and product detail pages
- Product enquiry basket with quantity controls
- Multi-step wedding and event planner (occasion, decoration areas, theme, design inspiration, flowers, quantities, event details and reference-image preview)
- Curated event design directions
- Inspiration gallery with category filters and image lightbox
- About and contact pages
- Structured WhatsApp enquiry messages routed to **+91 94915 54114**
- Demo admin dashboard with catalogue, event design, gallery and enquiry management
- Browser-local persistence for demo products, cart, event designs, gallery entries and enquiries
- Responsive layouts and reduced-motion support

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Vite will print the local development URL (normally `http://localhost:5173`).

Create a production build:

```bash
npm run build
npm run preview
```

## Demo admin access

Open `/admin` or choose **Admin access** in the website footer.

- Email: `admin@majiflowers.in`
- Password: `maji-demo`

This is a **frontend demonstration login only**. It is not secure authentication and must not be used to protect real business or customer data.

## Frontend behaviour and current limitations

This deliverable intentionally contains no backend, API, database, real authentication, payment processing, stock integration or server-side file storage.

- The catalogue, cart, event designs, gallery and submitted enquiry records are stored in the current browser's `localStorage`. They are not shared between devices or administrators.
- The cart is an enquiry basket, not a checkout. No payment is taken and an enquiry is not automatically a confirmed order.
- WhatsApp opens with a prefilled message. Customers still need to send that message in WhatsApp. Browsers do not allow a website to attach the selected reference image automatically; the planner previews the chosen image locally and asks the customer to share it separately in WhatsApp.
- The contact form also opens WhatsApp. It does not send or store data on a server.
- The demo admin login is stored in browser `localStorage` and can be bypassed by a visitor with browser access. Add real authentication, role permissions and API authorization before production use.
- Product pricing is deliberately shown as **Price on request** because verified retail and wholesale prices were not provided.
- Some visual photos are remote web image references used for design demonstration. Gallery captions explicitly describe them as inspiration, not as Maji Flowers' verified previous work. Replace them with business-owned or properly licensed photographs and confirm usage rights before publishing commercially.
- Exact shop address, map pin, opening hours, delivery zones, delivery charges, flower grades, stock, units, event service scope, package pricing and cancellation/advance policies must be confirmed with the business before launch.

## WhatsApp number and business details

The WhatsApp number is configured in `src/data.js` as `WHATSAPP_NUMBER`. The displayed phone and business area are also configured there. Update those constants if the business confirms different details.

## Project structure

```text
src/
  components/  Shared navigation, footer, buttons and UI helpers
  pages/       Home, shop, product, events, cart, gallery, about, contact and admin
  data.js      Demo catalogue, design directions, gallery and business constants
  store.jsx    Browser-local demo state and persistence
  App.jsx      Client-side routes
  styles.css   Responsive visual system and page styling
```

## Deploy to Vercel

1. Push this folder to a Git repository.
2. Import the repository into Vercel.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Keep the included `vercel.json` so direct visits to client-side routes resolve to the React app.

For a live business website, connect a backend and managed database, replace browser-local persistence with APIs, implement secure admin authentication, and verify all business content and image permissions before launch.
