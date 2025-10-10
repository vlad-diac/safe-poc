/**
 * Safe Service
 * 
 * Centralized service for Safe account operations using SDK Starter Kit.
 * Wraps SafeClient methods for better organization and reusability.
 */

import { SafeClient } from '@safe-global/sdk-starter-kit';

export interface SafeInfo {
  address: string;
  owners: string[];
  threshold: number;
  nonce: number;
  version?: string;
}

export interface SafeBalance {
  value: bigint;
  formatted: string;
  fiatBalance?: string;
  fiatConversion?: string;
  fiatCode?: string;
}

export interface TokenBalance {
  tokenAddress: string | null;
  token: {
    name: string;
    symbol: string;
    decimals: number;
    logoUri: string;
  } | null;
  balance: string;
  fiatBalance: string;
  fiatConversion: string;
  fiatCode: string;
}

/**
 * Get comprehensive Safe account information
 */
export async function getSafeInfo(client: SafeClient): Promise<SafeInfo> {
  console.log('[SafeService] Fetching Safe info...');
  
  const [address, owners, threshold, nonce] = await Promise.all([
    client.getAddress(),
    client.getOwners(),
    client.getThreshold(),
    client.getNonce(),
  ]);

  console.log('[SafeService] Safe info retrieved:', {
    address,
    ownersCount: owners.length,
    owners,
    threshold,
    nonce,
  });

  return {
    address,
    owners,
    threshold,
    nonce,
  };
}

/**
 * Get Safe ETH balance from blockchain
 * Note: For total asset value with USD pricing, use getTotalAssetValue()
 */
export async function getSafeBalance(client: SafeClient): Promise<SafeBalance> {
  try {
    console.log('[SafeService] Fetching ETH balance from blockchain...');
    
    // Get the Safe address
    const safeAddress = await client.getAddress();
    console.log('[SafeService] Safe address:', safeAddress);
    
    // Get the raw balance from blockchain using SDK method
    const balance = await (client as any).protocolKit.getBalance();
    console.log('[SafeService] Raw balance from SDK:', balance.toString(), 'wei');
    
    // Convert to formatted string (wei to ETH)
    const ethValue = Number(balance) / 1e18;
    const formatted = ethValue.toFixed(4);
    console.log('[SafeService] Formatted balance:', formatted, 'ETH');
    
    return {
      value: balance,
      formatted,
    };
  } catch (error) {
    console.error('[SafeService] Error fetching Safe balance:', error);
    return {
      value: BigInt(0),
      formatted: '0',
    };
  }
}

/**
 * Get all token balances (including tokens and fiat values)
 * Uses the Safe Transaction Service API via backend
 */
export async function getAllBalances(client: SafeClient): Promise<TokenBalance[]> {
  try {
    console.log('[SafeService] Fetching all token balances...');
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const sessionId = localStorage.getItem('safe_active_session_id');
    
    if (!sessionId) {
      throw new Error('No active session');
    }
    
    const response = await fetch(`${apiUrl}/api/safe/${sessionId}/balances`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch balances from API');
    }
    
    const balances: TokenBalance[] = await response.json();
    console.log('[SafeService] All balances:', balances);
    
    return balances;
  } catch (error) {
    console.error('[SafeService] Error fetching all balances:', error);
    return [];
  }
}

/**
 * Get total asset value from backend (cached in session for 5 minutes)
 * Backend calculates the value using Safe Transaction Service + CoinGecko prices
 */
export async function getTotalAssetValue(client: SafeClient, force = false): Promise<{ totalUsd: string; tokens: any[]; cached?: boolean; lastUpdate?: string }> {
  try {
    console.log('[SafeService] Fetching total asset value from backend...');
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const sessionId = localStorage.getItem('safe_active_session_id');
    
    if (!sessionId) {
      throw new Error('No active session');
    }
    
    // Call backend endpoint which handles caching
    const url = `${apiUrl}/api/safe/${sessionId}/asset-value${force ? '?force=true' : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch asset value from API');
    }
    
    const data = await response.json();
    console.log('[SafeService] Asset value from backend:', data);
    console.log('[SafeService] Total USD:', data.totalUsd, data.cached ? '(cached)' : '(fresh)');
    console.log('[SafeService] Tokens:', data.tokens.length);
    
    data.tokens.forEach((token: any) => {
      console.log(`[SafeService]   - ${token.symbol}: ${token.balance} = $${token.usdValue.toFixed(2)}`);
    });
    
    return data;
  } catch (error) {
    console.error('[SafeService] Error fetching total asset value:', error);
    return { totalUsd: '0', tokens: [] };
  }
}


/**
 * Check if an address is an owner of the Safe
 */
export async function isOwner(client: SafeClient, address: string): Promise<boolean> {
  const owners = await client.getOwners();
  return owners.some(owner => owner.toLowerCase() === address.toLowerCase());
}

/**
 * Get all Safe owners
 */
export async function getOwners(client: SafeClient): Promise<string[]> {
  return await client.getOwners();
}

/**
 * Check if the Safe is deployed
 */
export async function isDeployed(client: SafeClient): Promise<boolean> {
  return await client.isDeployed();
}

/**
 * Get Safe threshold
 */
export async function getThreshold(client: SafeClient): Promise<number> {
  return await client.getThreshold();
}

/**
 * Get Safe nonce
 */
export async function getNonce(client: SafeClient): Promise<number> {
  return await client.getNonce();
}

