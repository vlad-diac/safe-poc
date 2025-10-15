/**
 * Transaction Utilities
 * 
 * Helper functions for parsing and displaying Safe transaction data
 */

import { formatEther, formatUnits } from 'ethers';

export interface TransactionDisplay {
  name: string;
  type: 'batch' | 'simple' | 'unknown';
  items: TransactionItem[];
}

export interface TransactionItem {
  to: string;
  amount: string;
  token: string;
  tokenAddress?: string;
  decimals?: number;
}

/**
 * Common token addresses and symbols
 * Add more tokens as needed for your specific chain
 */
const KNOWN_TOKENS: Record<string, { symbol: string; decimals: number }> = {
  // Mainnet tokens
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': { symbol: 'USDC', decimals: 6 },
  '0xdAC17F958D2ee523a2206206994597C13D831ec7': { symbol: 'USDT', decimals: 6 },
  '0x6B175474E89094C44Da98b954EedeAC495271d0F': { symbol: 'DAI', decimals: 18 },
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': { symbol: 'WBTC', decimals: 8 },
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': { symbol: 'WETH', decimals: 18 },
  '0x514910771AF9Ca656af840dff83E8264EcF986CA': { symbol: 'LINK', decimals: 18 },
  '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0': { symbol: 'MATIC', decimals: 18 },
  '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984': { symbol: 'UNI', decimals: 18 },
  
  // Sepolia tokens (testnet)
  '0xdC035D45d973E3EC169d2276DDab16f1e407384F': { symbol: 'USDC', decimals: 6 },
  '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8': { symbol: 'USDC', decimals: 6 },
  '0x779877A7B0D9E8603169DdbD7836e478b4624789': { symbol: 'LINK', decimals: 18 },
  
  // Add more tokens as needed
};

/**
 * Get token info from address
 */
function getTokenInfo(address: string): { symbol: string; decimals: number } {
  const normalized = address?.toLowerCase();
  const key = Object.keys(KNOWN_TOKENS).find(k => k.toLowerCase() === normalized);
  return key ? KNOWN_TOKENS[key] : { symbol: 'UNKNOWN', decimals: 18 };
}

/**
 * Parse a simple transaction (direct ETH transfer or single token transfer)
 */
function parseSimpleTransaction(tx: any): TransactionItem | null {
  // Case 1: Direct ETH transfer (value > 0, no data or empty data)
  if (tx.value && tx.value !== '0' && (!tx.data || tx.data === '0x')) {
    return {
      to: tx.to,
      amount: formatEther(tx.value),
      token: 'ETH',
    };
  }

  // Case 2: ERC20 token transfer (has dataDecoded with transfer method)
  if (tx.dataDecoded?.method === 'transfer') {
    const toParam = tx.dataDecoded.parameters?.find((p: any) => p.name === 'to');
    const valueParam = tx.dataDecoded.parameters?.find((p: any) => p.name === 'value');
    
    if (toParam && valueParam) {
      const tokenInfo = getTokenInfo(tx.to);
      return {
        to: toParam.value,
        amount: formatUnits(valueParam.value, tokenInfo.decimals),
        token: tokenInfo.symbol,
        tokenAddress: tx.to,
        decimals: tokenInfo.decimals,
      };
    }
  }

  // Case 3: Other contract interactions with ETH value
  if (tx.value && tx.value !== '0') {
    return {
      to: tx.to,
      amount: formatEther(tx.value),
      token: 'ETH',
    };
  }

  return null;
}

/**
 * Parse a batch transaction (multiSend)
 */
