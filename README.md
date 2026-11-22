# ⚡ ShopWave — Premium E-Commerce Product Catalog

A modern, production-ready **Full-Stack Capstone Project** built with **React + Vite** as part of a Web Development internship. ShopWave is a premium e-commerce product catalog featuring client-side routing, modular architecture, state management, and performance-optimized builds.

---

## 🚀 Live Demo

> Deploy to Vercel in one click — see deployment guide below.

---

## ✨ Features

- 🛍️ **Product Catalog** — 24 curated products across 5 categories (Electronics, Fashion, Home, Sports, Beauty)
- 🔍 **Search & Filter** — Real-time search, category filtering, and sort (price, rating, popularity)
- 🛒 **Shopping Cart** — Slide-in cart drawer with quantity controls and subtotal
- ♥ **Wishlist** — Save favorite products with live badge counter
- 📱 **Responsive Design** — Works on mobile, tablet, and desktop
- 🌙 **Dark Mode UI** — Glassmorphism design with smooth micro-animations
- 🔔 **Toast Notifications** — Real-time feedback on cart/wishlist actions
- 🗺️ **Client-Side Routing** — 5 pages (Home, Products, Product Detail, Wishlist, About)
- ⚡ **Optimized Build** — Code splitting, tree shaking, gzip compression

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| **React 18** | UI Component Library |
| **Vite 8** | Build Tool & Dev Server |
| **React Router v6** | Client-Side Routing |
| **Context API** | Global State (Cart, Wishlist, Toasts) |
| **Vanilla CSS** | Custom Design System (no frameworks) |
| **Vercel / Render** | Deployment |

---

## 📁 Project Structure

```
shopwave-catalog/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky nav + scroll effect + badges
│   │   ├── ProductCard.jsx     # Product card with hover animations
│   │   ├── CartDrawer.jsx      # Sliding cart drawer
│   │   ├── Footer.jsx          # Full footer with links
│   │   └── ToastContainer.jsx  # Toast notification system
│   ├── context/
│   │   └── ShopContext.jsx     # Global cart + wishlist + toasts
│   ├── data/
│   │   └── products.js         # Product catalog data (24 items)
│   ├── pages/
│   │   ├── HomePage.jsx        # Hero + categories + featured products
│   │   ├── ProductsPage.jsx    # Search + filter + sort listing
│   │   ├── ProductDetailPage.jsx # Image gallery + features + related
│   │   ├── WishlistPage.jsx    # Saved products
│   │   └── AboutPage.jsx       # Story + tech stack + team
│   ├── App.jsx                 # Routes + Provider + Layout
│   └── index.css               # Design system (glassmorphism + animations)
├── index.html                  # HTML entry with SEO meta tags
├── vite.config.js              # Vite config with code splitting
└── package.json
```

---

## ⚡ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/AshieqAhamed27/shopwave-catalog.git
cd shopwave-catalog

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# → Opens at http://localhost:5173

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments on every push.

---

## 📸 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, categories, featured, promo banner |
| Products | `/products` | Full catalog with search + filter + sort |
| Product Detail | `/products/:id` | Image gallery, features, related products |
| Wishlist | `/wishlist` | Saved products |
| About | `/about` | Story, tech stack, team |

---

## 🎯 Internship Requirements

This project fulfills all capstone requirements:

- ✅ **Modular frontend** — Components, Pages, Context, Data layers separated
- ✅ **Client-side routing** — React Router v6 with 5+ routes + 404 fallback
- ✅ **Asset optimization** — Manual chunk splitting, gzip, lazy image loading
- ✅ **Live deployment** — Production build passes, Vercel-ready
- ✅ **Professional UI** — Premium glassmorphism design with animations

---

## 👨‍💻 Author

**Ashieq Ahamed** — Full-Stack Developer  
📧 ashieqahamed4@gmail.com  
🔗 [GitHub](https://github.com/AshieqAhamed27)

---

*Built as a Web Development Capstone Project — 2024*
