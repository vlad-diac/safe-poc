const axios = require('axios');

/**
 * Safe Service - Handles interactions with Safe Transaction Service API
 * Based on Safe SDK Starter Kit patterns
 */

class SafeService {
  constructor(config) {
    this.safeAddress = config.safeAddress;
    this.apiKey = config.apiKey;
    this.chainId = config.chainId;
    this.rpcUrl = config.rpcUrl;
    this.transactionServiceUrl = config.transactionServiceUrl;
    
    // Create axios instance with default config
    this.client = axios.create({
      baseURL: this.transactionServiceUrl,
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
      }
    });
  }
  
  /**
   * Get Safe account information
   * Returns: owners, threshold, nonce, version, modules, guard
   */
  async getSafeInfo(address = null) {
    try {
      const safeAddr = address || this.safeAddress;
      const response = await this.client.get(`/api/v1/safes/${safeAddr}/`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get Safe info: ${error.message}`);
    }
  }
  
  /**
   * Get Safe owners
   */
  async getOwners(address = null) {
    try {
      const info = await this.getSafeInfo(address);
      return info.owners;
    } catch (error) {
      throw new Error(`Failed to get Safe owners: ${error.message}`);
    }
  }
  
  /**
   * Get Safe threshold
   */
  async getThreshold(address = null) {
    try {
      const info = await this.getSafeInfo(address);
      return info.threshold;
    } catch (error) {
      throw new Error(`Failed to get Safe threshold: ${error.message}`);
    }
  }
  
  /**
   * Get Safe nonce
   */
  async getNonce(address = null) {
    try {
      const info = await this.getSafeInfo(address);
      return info.nonce;
    } catch (error) {
      throw new Error(`Failed to get Safe nonce: ${error.message}`);
    }
  }
  
  /**
   * Get Safe balances (ETH and tokens)
   */
  async getBalances(address = null) {
    try {
      const safeAddr = address || this.safeAddress;
      const response = await this.client.get(`/api/v1/safes/${safeAddr}/balances/`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get Safe balances: ${error.message}`);
    }
  }
  
  /**
   * Get all transactions (history)
   */
  async getAllTransactions(address = null, limit = 50, offset = 0) {
    try {
      const safeAddr = address || this.safeAddress;
      const response = await this.client.get(`/api/v1/safes/${safeAddr}/all-transactions/`, {
        params: { limit, offset }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get transactions: ${error.message}`);
    }
  }
  
  /**
   * Get pending transactions (awaiting confirmations)
   */
  async getPendingTransactions(address = null) {
    try {
      const safeAddr = address || this.safeAddress;
      const response = await this.client.get(`/api/v1/safes/${safeAddr}/multisig-transactions/`, {
        params: { executed: false }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get pending transactions: ${error.message}`);
    }
  }
  
  /**
   * Get specific transaction by Safe transaction hash
   */
  async getTransaction(safeTxHash) {
    try {
      const response = await this.client.get(`/api/v1/multisig-transactions/${safeTxHash}/`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get transaction: ${error.message}`);
    }
  }
  
  /**
   * Propose a new transaction
   * NOTE: This creates a proposal in the Transaction Service
   * Actual signing and execution happens on the frontend with user's wallet
   */
  async proposeTransaction(txData) {
    try {
      const safeAddr = txData.safeAddress || this.safeAddress;
      
      // Get current nonce
      const nonce = await this.getNonce(safeAddr);
      
      const payload = {
        to: txData.to,
        value: txData.value || '0',
        data: txData.data || '0x',
        operation: txData.operation || 0, // 0 = CALL, 1 = DELEGATECALL
        safeTxGas: txData.safeTxGas || '0',
        baseGas: txData.baseGas || '0',
        gasPrice: txData.gasPrice || '0',
        gasToken: txData.gasToken || '0x0000000000000000000000000000000000000000',
        refundReceiver: txData.refundReceiver || '0x0000000000000000000000000000000000000000',
        nonce: txData.nonce || nonce,
        contractTransactionHash: txData.contractTransactionHash,
        sender: txData.sender,
        signature: txData.signature,
        origin: txData.origin || 'Safe Management App'
      };
      
      const response = await this.client.post(
        `/api/v1/safes/${safeAddr}/multisig-transactions/`,
        payload
      );
      
      return response.data;
    } catch (error) {
      throw new Error(`Failed to propose transaction: ${error.message}`);
    }
  }
  
  /**
   * Get confirmations for a transaction
   */
  async getTransactionConfirmations(safeTxHash) {
    try {
      const response = await this.client.get(
        `/api/v1/multisig-transactions/${safeTxHash}/confirmations/`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get transaction confirmations: ${error.message}`);
    }
  }
}

/**
 * Create a Safe Service instance from session config
 */
function createSafeService(session) {
  return new SafeService({
    safeAddress: session.safeAddress,
    apiKey: session.apiKey,
    chainId: session.chainId,
    rpcUrl: session.rpcUrl,
    transactionServiceUrl: session.transactionServiceUrl
  });
}

module.exports = {
  SafeService,
  createSafeService
};
