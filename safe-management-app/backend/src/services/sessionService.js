const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Session Service - Handles CRUD operations for Safe sessions
 */

// Get all sessions for a user
async function getAllSessions(userId = null) {
  return await prisma.safeSession.findMany({
    where: userId ? { userId } : {},
    orderBy: { createdAt: 'desc' }
  });
}

// Get a specific session by ID
async function getSessionById(id) {
  return await prisma.safeSession.findUnique({
    where: { id },
    include: { paymentLinks: true }
  });
}

// Get the default session
async function getDefaultSession() {
  return await prisma.safeSession.findFirst({
    where: { isDefault: true }
  });
}

// Create a new session
async function createSession(data) {
  const { name, safeAddress, apiKey, chainId, rpcUrl, transactionServiceUrl, isDefault, userId } = data;
  
  // Auto-generate name if not provided
  const sessionName = name || generateSessionName(safeAddress, chainId);
  
  // If setting as default, unset all other defaults first
  if (isDefault) {
    await prisma.safeSession.updateMany({
      where: { isDefault: true },
      data: { isDefault: false }
    });
  }
  
  return await prisma.safeSession.create({
    data: {
      name: sessionName,
      safeAddress,
      apiKey,
      chainId,
      rpcUrl,
      transactionServiceUrl,
      isDefault: isDefault || false,
      userId
    }
  });
}

// Update an existing session
async function updateSession(id, data) {
  const { 
    name, 
    safeAddress, 
    apiKey, 
    chainId, 
    rpcUrl, 
    transactionServiceUrl, 
    isDefault,
    totalAssetValueUsd,
    assetBalances,
    lastBalanceUpdate
  } = data;
  
  // If setting as default, unset all other defaults first
  if (isDefault) {
    await prisma.safeSession.updateMany({
      where: { isDefault: true, id: { not: id } },
      data: { isDefault: false }
    });
  }
  
  return await prisma.safeSession.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(safeAddress && { safeAddress }),
      ...(apiKey && { apiKey }),
      ...(chainId && { chainId }),
      ...(rpcUrl && { rpcUrl }),
      ...(transactionServiceUrl && { transactionServiceUrl }),
      ...(isDefault !== undefined && { isDefault }),
      ...(totalAssetValueUsd !== undefined && { totalAssetValueUsd }),
      ...(assetBalances !== undefined && { assetBalances }),
      ...(lastBalanceUpdate !== undefined && { lastBalanceUpdate })
    }
  });
}

// Set a session as default
async function setDefaultSession(id) {
  // Unset all other defaults
  await prisma.safeSession.updateMany({
    where: { isDefault: true },
    data: { isDefault: false }
  });
  
  // Set the new default
  return await prisma.safeSession.update({
    where: { id },
    data: { isDefault: true }
  });
}

// Update connected wallet for a session
async function updateConnectedWallet(id, walletAddress, autoReconnect = null) {
  const updateData = { connectedWallet: walletAddress };
  
  // If autoReconnect is explicitly provided, update it
  if (autoReconnect !== null) {
    updateData.autoReconnect = autoReconnect;
  }
  
  // If disconnecting (walletAddress is null), disable autoReconnect
  if (walletAddress === null) {
    updateData.autoReconnect = false;
  }
  
  return await prisma.safeSession.update({
    where: { id },
    data: updateData
  });
}

// Delete a session
async function deleteSession(id) {
  return await prisma.safeSession.delete({
    where: { id }
  });
}

// Generate session name from address and chain ID
function generateSessionName(address, chainId) {
  const chainNames = {
    1: 'Ethereum',
    5: 'Goerli',
    11155111: 'Sepolia',
    137: 'Polygon',
    100: 'Gnosis',
    42161: 'Arbitrum',
    10: 'Optimism'
  };
  
  const chainName = chainNames[chainId] || `Chain-${chainId}`;
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
  
  return `${chainName}-${shortAddress}`;
}

// Create default session from environment variables
async function createDefaultSessionFromEnv() {
  const existingDefault = await getDefaultSession();
  
  // Only create if no default exists
  if (existingDefault) {
    return existingDefault;
  }
  
  const defaultSessionData = {
    name: 'Default Session',
    safeAddress: process.env.DEFAULT_SAFE_ADDRESS,
    apiKey: process.env.SAFE_API_KEY,
    chainId: parseInt(process.env.CHAIN_ID),
    rpcUrl: process.env.RPC_URL,
    transactionServiceUrl: process.env.TRANSACTION_SERVICE_URL,
    isDefault: true
  };
  
  // Only create if all required env vars are present
  if (defaultSessionData.safeAddress && defaultSessionData.apiKey && defaultSessionData.rpcUrl) {
    return await createSession(defaultSessionData);
  }
  
  return null;
}

module.exports = {
  getAllSessions,
  getSessionById,
  getDefaultSession,
  createSession,
  updateSession,
  setDefaultSession,
  updateConnectedWallet,
  deleteSession,
  generateSessionName,
  createDefaultSessionFromEnv
};
