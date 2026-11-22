import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ordersFilePath = path.join(__dirname, '../data/orders.json');

const router = express.Router();

function getOrders() {
  try {
    if (!fs.existsSync(ordersFilePath)) {
      fs.writeFileSync(ordersFilePath, '[]', 'utf-8');
      return [];
    }
    const raw = fs.readFileSync(ordersFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), 'utf-8');
}

// POST /api/orders - create a new order
router.post('/orders', (req, res) => {
  try {
    const { items, customer, paymentMethod = 'card' } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Order must contain at least one item' });
    }

    const subtotal = items.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
    const shipping = subtotal > 999 ? 0 : 99;
    const total = subtotal + shipping;

    const newOrder = {
      id: `ORD-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      customer: {
        name: customer?.name || 'Guest Shopper',
        email: customer?.email || 'guest@shopwave.local',
        address: customer?.address || '123 Wave Street, Tech Hub',
      },
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        qty: item.qty || 1,
        image: item.images?.[0] || item.image || '',
      })),
      pricing: {
        subtotal,
        shipping,
        total,
      },
      paymentMethod,
    };

    const orders = getOrders();
    orders.unshift(newOrder);
    saveOrders(orders);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/orders - list all orders
router.get('/orders', (_req, res) => {
  try {
    const orders = getOrders();
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/orders/:id - get order by ID
router.get('/orders/:id', (req, res) => {
  try {
    const orders = getOrders();
    const order = orders.find(o => o.id === req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
