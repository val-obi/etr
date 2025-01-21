const mongoose = require('mongoose');

// Define the schema for the presale entries
const tokenSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  referredCode: {
    type: String,
    default: null,
  },
  claimed: {
    type: Boolean,
    default: false, // Default value for claimed is false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Presale model
const Presale = mongoose.model('Presale', tokenSchema);

module.exports = Presale;