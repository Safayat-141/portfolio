const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.get('/health', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ status: 'ok', db: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', db: 'disconnected', error: err.message });
  }
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
