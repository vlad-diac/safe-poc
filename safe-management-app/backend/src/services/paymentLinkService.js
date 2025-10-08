const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const crypto = require('crypto');

/**
 * Payment Link Service - Handles payment link CRUD operations
 */

// Create a new payment link
async function createPaymentLink(data) {
  const {
    sessionId,
    safeAddress,
    safeTxHash,
    toAddress,
    value,
    description,
    expiresIn // milliseconds
  } = data;
  
  const expiresAt = expiresIn ? new Date(Date.now() + expiresIn) : null;
  
  return await prisma.paymentLink.create({
    data: {
      sessionId,
      safeAddress,
      safeTxHash,
      toAddress,
      value,
      description,
      status: 'pending',
      expiresAt
    }
  });
}

// Get payment link by ID
async function getPaymentLinkById(id) {
  const link = await prisma.paymentLink.findUnique({
    where: { id },
    include: { session: true }
  });
  
  // Check if expired
  if (link && link.expiresAt && new Date() > link.expiresAt) {
    if (link.status === 'pending') {
      await updatePaymentLinkStatus(id, 'expired');
      link.status = 'expired';
    }
  }
  
  return link;
}

// Get all payment links for a session
async function getPaymentLinksBySession(sessionId) {
  return await prisma.paymentLink.findMany({
    where: { sessionId },
    orderBy: { createdAt: 'desc' }
  });
}

// Update payment link status
async function updatePaymentLinkStatus(id, status) {
  return await prisma.paymentLink.update({
    where: { id },
    data: { status }
  });
}

// Update payment link with transaction hash
async function updatePaymentLinkTxHash(id, safeTxHash) {
  return await prisma.paymentLink.update({
    where: { id },
    data: { safeTxHash }
  });
}

// Delete a payment link
async function deletePaymentLink(id) {
  return await prisma.paymentLink.delete({
    where: { id }
  });
}

// Check and update expired links
async function checkExpiredLinks() {
  const now = new Date();
  
  const expiredLinks = await prisma.paymentLink.updateMany({
    where: {
      status: 'pending',
      expiresAt: {
        lt: now
      }
    },
    data: {
      status: 'expired'
    }
  });
  
  return expiredLinks.count;
}

module.exports = {
  createPaymentLink,
  getPaymentLinkById,
  getPaymentLinksBySession,
  updatePaymentLinkStatus,
  updatePaymentLinkTxHash,
  deletePaymentLink,
  checkExpiredLinks
};
