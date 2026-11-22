# ⚡ ShopWave — Premium E-Commerce Product Catalog

A modern, production-ready **Full-Stack Capstone Project** built with **React + Vite** as part of a Web Development internship. ShopWave is a premium e-commerce product catalog featuring client-side routing, modular architecture, state management, and performance-optimized builds.

---

## 🚀 Live Demo

[![Live Demo on Render](https://img.shields.io/badge/Render-Live%20Demo-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://shopwave-catalog.onrender.com)
[![API Health Check](https://img.shields.io/badge/API-Health%20OK-brightgreen?style=for-the-badge)](https://shopwave-catalog.onrender.com/api/health)

👉 **Live Web App**: [https://shopwave-catalog.onrender.com](https://shopwave-catalog.onrender.com)  
👉 **Live API Health**: [https://shopwave-catalog.onrender.com/api/health](https://shopwave-catalog.onrender.com/api/health)  
👉 **Live Products API**: [https://shopwave-catalog.onrender.com/api/products](https://shopwave-catalog.onrender.com/api/products)

---

## ✨ Features

- 🛍️ **Product Catalog** — 36 curated products across 5 categories (Electronics, Fashion, Home, Sports, Beauty)
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
| **Vite 8** | Frontend Build Tool & Dev Server |
| **Node.js & Express** | RESTful Backend API Server |
| **React Router v6** | Client-Side Routing |
| **Context API** | Global State (Cart, Wishlist, Toasts) |
| **JSON Database** | Persistent Storage for Orders & Catalog |
| **Vanilla CSS** | Custom Design System (no frameworks) |
| **Vercel / Render** | Deployment |

---

## 📁 Project Structure

```
shopwave-catalog/
├── server/
│   ├── data/
│   │   ├── products.json       # Product catalog storage
│   │   └── orders.json         # Persistent orders storage
│   ├── routes/
│   │   ├── productRoutes.js    # /api/products & /api/categories endpoints
│   │   └── orderRoutes.js      # /api/orders (POST checkout & GET history)
│   └── server.js               # Express API server entry point
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky nav + scroll effect + badges
│   │   ├── ProductCard.jsx     # Product card with hover animations
│   │   ├── CartDrawer.jsx      # Sliding cart drawer + live API checkout
│   │   ├── Footer.jsx          # Full footer with links
│   │   └── ToastContainer.jsx  # Toast notification system
│   ├── context/
│   │   └── ShopContext.jsx     # Global cart + wishlist + toasts + clearCart
│   ├── data/
│   │   └── products.js         # Fallback product catalog data (36 items)
│   ├── pages/
│   │   ├── HomePage.jsx        # Hero + categories + featured products
│   │   ├── ProductsPage.jsx    # Search + filter + sort listing
│   │   ├── ProductDetailPage.jsx # Image gallery + features + related
│   │   ├── WishlistPage.jsx    # Saved products
│   │   └── AboutPage.jsx       # Story + tech stack + team
│   ├── App.jsx                 # Routes + Provider + Layout
│   └── index.css               # Design system (glassmorphism + animations)
├── index.html                  # HTML entry with SEO meta tags
├── vite.config.js              # Vite config with API proxy + code splitting
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

# 3. Start Backend API Server (Port 5000)
npm run server
# → API running at http://localhost:5000/api/health

# 4. In a second terminal, start Frontend Dev Server (Port 5173)
npm run dev
# → Frontend opens at http://localhost:5173

# 5. Build for production
npm run build
```

---

## 🔌 Backend API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Service health status check |
| `GET` | `/api/products` | Retrieve all products (supports `?category=`, `?badge=`, `?search=`, `?sort=`) |
| `GET` | `/api/products/:id` | Get single product by numeric ID |
| `GET` | `/api/categories` | Retrieve all 5 shopping categories |
| `POST` | `/api/orders` | Place a new customer order & save to `orders.json` |
| `GET` | `/api/orders` | View placed orders history |
| `GET` | `/api/orders/:id` | Lookup a specific order by Order ID |

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
