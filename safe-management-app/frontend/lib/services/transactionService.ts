/**
 * Transaction Service
 * 
 * Backend-heavy transaction service.
 * Frontend only handles wallet signing - backend handles all SDK operations.
 */

import { SafeClient } from '@safe-global/sdk-starter-kit';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Check if MetaMask is unlocked
 */
async function isMetaMaskUnlocked(): Promise<boolean> {
  if (!window.ethereum) return false;
  
  try {
    const accounts = await window.ethereum.request({ 
      method: 'eth_accounts' 
    });
    return accounts && accounts.length > 0;
  } catch (error) {
    return false;
  }
}

/**
 * Sign transaction hash with user's wallet
 * This is the ONLY operation that stays on frontend
 */
export async function signTransactionHash(
  walletAddress: string,
  safeTxHash: string
): Promise<string> {
  console.log('✍️ [Frontend] Signing transaction hash...');

  if (!window.ethereum) {
    throw new Error('No wallet provider found');
  }

  // Check if MetaMask is unlocked
  const isUnlocked = await isMetaMaskUnlocked();
  if (!isUnlocked) {
    throw new Error('Please unlock MetaMask and try again');
  }

  // Use eth_sign for Safe transaction signatures
  // Note: You may need to enable eth_sign in MetaMask (Settings > Advanced > Enable eth_sign)
  try {
    console.log('📝 Requesting signature from MetaMask...');
    
    const signature = await Promise.race([
      window.ethereum.request({
        method: 'eth_sign',
        params: [walletAddress, safeTxHash],
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Signature request timed out after 60 seconds')), 60000)
      )
    ]) as string;

    console.log('✅ [Frontend] Transaction hash signed');
    console.log('Signature:', signature);
    return signature;
  } catch (error: any) {
    console.error('Failed to sign hash:', error);
    
    if (error.code === 4001) {
      throw new Error('Signature rejected by user');
    }
    
    if (error.code === -32601 || error.message?.includes('does not exist')) {
      throw new Error(
        'eth_sign is disabled in MetaMask. Please enable it:\n' +
        '1. Open MetaMask\n' +
        '2. Go to Settings > Advanced\n' +
        '3. Enable "Eth_sign requests"\n' +
        '4. Try again'
      );
    }
    
    if (error.message?.includes('timeout')) {
      throw new Error('Signature request timed out. Please check MetaMask.');
    }
    
    throw error;
  }
}

/**
 * Get pending transactions (from backend)
 */
export async function getPendingTransactions(sessionId: string) {
  const response = await fetch(`${API_URL}/api/transactions/${sessionId}?pending=true`, {
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Failed to get pending transactions');
  }

  const data = await response.json();
  return data.results || [];
}

/**
 * Get all transactions (from backend)
 */
export async function getAllTransactions(sessionId: string) {
  const response = await fetch(`${API_URL}/api/transactions/${sessionId}`, {
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Failed to get transactions');
  }

  const data = await response.json();
  return data.results || [];
}

/**
 * Confirm transaction (sign + send to backend)
 */
export async function confirmTransaction(
  walletAddress: string,
  sessionId: string,
  safeTxHash: string
) {
  console.log('✍️ [TransactionService] Confirming transaction...');

  // Sign on frontend
  const signature = await signTransactionHash(walletAddress, safeTxHash);

  // Send to backend
  const response = await fetch(`${API_URL}/api/transactions/confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      sessionId,
      safeTxHash,
      signature
    })
  });

  if (!response.ok) {
    throw new Error('Failed to confirm transaction');
  }

  console.log('✅ [TransactionService] Transaction confirmed');

  return await response.json();
}

/**
 * Sync transactions from Safe Transaction Service to database
 */
export async function syncTransactions(sessionId: string) {
  console.log('🔄 [TransactionService] Syncing transactions to database...');
  
  const response = await fetch(`${API_URL}/api/transactions/${sessionId}/sync`, {
    method: 'POST',
    credentials: 'include'
  });
  
  if (!response.ok) {
    throw new Error(`Failed to sync transactions: ${response.statusText}`);
  }
  
  const data = await response.json();
  console.log('✅ [TransactionService] Synced transactions:', data);
  
  return data;
}

/**
 * Get sync status
 */
export async function getSyncStatus(sessionId: string) {
  const response = await fetch(`${API_URL}/api/transactions/${sessionId}/sync/status`, {
    credentials: 'include'
  });
  
  if (!response.ok) {
    throw new Error(`Failed to get sync status: ${response.statusText}`);
  }
  
  return await response.json();
}

/**
 * Format transaction value for display
 */
export function formatTransactionValue(value: string): string {
  try {
    const { formatEther } = require('ethers');
    return formatEther(value);
  } catch (error) {
    return '0';
  }
}

/**
 * Truncate address for display
 */
export function truncateAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

