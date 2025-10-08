const express = require('express');
const router = express.Router();
const { getSessionById } = require('../services/sessionService');
const { createSafeService } = require('../services/safeService');

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

// Get Safe balances
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
