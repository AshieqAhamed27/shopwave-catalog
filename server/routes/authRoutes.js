import express from 'express';
import User from '../models/User.js';
import { isDBConnected } from '../config/db.js';

const router = express.Router();

function buildUserResponse(user) {
  const displayName = user.name || 'Atelier Member';
  return {
    id: user._id || user.id,
    name: displayName,
    email: user.email,
    phone: user.phone || '+91 98765 43210',
    tier: user.tier || 'Atelier Privilege Member',
    rrn: user.rrn || '230071601031',
    points: user.points ?? 4250,
    avatar: user.avatar || displayName.substring(0, 2).toUpperCase(),
  };
}

// POST /api/auth/register
router.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email, and password are required.' });
    }

    if (!isDBConnected()) {
      return res.status(201).json({
        success: true,
        storage: 'local-fallback',
        user: buildUserResponse({ name, email }),
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ success: false, error: 'An account with this email already exists.' });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      avatar: name.trim().substring(0, 2).toUpperCase(),
    });

    res.status(201).json({
      success: true,
      storage: 'mongodb',
      user: buildUserResponse(user),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/auth/login
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    if (!isDBConnected()) {
      const name = email.split('@')[0];
      return res.json({
        success: true,
        storage: 'local-fallback',
        user: buildUserResponse({ name, email }),
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail });

    // Auto-provision first-time demo logins seamlessly if user hasn't registered yet
    if (!user) {
      const derivedName = normalizedEmail.split('@')[0];
      user = await User.create({
        name: derivedName,
        email: normalizedEmail,
        password,
        avatar: derivedName.substring(0, 2).toUpperCase(),
      });
    } else {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Invalid email or password.' });
      }
    }

    res.json({
      success: true,
      storage: 'mongodb',
      user: buildUserResponse(user),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
