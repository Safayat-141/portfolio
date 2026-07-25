const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// @route   POST /api/auth/setup
// @desc    One-time route to seed the single admin account
// @access  Guarded by x-setup-secret header
router.post('/setup', async (req, res) => {
  try {
    const setupSecret = req.headers['x-setup-secret'];

    if (!setupSecret || setupSecret !== process.env.SETUP_SECRET) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      return res.status(500).json({ message: 'ADMIN_EMAIL or ADMIN_PASSWORD not set' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Admin created', email: admin.email });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   POST /api/auth/login
// @desc    Log in the admin, set httpOnly cookie
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    generateToken(res, admin._id);

    res.status(200).json({ message: 'Logged in', email: admin.email });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   POST /api/auth/logout
// @desc    Clear the auth cookie
// @access  Public
router.post('/logout', (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out' });
});

// @route   GET /api/auth/me
// @desc    Get current logged-in admin
// @access  Private
router.get('/me', requireAuth, (req, res) => {
  res.status(200).json({ admin: req.admin });
});

module.exports = router;
