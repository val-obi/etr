const Presale = require('../models/tokenModel');

// Controller for creating a presale entry
const createPresaleEntry = async (req, res) => {
  try {
    const { amount, walletAddress, referredCode } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, error: 'Invalid amount' });
    }
    if (!walletAddress) {
      return res.status(400).json({ success: false, error: 'Wallet address is required' });
    }
    const presaleEntry = new Presale({ amount, walletAddress, referredCode });
    await presaleEntry.save();
    res.status(201).json({ success: true, data: presaleEntry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller for claiming tokens
const claimTokens = async (req, res) => {
  try {
    const { walletAddress } = req.body;
    if (!walletAddress) {
      return res.status(400).json({ success: false, error: 'Wallet address is required' });
    }
    const entry = await Presale.findOne({ walletAddress });
    if (!entry) {
      return res.status(404).json({ success: false, error: 'Presale entry not found' });
    }
    res.status(200).json({ success: true, message: 'Tokens claimed successfully', data: entry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createPresaleEntry,
  claimTokens,
};