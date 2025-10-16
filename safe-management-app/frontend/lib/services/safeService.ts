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
 * Get comprehensive Safe account information from backend
 */
export async function getSafeInfo(sessionIdOrClient: string | SafeClient): Promise<SafeInfo> {
  console.log('[SafeService] Fetching Safe info...');
  
  // If it's a SafeClient (old approach), get session from localStorage
  const sessionId = typeof sessionIdOrClient === 'string' 
    ? sessionIdOrClient 
    : localStorage.getItem('safe_active_session_id');
  
  if (!sessionId) {
    throw new Error('No active session found');
  }
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  
  // First get session to get Safe address
  const sessionResponse = await fetch(`${apiUrl}/api/sessions/${sessionId}`, {
    credentials: 'include'
  });
  
  if (!sessionResponse.ok) {
    throw new Error('Failed to fetch session');
  }
  
  const session = await sessionResponse.json();
  
  // Now fetch Safe info from backend
  const response = await fetch(
    `${apiUrl}/api/safe/${session.safeAddress}/info?sessionId=${sessionId}`,
    { credentials: 'include' }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch Safe info');
  }
  
  const safeInfo = await response.json();

  console.log('[SafeService] Safe info retrieved:', {
    address: safeInfo.address,
    ownersCount: safeInfo.owners.length,
    owners: safeInfo.owners,
    threshold: safeInfo.threshold,
    nonce: safeInfo.nonce,
  });

  return {
    address: safeInfo.address,
    owners: safeInfo.owners,
    threshold: safeInfo.threshold,
    nonce: safeInfo.nonce,
  };
}

/**
 * Get Safe ETH balance from backend
 * Note: For total asset value with USD pricing, use getTotalAssetValue()
 */
export async function getSafeBalance(sessionIdOrClient: string | SafeClient): Promise<SafeBalance> {
  try {
    console.log('[SafeService] Fetching ETH balance from backend...');
    
    // Get session ID
    const sessionId = typeof sessionIdOrClient === 'string' 
      ? sessionIdOrClient 
      : localStorage.getItem('safe_active_session_id');
    
    if (!sessionId) {
      throw new Error('No active session found');
    }
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Fetch balances from backend
    const response = await fetch(`${apiUrl}/api/safe/${sessionId}/balances`, {
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch balance');
    }
    
    const balances = await response.json();
    
    // Find ETH balance
    const ethBalance = balances.find((b: any) => b.tokenAddress === null);
    
    if (ethBalance) {
      const ethValue = parseFloat(ethBalance.balance) / 1e18;
      return {
        value: BigInt(ethBalance.balance),
        formatted: ethValue.toFixed(4),
      };
    }
    
    return {
      value: BigInt(0),
      formatted: '0',
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
export async function getAllBalances(sessionIdOrClient: string | SafeClient): Promise<TokenBalance[]> {
  try {
    console.log('[SafeService] Fetching all token balances...');
    
    const sessionId = typeof sessionIdOrClient === 'string' 
      ? sessionIdOrClient 
      : localStorage.getItem('safe_active_session_id');
    
    if (!sessionId) {
      throw new Error('No active session');
    }
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const response = await fetch(`${apiUrl}/api/safe/${sessionId}/balances`, {
      credentials: 'include'
    });
    
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
export async function getTotalAssetValue(sessionIdOrClient: string | SafeClient, force = false): Promise<{ totalUsd: string; tokens: any[]; cached?: boolean; lastUpdate?: string }> {
  try {
    console.log('[SafeService] Fetching total asset value from backend...');
    
    const sessionId = typeof sessionIdOrClient === 'string' 
      ? sessionIdOrClient 
      : localStorage.getItem('safe_active_session_id');
    
    if (!sessionId) {
      throw new Error('No active session');
    }
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Call backend endpoint which handles caching
    const url = `${apiUrl}/api/safe/${sessionId}/asset-value${force ? '?force=true' : ''}`;
    const response = await fetch(url, {
      credentials: 'include'
    });
    
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
export async function isOwner(sessionIdOrClient: string | SafeClient, address: string): Promise<boolean> {
  const info = await getSafeInfo(sessionIdOrClient);
  return info.owners.some(owner => owner.toLowerCase() === address.toLowerCase());
}

/**
 * Get all Safe owners
 */
export async function getOwners(sessionIdOrClient: string | SafeClient): Promise<string[]> {
  const info = await getSafeInfo(sessionIdOrClient);
  return info.owners;
}

/**
 * Check if the Safe is deployed (always true if we can fetch info)
 */
export async function isDeployed(sessionIdOrClient: string | SafeClient): Promise<boolean> {
  try {
    await getSafeInfo(sessionIdOrClient);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get Safe threshold
 */
export async function getThreshold(sessionIdOrClient: string | SafeClient): Promise<number> {
  const info = await getSafeInfo(sessionIdOrClient);
  return info.threshold;
}

/**
 * Get Safe nonce
 */
export async function getNonce(sessionIdOrClient: string | SafeClient): Promise<number> {
  const info = await getSafeInfo(sessionIdOrClient);
  return info.nonce;
}

