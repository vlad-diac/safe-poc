const express = require('express');
const router = express.Router();
const apiKitService = require('../services/apiKitService');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * GET /api/tokens
 * Get token list for a chain
 */
router.get('/', async (req, res) => {
  try {
    const { sessionId } = req.query;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }

    const session = await prisma.safeSession.findUnique({
      where: { id: sessionId }
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Get token list from API Kit
    const tokens = await apiKitService.getTokenList(session);

    res.json({
      success: true,
      tokens,
      count: tokens.length
    });

  } catch (error) {
    console.error('Get tokens error:', error);
    res.status(500).json({
      error: 'Failed to get tokens',
      details: error.message
    });
  }
});

/**
 * GET /api/tokens/:address
 * Get specific token info
 */
router.get('/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const { sessionId } = req.query;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }

    const session = await prisma.safeSession.findUnique({
      where: { id: sessionId }
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Get token info
    const token = await apiKitService.getToken(session, address);

    res.json(token);

  } catch (error) {
    console.error('Get token error:', error);
    res.status(500).json({
      error: 'Failed to get token',
      details: error.message
    });
  }
});

module.exports = router;

