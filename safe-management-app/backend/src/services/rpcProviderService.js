/**
 * RPC Provider Service
 * Centralized RPC URL management
 */
//TBD: use hardcoded chain data(IDs: 1, 11155111, etc.) or get dinamically from chainlist.org or something similar
// Primary RPC URLs (use your own keys)
const PRIMARY_RPC_URLS = {
  1: process.env.ETH_MAINNET_RPC || 'https://eth.llamarpc.com',
  11155111: process.env.SEPOLIA_RPC || 'https://ethereum-sepolia.publicnode.com',
  137: process.env.POLYGON_RPC || 'https://polygon-rpc.com',
  42161: process.env.ARBITRUM_RPC || 'https://arb1.arbitrum.io/rpc',
  10: process.env.OPTIMISM_RPC || 'https://mainnet.optimism.io',
  8453: process.env.BASE_RPC || 'https://mainnet.base.org',
  100: process.env.GNOSIS_RPC || 'https://rpc.gnosischain.com',
};

// Fallback public RPCs
const FALLBACK_RPC_URLS = {
  1: 'https://cloudflare-eth.com',
  11155111: 'https://rpc.sepolia.org',
  137: 'https://polygon-bor.publicnode.com',
  42161: 'https://arbitrum-one.publicnode.com',
  10: 'https://optimism.publicnode.com',
  8453: 'https://base.publicnode.com',
  100: 'https://gnosis.publicnode.com',
};



// Chain information
const CHAIN_INFO = {
  1: { name: 'Ethereum Mainnet', nativeCurrency: 'ETH' },
  11155111: { name: 'Sepolia Testnet', nativeCurrency: 'ETH' },
  137: { name: 'Polygon', nativeCurrency: 'MATIC' },
  42161: { name: 'Arbitrum One', nativeCurrency: 'ETH' },
  10: { name: 'Optimism', nativeCurrency: 'ETH' },
  8453: { name: 'Base', nativeCurrency: 'ETH' },
  100: { name: 'Gnosis Chain', nativeCurrency: 'xDAI' },
};

/**
 * Get RPC URL for a given chain ID
 */
function getRpcUrl(chainId) {
  const primary = PRIMARY_RPC_URLS[chainId];
  if (primary) return primary;

  const fallback = FALLBACK_RPC_URLS[chainId];
  if (fallback) return fallback;

  throw new Error(`No RPC URL configured for chain ID: ${chainId}`);
}

/**
 * Get chain information
 */
function getChainInfo(chainId) {
  return CHAIN_INFO[chainId] || { name: `Chain ${chainId}`, nativeCurrency: 'Unknown' };
}

/**
 * Check if chain is supported
 */
function isChainSupported(chainId) {
  return !!(PRIMARY_RPC_URLS[chainId] || FALLBACK_RPC_URLS[chainId]);
}

/**
 * Get all supported chains
 */
function getSupportedChains() {
  const chainIds = [...new Set([
    ...Object.keys(PRIMARY_RPC_URLS),
    ...Object.keys(FALLBACK_RPC_URLS)
  ])].map(Number);

  return chainIds.map(chainId => ({
    chainId,
    ...getChainInfo(chainId),
    rpcUrl: getRpcUrl(chainId)
  }));
}

module.exports = {
  getRpcUrl,
  getChainInfo,
  isChainSupported,
  getSupportedChains
};

