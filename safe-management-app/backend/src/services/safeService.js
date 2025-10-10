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
      console.log(`[SafeService] Fetching Safe info for ${safeAddr} from ${this.transactionServiceUrl}`);
      
      const response = await this.client.get(`/api/v1/safes/${safeAddr}/`);
      
      if (!response.data) {
        throw new Error('Empty response from Safe Transaction Service');
      }
      
      console.log('[SafeService] ===== FULL SAFE INFO FROM API =====');
      console.log('[SafeService] Complete response:', JSON.stringify(response.data, null, 2));
      console.log('[SafeService] ===================================');
      
      console.log('[SafeService] Safe info retrieved successfully:', {
        address: response.data.address,
        owners: response.data.owners?.length || 0,
        ownersList: response.data.owners,
        threshold: response.data.threshold,
        nonce: response.data.nonce,
        version: response.data.version,
        masterCopy: response.data.masterCopy,
        modules: response.data.modules,
        fallbackHandler: response.data.fallbackHandler,
        guard: response.data.guard
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching Safe info:', {
        address: address || this.safeAddress,
        transactionServiceUrl: this.transactionServiceUrl,
        error: error.message,
        response: error.response?.data
      });
      
      if (error.response?.status === 404) {
        throw new Error(`Safe account not found at address ${address || this.safeAddress}. Please verify the address is correct.`);
      } else if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error(`Cannot connect to Safe Transaction Service at ${this.transactionServiceUrl}. Please verify the service URL.`);
      } else if (error.code === 'ETIMEDOUT' || error.code === 'ENOTFOUND') {
        throw new Error('Network error: Unable to reach Safe Transaction Service. Please check your network connection.');
      }
      
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
      console.log(`[SafeService] Fetching balances for Safe: ${safeAddr}`);
      
      const response = await this.client.get(`/api/v1/safes/${safeAddr}/balances/`);
      
      console.log('[SafeService] ===== FULL BALANCES FROM API =====');
      console.log('[SafeService] Complete response:', JSON.stringify(response.data, null, 2));
      console.log('[SafeService] ===================================');
      
      console.log(`[SafeService] Balances retrieved for ${safeAddr}:`, response.data.length, 'assets');
      
      // Log ETH balance specifically with fiat values
      const ethBalance = response.data.find(balance => 
        balance.tokenAddress === null || balance.tokenAddress === '0x0000000000000000000000000000000000000000'
      );
      
      if (ethBalance) {
        const ethValue = Number(ethBalance.balance) / 1e18;
        console.log('[SafeService] ===== ETH BALANCE DETAILS =====');
        console.log('[SafeService] ETH Balance:', ethValue.toFixed(4), 'ETH');
        console.log('[SafeService] Fiat Balance:', ethBalance.fiatBalance, ethBalance.fiatCode || 'USD');
        console.log('[SafeService] ETH Price (fiatConversion):', ethBalance.fiatConversion, ethBalance.fiatCode || 'USD');
        console.log('[SafeService] Token Info:', ethBalance.token);
        console.log('[SafeService] ================================');
      }
      
      return response.data;
    } catch (error) {
      console.error(`Failed to get Safe balances for ${address || this.safeAddress}:`, error.message);
      
      if (error.response?.status === 404) {
        throw new Error(`Safe not found at address ${address || this.safeAddress}`);
      } else if (error.request) {
        throw new Error(`Cannot reach Safe Transaction Service. Please check your connection.`);
      }
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
      console.log(`[SafeService] Fetching pending transactions for Safe: ${safeAddr}`);
      
      const response = await this.client.get(`/api/v1/safes/${safeAddr}/multisig-transactions/`, {
        params: { executed: false }
      });
      
      console.log('[SafeService] ===== PENDING TRANSACTIONS FROM API =====');
      console.log('[SafeService] Complete response:', JSON.stringify(response.data, null, 2));
      console.log('[SafeService] ======================================');
      
      console.log(`[SafeService] Found ${response.data.results?.length || 0} pending transactions`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get pending transactions for ${address || this.safeAddress}:`, error.message);
      
      if (error.response?.status === 404) {
        throw new Error(`Safe not found at address ${address || this.safeAddress}`);
      } else if (error.request) {
        throw new Error(`Cannot reach Safe Transaction Service. Please check your connection.`);
      }
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
      console.log(`Proposing transaction for Safe: ${safeAddr}`);
      
      // Validate required fields
      if (!txData.to) {
        throw new Error('Transaction recipient address (to) is required');
      }
      
      // Get current nonce
      let nonce;
      try {
        nonce = await this.getNonce(safeAddr);
      } catch (error) {
        throw new Error(`Failed to get Safe nonce: ${error.message}`);
      }
      
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
      
      console.log('Proposing transaction with payload:', {
        to: payload.to,
        value: payload.value,
        nonce: payload.nonce,
        sender: payload.sender
      });
      
      const response = await this.client.post(
        `/api/v1/safes/${safeAddr}/multisig-transactions/`,
        payload
      );
      
      console.log('Transaction proposed successfully:', response.data.safeTxHash || 'no hash returned');
      return response.data;
    } catch (error) {
      console.error('Failed to propose transaction:', error.message);
      
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 400) {
          const errorDetail = data?.nonFieldErrors?.[0] || data?.detail || JSON.stringify(data);
          throw new Error(`Invalid transaction data: ${errorDetail}`);
        } else if (status === 422) {
          throw new Error(`Transaction validation failed: ${data?.detail || JSON.stringify(data)}`);
        } else if (status === 404) {
          throw new Error(`Safe not found. Please verify the Safe address.`);
        } else {
          throw new Error(`Failed to propose transaction (${status}): ${data?.detail || error.message}`);
        }
      } else if (error.request) {
        throw new Error(`Cannot reach Safe Transaction Service. Please check your connection.`);
      }
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
