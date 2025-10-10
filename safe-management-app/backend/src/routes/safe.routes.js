const express = require('express');
const router = express.Router();
const { getSessionById, updateSession } = require('../services/sessionService');
const { createSafeService } = require('../services/safeService');
const priceService = require('../services/priceService');

// Middleware to load session and create Safe service
async function loadSafeService(req, res, next) {
  try {
    const session = await getSessionById(req.params.sessionId);
    
    if (!session) {
      return res.status(404).json({
        error: 'Session not found'
      });
    }
    
    req.session = session;
    req.safeService = createSafeService(session);
    next();
  } catch (error) {
    res.status(500).json({
      error: 'Failed to load Safe service',
      details: error.message
    });
  }
}

// Get Safe info
router.get('/:sessionId/info', loadSafeService, async (req, res) => {
  try {
    const info = await req.safeService.getSafeInfo();
    res.json(info);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch Safe info',
      details: error.message
    });
  }
});

// Get Safe balances (raw data from Transaction Service)
router.get('/:sessionId/balances', loadSafeService, async (req, res) => {
  try {
    const balances = await req.safeService.getBalances();
    res.json(balances);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch Safe balances',
      details: error.message
    });
  }
});

// Get Safe asset value with prices (cached in session)
router.get('/:sessionId/asset-value', loadSafeService, async (req, res) => {
  try {
    const { force } = req.query;
    
    // Check if we have cached data and it's recent (< 5 minutes)
    const cacheValid = req.session.lastBalanceUpdate && 
                      req.session.assetBalances &&
                      req.session.totalAssetValueUsd &&
                      (Date.now() - new Date(req.session.lastBalanceUpdate).getTime() < 300000) && // 5 minutes
                      !force;
    
    if (cacheValid) {
      console.log('[Safe Routes] Returning cached asset value for session:', req.session.id);
      return res.json({
        totalUsd: req.session.totalAssetValueUsd,
        tokens: req.session.assetBalances,
        cached: true,
        lastUpdate: req.session.lastBalanceUpdate,
      });
    }
    
    // Fetch fresh data
    console.log('[Safe Routes] Calculating fresh asset value for session:', req.session.id);
    const balances = await req.safeService.getBalances();
    const assetValue = await priceService.calculateTotalAssetValue(balances);
    
    // Save to session
    await updateSession(req.session.id, {
      totalAssetValueUsd: assetValue.totalUsd,
      assetBalances: assetValue.tokens,
      lastBalanceUpdate: new Date(),
    });
    
    console.log('[Safe Routes] Saved asset value to session:', assetValue.totalUsd);
    
    res.json({
      totalUsd: assetValue.totalUsd,
      tokens: assetValue.tokens,
      cached: false,
      lastUpdate: new Date(),
    });
  } catch (error) {
    console.error('[Safe Routes] Error fetching asset value:', error);
    res.status(500).json({
      error: 'Failed to calculate asset value',
      details: error.message
    });
  }
});

// Get Safe owners
router.get('/:sessionId/owners', loadSafeService, async (req, res) => {
  try {
    const owners = await req.safeService.getOwners();
    res.json(owners);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch Safe owners',
      details: error.message
    });
  }
});

// Get transactions
router.get('/:sessionId/transactions', loadSafeService, async (req, res) => {
  try {
    const { limit = 50, offset = 0, pending } = req.query;
    
    let transactions;
    if (pending === 'true') {
      transactions = await req.safeService.getPendingTransactions();
    } else {
      transactions = await req.safeService.getAllTransactions(
        null,
        parseInt(limit),
        parseInt(offset)
      );
    }
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch transactions',
      details: error.message
    });
  }
});

// Get single transaction
router.get('/:sessionId/transaction/:hash', loadSafeService, async (req, res) => {
  try {
    const transaction = await req.safeService.getTransaction(req.params.hash);
    res.json(transaction);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch transaction',
      details: error.message
    });
  }
});

// Propose transaction (server-side)
router.post('/:sessionId/transaction/propose', loadSafeService, async (req, res) => {
  try {
    const txData = req.body;
    const result = await req.safeService.proposeTransaction(txData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to propose transaction',
      details: error.message
    });
  }
});

module.exports = router;
