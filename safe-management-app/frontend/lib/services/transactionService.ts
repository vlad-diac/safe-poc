/**
 * Transaction Service
 * 
 * Centralized service for Safe transaction operations using SDK Starter Kit.
 * Handles creating, signing, and managing Safe transactions.
 */

import { SafeClient } from '@safe-global/sdk-starter-kit';

export interface TransactionData {
  to: string;
  value: string;
  data?: string;
  operation?: number;
}

export interface SendTransactionParams {
  transactions: TransactionData[];
}

export interface TransactionResult {
  safeTxHash?: string;
  ethereumTxHash?: string;
}

/**
 * Send a transaction (create proposal or execute if threshold is 1)
 * This will prompt MetaMask for signing
 */
export async function sendTransaction(
  client: SafeClient,
  params: SendTransactionParams
): Promise<TransactionResult> {
  console.log('📤 [TransactionService] Sending transaction...', params);
  
  // Ensure data field has a default value
  const normalizedParams = {
    transactions: params.transactions.map(tx => ({
      ...tx,
      data: tx.data || '0x',
      operation: tx.operation || 0
    }))
  };
  
  const result = await client.send(normalizedParams);
  
  console.log('✅ [TransactionService] Transaction sent:', result);
  
  return {
    safeTxHash: result.transactions?.safeTxHash,
    ethereumTxHash: result.transactions?.ethereumTxHash,
  };
}

/**
 * Get all pending transactions
 */
export async function getPendingTransactions(client: SafeClient) {
  console.log('📋 [TransactionService] Fetching pending transactions...');
  
  const result = await client.getPendingTransactions();
  
  console.log('✅ [TransactionService] Fetched pending transactions:', result.results?.length || 0);
  
  return result.results || [];
}

/**
 * Sync transactions from Safe Transaction Service to database
 */
export async function syncTransactions(sessionId: string) {
  console.log('🔄 [TransactionService] Syncing transactions to database...');
  
  const response = await fetch(`http://localhost:5000/api/transactions/${sessionId}/sync`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to sync transactions: ${response.statusText}`);
  }
  
  const data = await response.json();
  console.log('✅ [TransactionService] Synced transactions:', data);
  
  return data;
}

/**
 * Get all transactions from database
 * This fetches transactions that have been synced to the database
 */
export async function getAllTransactions(
  sessionId: string,
  options?: {
    limit?: number;
    offset?: number;
    pending?: boolean;
    executed?: boolean;
  }
) {
  console.log('📋 [TransactionService] Fetching all transactions from database...');
  
  try {
    const params = new URLSearchParams();
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());
    if (options?.pending) params.append('pending', 'true');
    if (options?.executed) params.append('executed', 'true');
    
    const url = `http://localhost:5000/api/transactions/${sessionId}?${params.toString()}`;
    console.log('📋 [TransactionService] Fetching from:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ [TransactionService] Fetched all transactions:', data.results?.length || 0);
    
    return data.results || [];
  } catch (error) {
    console.error('Failed to fetch all transactions:', error);
    throw error;
  }
}

/**
 * Get sync status
 */
export async function getSyncStatus(sessionId: string) {
  const response = await fetch(`http://localhost:5000/api/transactions/${sessionId}/sync/status`);
  
  if (!response.ok) {
    throw new Error(`Failed to get sync status: ${response.statusText}`);
  }
  
  return await response.json();
}

/**
 * Confirm/sign a pending transaction
 * This will prompt MetaMask for signing
 */
export async function confirmTransaction(
  client: SafeClient,
  safeTxHash: string
): Promise<TransactionResult> {
  console.log('✍️ [TransactionService] Confirming transaction:', safeTxHash);
  
  const result = await client.confirm({ safeTxHash });
  
  console.log('✅ [TransactionService] Transaction confirmed:', result);
  
  return {
    safeTxHash: result.transactions?.safeTxHash,
    ethereumTxHash: result.transactions?.ethereumTxHash,
  };
}

/**
 * Get transaction details by hash
 */
export async function getTransaction(client: SafeClient, safeTxHash: string) {
  console.log('🔍 [TransactionService] Fetching transaction:', safeTxHash);
  
  // SafeClient doesn't have a getTransaction method directly
  // We need to fetch from pending transactions
  const pending = await client.getPendingTransactions();
  const transaction = pending.results?.find(
    (tx: any) => tx.safeTxHash === safeTxHash
  );
  
  if (!transaction) {
    throw new Error(`Transaction not found: ${safeTxHash}`);
  }
  
  return transaction;
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

