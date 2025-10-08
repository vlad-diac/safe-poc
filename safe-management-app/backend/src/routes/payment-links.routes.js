const express = require('express');
const router = express.Router();
const paymentLinkService = require('../services/paymentLinkService');
const { getSessionById } = require('../services/sessionService');
const { createSafeService } = require('../services/safeService');

// Create payment link
router.post('/create', async (req, res) => {
  try {
    const { sessionId, to, value, description, expiresIn } = req.body;
    
    // Validate required fields
    if (!sessionId || !to || !value) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['sessionId', 'to', 'value']
      });
    }
    
    // Get session
    const session = await getSessionById(sessionId);
    if (!session) {
      return res.status(404).json({
        error: 'Session not found'
      });
    }
    
    // Create Safe service instance
    const safeService = createSafeService(session);
    
    // Optionally: Pre-create transaction in Safe Transaction Service
    // For now, we'll just store the link details
    // The transaction will be created when someone pays via the link
    
    // Create payment link in database
    const paymentLink = await paymentLinkService.createPaymentLink({
      sessionId,
      safeAddress: session.safeAddress,
      safeTxHash: null, // Will be set when transaction is created
      toAddress: to,
      value,
      description,
      expiresIn: expiresIn ? parseInt(expiresIn) : null
    });
    
    // Generate shareable URL
    const appUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const paymentUrl = `${appUrl}/safe/pay/${paymentLink.id}`;
    
    res.status(201).json({
      ...paymentLink,
      url: paymentUrl
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create payment link',
      details: error.message
    });
  }
});

// Get payment link by ID (public endpoint)
router.get('/:id', async (req, res) => {
  try {
    const paymentLink = await paymentLinkService.getPaymentLinkById(req.params.id);
    
    if (!paymentLink) {
      return res.status(404).json({
        error: 'Payment link not found'
      });
    }
    
    // Don't expose API key to public
    if (paymentLink.session) {
      delete paymentLink.session.apiKey;
    }
    
    res.json(paymentLink);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch payment link',
      details: error.message
    });
  }
});

// Get all payment links for a session
router.get('/session/:sessionId', async (req, res) => {
  try {
    const paymentLinks = await paymentLinkService.getPaymentLinksBySession(req.params.sessionId);
    res.json(paymentLinks);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch payment links',
      details: error.message
    });
  }
});

// Update payment link status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        error: 'Status is required'
      });
    }
    
    const paymentLink = await paymentLinkService.updatePaymentLinkStatus(req.params.id, status);
    res.json(paymentLink);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update payment link status',
      details: error.message
    });
  }
});

// Delete payment link
router.delete('/:id', async (req, res) => {
  try {
    await paymentLinkService.deletePaymentLink(req.params.id);
    res.json({ message: 'Payment link deleted successfully' });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete payment link',
      details: error.message
    });
  }
});

module.exports = router;
