const SafeApiKit = require('@safe-global/api-kit').default;
const { getApiKey } = require('../utils/apiKeyHelper');
const axios = require('axios');
const { ethers } = require('ethers');

class ApiKitService {
  /**
   * Create API Kit instance
   */
  createClient(session) {
    const apiKey = getApiKey(session.apiKey);

    return new SafeApiKit({
      chainId: BigInt(session.chainId),
      apiKey
    });
  }

  /**
   * Propose transaction to Safe Transaction Service
   */
  async proposeTransaction(session, { safeTxHash, safeTransactionData, senderAddress, senderSignature }) {
    console.log('📤 [ApiKit] Proposing transaction...');
    console.log('Safe TX Hash:', safeTxHash);
    console.log('Sender (original):', senderAddress);
    
    // Checksum the sender address (Safe Transaction Service requires this!)
    const checksummedSender = ethers.getAddress(senderAddress);
    console.log('Sender (checksummed):', checksummedSender);
    console.log('Signature:', senderSignature);
    console.log('Transaction Data:', JSON.stringify(safeTransactionData, null, 2));

    const apiKit = this.createClient(session);

    try {
      const proposalData = {
        safeAddress: session.safeAddress,
        safeTransactionData,
        safeTxHash,
        senderAddress,
        senderSignature,
        origin: 'Safe Management App'
      };
      
      console.log('📤 [ApiKit] Proposal payload:', JSON.stringify(proposalData, null, 2));
      
      // Try direct REST API call to get better error messages
      const txServiceUrl = session.chainId === 11155111 
        ? 'https://safe-transaction-sepolia.safe.global'
        : `https://safe-transaction-mainnet.safe.global`;
      
      try {
        // Build the correct payload structure for Safe Transaction Service REST API
        const restApiPayload = {
          // Top-level fields (not nested!)
          to: safeTransactionData.to,
          value: safeTransactionData.value,
          data: safeTransactionData.data,
          operation: safeTransactionData.operation,
          safeTxGas: safeTransactionData.safeTxGas,
          baseGas: safeTransactionData.baseGas,
          gasPrice: safeTransactionData.gasPrice,
          gasToken: safeTransactionData.gasToken,
          refundReceiver: safeTransactionData.refundReceiver,
          nonce: safeTransactionData.nonce,
          contractTransactionHash: safeTxHash,  // This is what they call safeTxHash
          sender: checksummedSender,  // Use checksummed address!
          signature: senderSignature,
          origin: 'Safe Management App'
        };
        
        console.log('📤 [Direct API] REST payload:', JSON.stringify(restApiPayload, null, 2));
        
        const response = await axios.post(
          `${txServiceUrl}/api/v1/safes/${session.safeAddress}/multisig-transactions/`,
          restApiPayload,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        console.log('✅ [Direct API] Transaction proposed successfully!');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        return { success: true, safeTxHash };
      } catch (directError) {
        console.error('❌ [Direct API] Failed with detailed error:');
        if (directError.response) {
          console.error('Status:', directError.response.status);
          console.error('Data:', JSON.stringify(directError.response.data, null, 2));
        }
        throw directError; // Don't fall back to API Kit - throw the detailed error
      }

      console.log('✅ [ApiKit] Transaction proposed');
      return { success: true, safeTxHash };
    } catch (error) {
      console.error('❌ [ApiKit] Propose failed:', error);
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      
      // Deeply inspect the error object to find the real API response
      console.error('\n🔍 Deep Error Inspection:');
      console.error('All error keys:', Object.keys(error));
      console.error('Error toString:', error.toString());
      
      // Check for axios-style error structure
      if (error.response) {
        console.error('\n📡 HTTP Response Error:');
        console.error('Status:', error.response.status);
        console.error('Status Text:', error.response.statusText);
        console.error('Headers:', JSON.stringify(error.response.headers, null, 2));
        console.error('Data:', JSON.stringify(error.response.data, null, 2));
      }
      
      // Check for nested error info
      if (error.error) {
        console.error('\n📦 Nested error:', error.error);
      }
      
      if (error.cause) {
        console.error('\n📦 Error cause:', error.cause);
      }
      
      // Check original error if wrapped
      if (error.originalError) {
        console.error('\n📦 Original error:', error.originalError);
      }
      
      // Try to access internal axios error
      if (error.config) {
        console.error('\n📤 Request Config:');
        console.error('URL:', error.config.url);
        console.error('Method:', error.config.method);
        console.error('Data:', typeof error.config.data === 'string' ? error.config.data : JSON.stringify(error.config.data, null, 2));
      }
      
      // Create more informative error
      let detailedMessage = `Failed to propose transaction: ${error.message}`;
      if (error.response?.data) {
        detailedMessage += `\nAPI Response: ${JSON.stringify(error.response.data)}`;
      }
      
      const detailedError = new Error(detailedMessage);
      detailedError.originalError = error;
      throw detailedError;
    }
  }

  /**
   * Confirm transaction (add signature)
   */
  async confirmTransaction(session, safeTxHash, signature) {
    console.log('✍️ [ApiKit] Confirming transaction...');
    console.log('Safe TX Hash:', safeTxHash);

    const apiKit = this.createClient(session);

    await apiKit.confirmTransaction(safeTxHash, signature);

    console.log('✅ [ApiKit] Transaction confirmed');

    return { success: true };
  }

  /**
   * Get transaction details
   */
  async getTransaction(session, safeTxHash) {
    console.log('🔍 [ApiKit] Getting transaction...');
    console.log('Safe TX Hash:', safeTxHash);

    const apiKit = this.createClient(session);
    const transaction = await apiKit.getTransaction(safeTxHash);

    console.log('✅ [ApiKit] Transaction retrieved');

    return transaction;
  }

  /**
   * Get pending transactions
   */
  async getPendingTransactions(session) {
    console.log('📋 [ApiKit] Getting pending transactions...');

    const apiKit = this.createClient(session);
    const result = await apiKit.getPendingTransactions(session.safeAddress);

    console.log('✅ [ApiKit] Found', result.results?.length || 0, 'pending transactions');

    return result.results || [];
  }

  /**
   * Get all transactions
   */
  async getAllTransactions(session, limit = 100, offset = 0) {
    console.log('📋 [ApiKit] Getting all transactions...');

    const apiKit = this.createClient(session);
    const result = await apiKit.getAllTransactions(session.safeAddress, { limit, offset });

    console.log('✅ [ApiKit] Found', result.results?.length || 0, 'transactions');

    return result.results || [];
  }

  /**
   * Get token list
   */
  async getTokenList(session) {
    console.log('🪙 [ApiKit] Getting token list...');

    const apiKit = this.createClient(session);
    const result = await apiKit.getTokenList();

    console.log('✅ [ApiKit] Found', result.results?.length || 0, 'tokens');

    return result.results || [];
  }

  /**
   * Get specific token info
   */
  async getToken(session, tokenAddress) {
    console.log('🪙 [ApiKit] Getting token info...');
    console.log('Token:', tokenAddress);

    const apiKit = this.createClient(session);
    const token = await apiKit.getToken(tokenAddress);

    console.log('✅ [ApiKit] Token info retrieved');

    return token;
  }
}

module.exports = new ApiKitService();

