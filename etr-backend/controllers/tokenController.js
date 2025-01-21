const Presale = require('../models/tokenModel'); // Import the model

const claimTokens = async (req, res) => {
  try {
    const { walletAddress } = req.body;

    // Check if walletAddress is provided
    if (!walletAddress) {
      return res.status(400).json({ success: false, message: 'Wallet address is required' });
    }

    // Find the entry for this wallet
    const presaleEntry = await Presale.findOne({ walletAddress });

    if (!presaleEntry) {
      return res.status(404).json({ success: false, message: 'No entry found for this wallet address' });
    }

    // Check if tokens have already been claimed
    if (presaleEntry.claimed) {
      return res.status(400).json({ success: false, message: 'Tokens already claimed' });
    }

    // Mark as claimed and save
    presaleEntry.claimed = true;
    presaleEntry.updatedAt = new Date();
    await presaleEntry.save();

    res.json({ success: true, message: 'Tokens claimed successfully', data: presaleEntry });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error claiming tokens', error: err.message });
  }
};

module.exports = {
  claimTokens,
  // Other functions...
};