function parseBatchTransaction(tx: any): TransactionItem[] {
  const items: TransactionItem[] = [];

  if (tx.dataDecoded?.method === 'multiSend') {
    const txParam = tx.dataDecoded.parameters?.find((p: any) => p.name === 'transactions');
    const valueDecoded = txParam?.valueDecoded;

    if (Array.isArray(valueDecoded)) {
      for (const innerTx of valueDecoded) {
        // ETH transfer
        if (innerTx.value && innerTx.value !== '0' && (!innerTx.data || innerTx.data === '0x')) {
          items.push({
            to: innerTx.to,
            amount: formatEther(innerTx.value),
            token: 'ETH',
          });
        }
        // ERC20 token transfer
        else if (innerTx.dataDecoded?.method === 'transfer') {
          const toParam = innerTx.dataDecoded.parameters?.find((p: any) => p.name === 'to');
          const valueParam = innerTx.dataDecoded.parameters?.find((p: any) => p.name === 'value');
          
          if (toParam && valueParam) {
            const tokenInfo = getTokenInfo(innerTx.to);
            items.push({
              to: toParam.value,
              amount: formatUnits(valueParam.value, tokenInfo.decimals),
              token: tokenInfo.symbol,
              tokenAddress: innerTx.to,
              decimals: tokenInfo.decimals,
            });
          }
        }
        // Other contract interactions with ETH
        else if (innerTx.value && innerTx.value !== '0') {
          items.push({
            to: innerTx.to,
            amount: formatEther(innerTx.value),
            token: 'ETH',
          });
        }
      }
    }
  }

  return items;
}

/**
 * Parse transaction data and return a structured display object
 */
export function parseTransactionData(tx: any): TransactionDisplay {
  // Check if it's a batch transaction
  if (tx.dataDecoded?.method === 'multiSend') {
    const items = parseBatchTransaction(tx);
    return {
      name: `Batch Payment (${items.length} ${items.length === 1 ? 'transfer' : 'transfers'})`,
      type: 'batch',
      items,
    };
  }

  // Handle specific transaction methods
  const method = tx.dataDecoded?.method;
  
  // Try to parse as simple transaction
  const item = parseSimpleTransaction(tx);
  if (item) {
    // Generate a descriptive name based on the transaction type
    let name = 'Payment';
    
    if (method === 'transfer') {
      name = `${item.token} Transfer`;
    } else if (method === 'approve') {
      name = `Approve ${item.token}`;
    } else if (method === 'transferFrom') {
      name = `${item.token} Transfer (From)`;
    } else if (item.token === 'ETH') {
      name = 'ETH Transfer';
    }
    
    return {
      name,
      type: 'simple',
      items: [item],
    };
  }

  // Handle other known methods without parsed items
  if (method) {
    const methodNames: Record<string, string> = {
      'approve': 'Token Approval',
      'setPreSignature': 'Set Pre-Signature',
      'swap': 'Token Swap',
      'addOwnerWithThreshold': 'Add Owner',
      'removeOwner': 'Remove Owner',
      'changeThreshold': 'Change Threshold',
      'enableModule': 'Enable Module',
      'disableModule': 'Disable Module',
    };
    
    const displayName = methodNames[method] || method.charAt(0).toUpperCase() + method.slice(1);
    
    return {
      name: displayName,
      type: 'unknown',
      items: [],
    };
  }

  // Fallback for unknown transaction types
  return {
    name: 'Contract Interaction',
    type: 'unknown',
    items: [],
  };
}

/**
 * Get a summary of transaction amounts and tokens
 * Used for displaying in table view
 */
export function getTransactionSummary(tx: any): string {
  const parsed = parseTransactionData(tx);
  
  if (parsed.items.length === 0) {
    // Try to show ETH value as fallback
    if (tx.value && tx.value !== '0') {
      return `${formatEther(tx.value)} ETH`;
    }
    return 'Contract Interaction';
  }

  if (parsed.items.length === 1) {
    const item = parsed.items[0];
    return `${item.amount} ${item.token}`;
  }

  // For batch transactions, show summary
  const tokenGroups = parsed.items.reduce((acc, item) => {
    if (!acc[item.token]) {
      acc[item.token] = 0;
    }
    acc[item.token] += parseFloat(item.amount);
    return acc;
  }, {} as Record<string, number>);

  const summary = Object.entries(tokenGroups)
    .map(([token, total]) => `${total.toFixed(4)} ${token}`)
    .join(' + ');

  return summary;
}

/**
 * Truncate address for display
 */
export function truncateAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Format large numbers for display
 */
export function formatAmount(amount: string, decimals: number = 4): string {
  const num = parseFloat(amount);
  if (isNaN(num)) return '0';
  
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(2)}K`;
  }
  
  return num.toFixed(decimals);
}

