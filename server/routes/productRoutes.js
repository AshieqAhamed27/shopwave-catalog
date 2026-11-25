import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';
import { isDBConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../data/products.json');

const router = express.Router();

function getCatalogData() {
  const raw = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Seed MongoDB Product collection from products.json if empty
 */
export async function seedProductsIfNeeded() {
  if (!isDBConnected()) return;
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const { products } = getCatalogData();
      await Product.insertMany(products);
      console.log(`🌱 Seeded ${products.length} products into MongoDB`);
    }
  } catch (err) {
    console.warn('⚠️  Product seed skipped:', err.message);
  }
}

// GET /api/products - list all products with filtering & sorting
router.get('/products', async (req, res) => {
  try {
    const { category, badge, search, sort } = req.query;

    if (isDBConnected()) {
      const query = {};
      if (category && category !== 'all') {
        query.category = new RegExp(`^${category}$`, 'i');
      }
      if (badge) {
        query.badge = new RegExp(`^${badge}$`, 'i');
      }
      if (search && search.trim()) {
        const regex = new RegExp(search.trim(), 'i');
        query.$or = [{ name: regex }, { category: regex }, { tags: regex }];
      }

      const sortMap = {
        'price-asc': { price: 1 },
        'price-desc': { price: -1 },
        rating: { rating: -1 },
        popular: { reviewCount: -1 },
      };

      const result = await Product.find(query)
        .sort(sortMap[sort] || { id: 1 })
        .lean();

      return res.json({
        success: true,
        storage: 'mongodb',
        count: result.length,
        data: result,
      });
    }

    // JSON fallback when MongoDB is not configured
    const { products } = getCatalogData();
    let result = [...products];

    if (category && category !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (badge) {
      result = result.filter(p => p.badge && p.badge.toLowerCase() === badge.toLowerCase());
    }
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (sort === 'popular') result.sort((a, b) => b.reviewCount - a.reviewCount);

    res.json({
      success: true,
      storage: 'json-fallback',
      count: result.length,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/products/:id - single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = isDBConnected()
      ? await Product.findOne({ id }).lean()
      : getCatalogData().products.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/categories - list categories
router.get('/categories', (_req, res) => {
  try {
    const { categories } = getCatalogData();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
