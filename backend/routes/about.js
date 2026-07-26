const express = require('express');
const router = express.Router();
const About = require('../models/About');
const requireAuth = require('../middleware/requireAuth');

// GET /api/about - public
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne({});
    res.status(200).json(about || {});
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching about content' });
  }
});

// PUT /api/about - protected, upsert (creates the singleton if it doesn't exist yet)
router.put('/', requireAuth, async (req, res) => {
  try {
    const about = await About.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.status(200).json(about);
  } catch (err) {
    res.status(400).json({ message: 'Error updating about content', error: err.message });
  }
});

module.exports = router;
