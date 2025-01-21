const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tokenRoutes = require('./routes/tokenRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Base route for health check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running...' });
});

// Routes
app.use('/api/tokens', tokenRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('MongoDB Connection Error:', err));