const express = require('express');
const router = express.Router();
const sessionService = require('../services/sessionService');

// Get all sessions
router.get('/', async (req, res) => {
  try {
    const userId = req.user?.id; // For future multi-user support
    const sessions = await sessionService.getAllSessions(userId);
    
    console.log('📋 API: Returning', sessions.length, 'sessions');
    console.log('Sessions:', sessions.map(s => ({ id: s.id, name: s.name, isDefault: s.isDefault })));
    
    // Prevent caching of sessions list
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    res.json(sessions);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch sessions',
      details: error.message
    });
  }
});

// Get default session
router.get('/default', async (req, res) => {
  try {
    const session = await sessionService.getDefaultSession();
    
    if (!session) {
      // Try to create default from env if none exists
      const defaultSession = await sessionService.createDefaultSessionFromEnv();
      
      if (!defaultSession) {
        return res.status(404).json({
          error: 'No default session found',
          message: 'Please create a session or configure environment variables'
        });
      }
      
      return res.json(defaultSession);
    }
    
    res.json(session);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch default session',
      details: error.message
    });
  }
});

// Get specific session by ID
router.get('/:id', async (req, res) => {
  try {
    const session = await sessionService.getSessionById(req.params.id);
    
    if (!session) {
      return res.status(404).json({
        error: 'Session not found'
      });
    }
    
    res.json(session);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch session',
      details: error.message
    });
  }
});

// Create new session
router.post('/', async (req, res) => {
  try {
    const { name, safeAddress, apiKey, chainId, rpcUrl, transactionServiceUrl, isDefault } = req.body;
    
    // Validate required fields
    if (!safeAddress || !apiKey || !chainId || !rpcUrl || !transactionServiceUrl) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['safeAddress', 'apiKey', 'chainId', 'rpcUrl', 'transactionServiceUrl']
      });
    }
    
    const session = await sessionService.createSession({
      name,
      safeAddress,
      apiKey,
      chainId: parseInt(chainId),
      rpcUrl,
      transactionServiceUrl,
      isDefault: isDefault || false,
      userId: req.user?.id // For future multi-user support
    });
    
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create session',
      details: error.message
    });
  }
});

// Update session
router.put('/:id', async (req, res) => {
  try {
    const { name, safeAddress, apiKey, chainId, rpcUrl, transactionServiceUrl, isDefault } = req.body;
    
    const session = await sessionService.updateSession(req.params.id, {
      name,
      safeAddress,
      apiKey,
      chainId: chainId ? parseInt(chainId) : undefined,
      rpcUrl,
      transactionServiceUrl,
      isDefault
    });
    
    res.json(session);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update session',
      details: error.message
    });
  }
});

// Set session as default
router.patch('/:id/set-default', async (req, res) => {
  try {
    const session = await sessionService.setDefaultSession(req.params.id);
    res.json(session);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to set default session',
      details: error.message
    });
  }
});

// Delete session
router.delete('/:id', async (req, res) => {
  try {
    await sessionService.deleteSession(req.params.id);
    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete session',
      details: error.message
    });
  }
});

module.exports = router;
