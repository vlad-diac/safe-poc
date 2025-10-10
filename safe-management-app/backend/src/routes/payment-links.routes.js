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

// Propose transaction for payment link (prepare for execution)
router.post('/:id/propose', async (req, res) => {
  try {
    const { signerAddress } = req.body;
    
    if (!signerAddress) {
      return res.status(400).json({
        error: 'Signer address is required',
        details: 'Please provide the wallet address that will sign the transaction'
      });
    }

    console.log(`Proposing transaction for payment link ${req.params.id} with signer ${signerAddress}`);
    
    // Get payment link
    const paymentLink = await paymentLinkService.getPaymentLinkById(req.params.id);
    
    if (!paymentLink) {
      return res.status(404).json({
        error: 'Payment link not found',
        details: 'The requested payment link does not exist'
      });
    }

    // Check if already completed
    if (paymentLink.status === 'completed') {
      return res.status(400).json({
        error: 'Payment already completed',
        details: 'This payment link has already been executed'
      });
    }

    // Check if expired
    if (paymentLink.expiresAt && new Date(paymentLink.expiresAt) < new Date()) {
      await paymentLinkService.updatePaymentLinkStatus(req.params.id, 'expired');
      return res.status(400).json({
        error: 'Payment link expired',
        details: 'This payment link has expired and can no longer be used'
      });
    }

    // Get session with safe configuration
    const session = await getSessionById(paymentLink.sessionId);
    if (!session) {
      return res.status(404).json({
        error: 'Session not found',
        details: 'The Safe session associated with this payment link could not be found'
      });
    }

    // Create Safe service instance
    const safeService = createSafeService(session);
    
    // Verify the signer is an owner of the Safe
    let safeInfo;
    try {
      safeInfo = await safeService.getSafeInfo();
    } catch (error) {
      console.error('Failed to get Safe info:', error);
      return res.status(500).json({
        error: 'Failed to verify Safe configuration',
        details: error.message
      });
    }

    const isOwner = safeInfo.owners.some(owner => 
      owner.toLowerCase() === signerAddress.toLowerCase()
    );

    if (!isOwner) {
      return res.status(403).json({
        error: 'Unauthorized signer',
        details: `The address ${signerAddress} is not an owner of this Safe. Only Safe owners can execute transactions.`
      });
    }

    // Get current nonce for the Safe
    let nonce;
    try {
      nonce = await safeService.getNonce();
    } catch (error) {
      console.error('Failed to get Safe nonce:', error);
      return res.status(500).json({
        error: 'Failed to get Safe nonce',
        details: error.message
      });
    }

    // Prepare transaction data
    const txData = {
      to: paymentLink.toAddress,
      value: paymentLink.value,
      data: '0x',
      operation: 0, // CALL
      safeTxGas: '0',
      baseGas: '0',
      gasPrice: '0',
      gasToken: '0x0000000000000000000000000000000000000000',
      refundReceiver: '0x0000000000000000000000000000000000000000',
      nonce: nonce
    };

    console.log('Transaction data prepared:', txData);

    // Generate the Safe transaction hash
    // Note: This is a placeholder. In a full implementation, you would:
    // 1. Calculate the actual Safe transaction hash using the Safe contract's getTransactionHash method
    // 2. Have the user sign this hash with their wallet
    // 3. Submit the signature to the Safe Transaction Service
    // 4. Once threshold is met, execute the transaction
    
    const safeTxHash = `0x${Buffer.from(`${paymentLink.id}-${nonce}-${Date.now()}`).toString('hex').padStart(64, '0').slice(0, 64)}`;
    
    // Update payment link with transaction hash
    await paymentLinkService.updatePaymentLinkTxHash(req.params.id, safeTxHash);

    console.log(`Transaction proposed successfully with hash: ${safeTxHash}`);

    res.json({
      success: true,
      safeTxHash,
      nonce,
      threshold: safeInfo.threshold,
      message: 'Transaction prepared successfully. Please sign with your wallet to execute.'
    });

  } catch (error) {
    console.error('Failed to propose transaction:', error);
    res.status(500).json({
      error: 'Failed to propose transaction',
      details: error.message
    });
  }
});

module.exports = router;
