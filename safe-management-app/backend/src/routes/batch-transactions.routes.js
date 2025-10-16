const express = require('express');
const router = express.Router();
const protocolKitService = require('../services/protocolKitService');
const apiKitService = require('../services/apiKitService');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * POST /api/batch-transactions/create
 * Create batch transaction (backend generates hash)
 */
router.post('/create', async (req, res) => {
  try {
    const { sessionId, recipients, description } = req.body;

    if (!sessionId || !recipients || !Array.isArray(recipients)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Get session
    const session = await prisma.safeSession.findUnique({
      where: { id: sessionId }
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Create transaction using Protocol Kit
    const { safeTransaction, safeTxHash, transactionData } =
      await protocolKitService.createBatchTransaction(session, recipients);

    // Note: Skipping isValidTransaction() as it requires a signer
    // Transaction is already validated during creation by Protocol Kit
    // Additional validation (balance checks, etc.) can be done before transaction creation

    // Check if draft already exists (same transaction = same hash)
    let draftTx = await prisma.draftTransaction.findUnique({
      where: { safeTxHash }
    });

    if (draftTx) {
      // Always delete and recreate to ensure fresh data
      console.log('🔄 Deleting old draft and creating fresh one:', safeTxHash);
      await prisma.draftTransaction.delete({ where: { safeTxHash } });
      draftTx = null;
    }

    // Create fresh draft
    draftTx = await prisma.draftTransaction.create({
      data: {
        sessionId,
        safeAddress: session.safeAddress,
        safeTxHash,
        transactionData: JSON.stringify(transactionData),
        recipients: JSON.stringify(recipients),
        description,
        status: 'draft'
      }
    });
    
    console.log('✅ Fresh draft created:', draftTx.id);

    res.json({
      success: true,
      safeTxHash,
      draftId: draftTx.id,
      transactionData, // Send full transaction data  
      safeAddress: session.safeAddress,
      chainId: session.chainId,
      message: 'Transaction created. Please sign the hash with eth_sign (temporary solution).'
    });

  } catch (error) {
    console.error('Create batch transaction error:', error);
    res.status(500).json({
      error: 'Failed to create transaction',
      details: error.message
    });
  }
});

/**
 * POST /api/batch-transactions/propose
 * Propose transaction with user signature
 */
router.post('/propose', async (req, res) => {
  try {
    const { draftId, senderAddress, senderSignature } = req.body;

    if (!draftId || !senderAddress || !senderSignature) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get draft transaction
    const draftTx = await prisma.draftTransaction.findUnique({
      where: { id: draftId },
      include: { session: true }
    });

    if (!draftTx) {
      return res.status(404).json({ error: 'Draft transaction not found' });
    }

    if (draftTx.status !== 'draft') {
      return res.status(400).json({ error: 'Transaction already proposed' });
    }

    const transactionData = JSON.parse(draftTx.transactionData);

    // Propose to Safe Transaction Service
    await apiKitService.proposeTransaction(draftTx.session, {
      safeTxHash: draftTx.safeTxHash,
      safeTransactionData: transactionData,
      senderAddress,
      senderSignature
    });

    // Update draft status
    await prisma.draftTransaction.update({
      where: { id: draftId },
      data: {
        status: 'proposed',
        senderAddress,
        senderSignature,
        signedAt: new Date()
      }
    });

    // Create payment link
    const recipients = JSON.parse(draftTx.recipients);
    const paymentLink = await prisma.paymentLink.create({
      data: {
        sessionId: draftTx.sessionId,
        safeAddress: draftTx.safeAddress,
        safeTxHash: draftTx.safeTxHash,
        toAddress: recipients[0].address,
        value: recipients[0].amount,
        description: draftTx.description || `Batch payment to ${recipients.length} recipients`,
        status: 'pending'
      }
    });

    // Generate payment link URL
    const paymentLinkUrl = `${process.env.APP_URL || 'http://localhost:3000'}/safe/pay/${paymentLink.id}`;

    res.json({
      success: true,
      safeTxHash: draftTx.safeTxHash,
      paymentLink: paymentLinkUrl,
      paymentLinkId: paymentLink.id
    });

  } catch (error) {
    console.error('Propose transaction error:', error);
    res.status(500).json({
      error: 'Failed to propose transaction',
      details: error.message
    });
  }
});

/**
 * GET /api/batch-transactions/:safeTxHash
 * Get transaction details
 */
router.get('/:safeTxHash', async (req, res) => {
  try {
    const { safeTxHash } = req.params;
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

    // Get from Safe Transaction Service
    const transaction = await apiKitService.getTransaction(session, safeTxHash);

    // Get from database
    const dbTransaction = await prisma.transaction.findUnique({
      where: { safeTxHash }
    });

    const draftTx = await prisma.draftTransaction.findUnique({
      where: { safeTxHash }
    });

    res.json({
      transaction,
      dbTransaction,
      draftTransaction: draftTx,
      confirmations: transaction.confirmations,
      confirmationsRequired: transaction.confirmationsRequired,
      isExecuted: transaction.isExecuted
    });

  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({
      error: 'Failed to get transaction',
      details: error.message
    });
  }
});

/**
 * POST /api/batch-transactions/validate
 * Validate transaction before creating
 */
router.post('/validate', async (req, res) => {
  try {
    const { sessionId, recipients } = req.body;

    const session = await prisma.safeSession.findUnique({
      where: { id: sessionId }
    });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Get Safe info
    const safeInfo = await protocolKitService.getSafeInfo(session);

    // Calculate total amount
    const totalAmount = recipients.reduce((sum, r) => {
      return sum + BigInt(r.amount);
    }, 0n);

    // Check balance
    const balance = BigInt(safeInfo.balance);
    const hasSufficientBalance = balance >= totalAmount;

    // Check addresses
    const invalidAddresses = recipients.filter(r => {
      return !r.address.match(/^0x[a-fA-F0-9]{40}$/);
    });

    const validation = {
      isValid: hasSufficientBalance && invalidAddresses.length === 0,
      balance: safeInfo.balance,
      totalAmount: totalAmount.toString(),
      hasSufficientBalance,
      invalidAddresses,
      owners: safeInfo.owners,
      threshold: safeInfo.threshold,
      nonce: safeInfo.nonce
    };

    res.json(validation);

  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({
      error: 'Validation failed',
      details: error.message
    });
  }
});

module.exports = router;

