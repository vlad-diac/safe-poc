const express = require('express');
const router = express.Router();
const priceService = require('../services/priceService');

/**
 * GET /api/prices/eth
 * Get ETH price in USD from CoinGecko (cached)
 */
router.get('/eth', async (req, res) => {
  try {
    const price = await priceService.getEthPrice();
    res.json({ price, cached: true });
  } catch (error) {
    console.error('[Price Routes] Error fetching ETH price:', error.message);
    res.status(500).json({
      error: 'Failed to fetch ETH price',
      details: error.message,
    });
  }
});

/**
 * GET /api/prices/token/:address
 * Get token price in USD from CoinGecko by contract address (cached)
 */
router.get('/token/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const price = await priceService.getTokenPrice(address);
    res.json({ price, cached: true });
  } catch (error) {
    console.error(`[Price Routes] Error fetching token price for ${req.params.address}:`, error.message);
    // Return null price instead of error to not block the app
    res.json({ price: null, cached: false });
  }
});

module.exports = router;

