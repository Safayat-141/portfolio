const express = require('express');
const cloudinary = require('cloudinary').v2;
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Protected: only the logged-in admin can request an upload signature
router.get('/signature', requireAuth, (req, res) => {
  const timestamp = Math.round(Date.now() / 1000);
  const folder = 'portfolio';

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({
    signature,
    timestamp,
    folder,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  });
});

module.exports = router;
