const express = require('express');
const router = express.Router();
const { syncTransactions, getTransactions, getSyncStatus } = require('../services/transactionSyncService');

// Sync transactions from Safe Transaction Service to database
router.post('/:sessionId/sync', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const result = await syncTransactions(sessionId);
    
    res.json({
      success: true,
      message: 'Transactions synced successfully',
      ...result,
    });
  } catch (error) {
    console.error('Sync transactions error:', error);
    res.status(500).json({
      error: 'Failed to sync transactions',
      details: error.message,
    });
  }
});

// Get transactions from database
router.get('/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { limit, offset, pending, executed } = req.query;
    
    const options = {
      limit: limit ? parseInt(limit) : 50,
      offset: offset ? parseInt(offset) : 0,
      pending: pending === 'true',
      executed: executed === 'true',
    };
    
    const result = await getTransactions(sessionId, options);
    res.json(result);
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      error: 'Failed to get transactions',
      details: error.message,
    });
  }
});

// Get sync status
router.get('/:sessionId/sync/status', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const status = await getSyncStatus(sessionId);
    
    res.json({
      synced: !!status,
      ...status,
    });
  } catch (error) {
    console.error('Get sync status error:', error);
    res.status(500).json({
      error: 'Failed to get sync status',
      details: error.message,
    });
  }
});

module.exports = router;

