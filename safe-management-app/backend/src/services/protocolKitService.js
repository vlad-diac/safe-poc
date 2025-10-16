const Safe = require('@safe-global/protocol-kit').default;
const { getRpcUrl } = require('./rpcProviderService');
const { getApiKey } = require('../utils/apiKeyHelper');

class ProtocolKitService {
  /**
   * Create read-only Protocol Kit instance
   * (No signing - just for creating transactions)
   */
  async createReadOnlyClient(session) {
    const rpcUrl = getRpcUrl(session.chainId);

    return await Safe.init({
      provider: rpcUrl,
      signer: undefined,  // No signer = read-only
      safeAddress: session.safeAddress
    });
  }

  /**
   * Create batch transaction
   * Returns: { safeTransaction, safeTxHash, transactionData }
   */
  async createBatchTransaction(session, recipients) {
    console.log('📦 [ProtocolKit] Creating batch transaction...');
    console.log('Recipients:', recipients.length);

    const protocolKit = await this.createReadOnlyClient(session);

    // Build transactions array
    const transactions = recipients.map(recipient => ({
      to: recipient.address,
      value: recipient.amount,
      data: recipient.data || '0x',
      operation: recipient.operation || 0  // 0 = CALL
    }));

    // Create Safe transaction
    const safeTransaction = await protocolKit.createTransaction({
      transactions,
      onlyCalls: true  // Use MultiSendCallOnly for safety
    });

    // Get transaction hash (for signing)
    const safeTxHash = await protocolKit.getTransactionHash(safeTransaction);

    console.log('✅ [ProtocolKit] Batch transaction created');
    console.log('Safe TX Hash:', safeTxHash);

    return {
      safeTransaction,
      safeTxHash,
      transactionData: safeTransaction.data
    };
  }

  /**
   * Create simple transaction (single recipient)
   */
  async createSimpleTransaction(session, { to, value, data = '0x' }) {
    console.log('📤 [ProtocolKit] Creating simple transaction...');

    const protocolKit = await this.createReadOnlyClient(session);

    const safeTransaction = await protocolKit.createTransaction({
      transactions: [{ to, value, data, operation: 0 }],
      onlyCalls: true  // Force CALL operations only
    });

    const safeTxHash = await protocolKit.getTransactionHash(safeTransaction);

    console.log('✅ [ProtocolKit] Simple transaction created');
    console.log('Safe TX Hash:', safeTxHash);

    return {
      safeTransaction,
      safeTxHash,
      transactionData: safeTransaction.data
    };
  }

  /**
   * Validate transaction before proposing
   */
  async validateTransaction(session, safeTransaction) {
    console.log('🔍 [ProtocolKit] Validating transaction...');

    const protocolKit = await this.createReadOnlyClient(session);
    const isValid = await protocolKit.isValidTransaction(safeTransaction);

    console.log('✅ [ProtocolKit] Validation result:', isValid);

    return isValid;
  }

  /**
   * Get Safe information
   */
  async getSafeInfo(session) {
    console.log('ℹ️ [ProtocolKit] Getting Safe info...');

    const protocolKit = await this.createReadOnlyClient(session);

    const [address, owners, threshold, nonce, balance] = await Promise.all([
      protocolKit.getAddress(),
      protocolKit.getOwners(),
      protocolKit.getThreshold(),
      protocolKit.getNonce(),
      protocolKit.getBalance()
    ]);

    console.log('✅ [ProtocolKit] Safe info retrieved');

    return {
      address,
      owners,
      threshold: Number(threshold),  // Convert BigInt to number
      nonce: Number(nonce),          // Convert BigInt to number
      balance: balance.toString(),   // Convert BigInt to string (can be very large)
      version: await protocolKit.getContractVersion()
    };
  }

  /**
   * Get the hash that needs to be signed
   * This is simpler - just return the safeTxHash for signing with eth_sign
   */
  async getSigningHash(session, safeTransaction) {
    console.log('📝 [ProtocolKit] Getting signing hash...');

    const protocolKit = await this.createReadOnlyClient(session);
    
    // The safeTxHash is what needs to be signed
    const safeTxHash = await protocolKit.getTransactionHash(safeTransaction);
    
    console.log('✅ [ProtocolKit] Signing hash:', safeTxHash);
    
    return safeTxHash;
  }
}

module.exports = new ProtocolKitService();

