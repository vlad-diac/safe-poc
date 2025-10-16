const express = require('express');
const router = express.Router();
const sessionService = require('../services/sessionService');
const { createSafeService } = require('../services/safeService');

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
    const { name, safeAddress, apiKey, chainId, transactionServiceUrl, isDefault } = req.body;
    
    // Validate required fields (apiKey is now optional, rpcUrl removed)
    if (!safeAddress || !chainId || !transactionServiceUrl) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['safeAddress', 'chainId', 'transactionServiceUrl']
      });
    }
    
    const session = await sessionService.createSession({
      name,
      safeAddress,
      apiKey: apiKey || null, // Make optional
      chainId: parseInt(chainId),
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
    const { name, safeAddress, apiKey, chainId, transactionServiceUrl, isDefault } = req.body;
    
    const session = await sessionService.updateSession(req.params.id, {
      name,
      safeAddress,
      apiKey: apiKey || null, // Make optional
      chainId: chainId ? parseInt(chainId) : undefined,
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

// Update connected wallet for session
router.patch('/:id/connected-wallet', async (req, res) => {
  try {
    const { walletAddress, autoReconnect } = req.body;
    
    if (!walletAddress) {
      return res.status(400).json({
        error: 'walletAddress is required'
      });
    }
    
    const session = await sessionService.updateConnectedWallet(
      req.params.id, 
      walletAddress,
      autoReconnect
    );
    res.json(session);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update connected wallet',
      details: error.message
    });
  }
});

// Clear connected wallet for session
router.delete('/:id/connected-wallet', async (req, res) => {
  try {
    const session = await sessionService.updateConnectedWallet(req.params.id, null);
    res.json(session);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to clear connected wallet',
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

// Get Safe info by address (public endpoint for payment execution)
router.get('/safe/:address/info', async (req, res) => {
  try {
    const { address } = req.params;
    
    if (!address) {
      return res.status(400).json({
        error: 'Safe address is required',
        details: 'Please provide a valid Safe address'
      });
    }

    console.log(`Fetching Safe info for address: ${address}`);

    // Find any session with this Safe address to get configuration
    const sessions = await sessionService.getAllSessions();
    const session = sessions.find(s => 
      s.safeAddress.toLowerCase() === address.toLowerCase()
    );

    if (!session) {
      return res.status(404).json({
        error: 'No session found for this Safe address',
        details: `No configuration found for Safe address ${address}. Please ensure a session exists for this Safe.`
      });
    }

    // Create Safe service instance
    const safeService = createSafeService(session);
    
    // Get Safe info
    let safeInfo;
    try {
      safeInfo = await safeService.getSafeInfo(address);
    } catch (error) {
      console.error('Failed to fetch Safe info from Transaction Service:', error);
      return res.status(500).json({
        error: 'Failed to fetch Safe information',
        details: error.message
      });
    }

    // Return Safe info (without sensitive session data)
    res.json({
      address: safeInfo.address,
      owners: safeInfo.owners,
      threshold: safeInfo.threshold,
      nonce: safeInfo.nonce,
      version: safeInfo.version,
      modules: safeInfo.modules || [],
      guard: safeInfo.guard || null
    });

  } catch (error) {
    console.error('Error fetching Safe info:', error);
    res.status(500).json({
      error: 'Failed to fetch Safe info',
      details: error.message
    });
  }
});

module.exports = router;
